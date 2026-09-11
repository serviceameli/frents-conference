import { getLeadDatabase } from "@/db";
import { leadSchema } from "@/lib/lead-validation";

const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request:Request){
 if(request.headers.get("sec-fetch-site")==="cross-site") return json({error:"Отправьте заявку с сайта Frents."},403);
 if(!request.headers.get("content-type")?.includes("application/json")) return json({error:"Неверный формат заявки."},415);
 if(Number(request.headers.get("content-length")||0)>12000) return json({error:"Заявка слишком большая."},413);
 let raw:unknown;
 try{const text=await request.text();if(text.length>12000)return json({error:"Заявка слишком большая."},413);raw=JSON.parse(text);}catch{return json({error:"Не удалось прочитать заявку."},400)}
 const result=leadSchema.safeParse(raw);
 if(!result.success){const contactError=result.error.issues.find(i=>i.path[0]==="contact");return json({error:contactError?.message||"Проверьте контакт, выбранные направления и согласие на обработку данных."},400)}
 const input=result.data;
 try{
  const db=getLeadDatabase();
  const existing=await db.prepare("SELECT contact FROM leads WHERE id = ?").bind(input.requestId).first<{contact:string}>();
  if(existing){if(existing.contact!==input.contact)return json({error:"Обновите форму и повторите отправку."},409);return json({ok:true,id:input.requestId})}
  const ip=request.headers.get("cf-connecting-ip") || "local-preview";
  const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(ip));
  const ipHash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
  const now=Date.now();
  const count=await db.prepare("SELECT count(*) AS total FROM leads WHERE ip_hash = ? AND contact = ? AND created_at > ?").bind(ipHash,input.contact,now-600000).first<{total:number}>();
  if((count?.total||0)>=10)return json({error:"Слишком много заявок за короткое время. Попробуйте чуть позже."},429);
  await db.prepare("INSERT INTO leads (id,name,contact,services,intents,source,utm,consent_version,created_at,ip_hash) VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING").bind(input.requestId,input.name,input.contact,JSON.stringify(input.services),JSON.stringify(input.intents),input.source,JSON.stringify(input.utm),"conference-2026-09-11",now,ipHash).run();
  return json({ok:true,id:input.requestId},201);
 }catch(error){console.error("Lead storage unavailable",error instanceof Error ? error.name : "unknown");return json({error:"Не удалось сохранить заявку. Ваши данные остались в форме — попробуйте ещё раз."},503)}
}
