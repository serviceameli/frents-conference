"use client";
import { publicPath, leadsEndpoint } from "@/lib/public-path";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, Boxes, FolderOpen, Repeat2, UsersRound, Check, Gift, Plus, Smartphone, PackageCheck, CalendarDays, MapPin, Download, LoaderCircle, Sparkles, X, Heart, Search, Leaf, LockKeyhole } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AppShowcase, ScreenStoryboard } from "@/components/app-showcase";
import { services, type ServiceId } from "@/lib/services";

const icons = { rental: Boxes, projects: FolderOpen, market: Repeat2, specialists: UsersRound };
const ids = Object.keys(services) as ServiceId[];

function Logo({ light = false }: { light?: boolean }) {
  return <a href="#" aria-label="Frents — на главную" className={`brand ${light ? "brand-light" : ""}`}><img src={publicPath("/assets/frents-logo.svg")} alt="Frents" width="110" height="36" /></a>;
}

function ProductPreview({ service, intent }: { service: ServiceId; intent: string }) {
  return <div className={`product-preview preview-${service}`}>
    <div className="preview-caption"><span>FRENTS / {services[service].name}</span><span>Пример интерфейса</span></div>
    {service === "rental" && <div className="app-window rental-window">
      <div className="app-bar"><span className="mini-brand">FRENTS <span>business</span></span><span className="tiny-tag">Студия «Форма»</span></div>
      <div className="app-body"><div className="app-sidebar"><Boxes size={20}/><FolderOpen size={20}/><CalendarDays size={20}/><UsersRound size={20}/></div><div className="app-main"><div className="app-title"><h4>Заказы</h4><span className="mini-button">+ Новый заказ</span></div><div className="app-stat-row"><div><small>В работе</small><b>12 <span>заказов</span></b></div><div><small>Ближайшая выдача</small><b>18 <span>сентября</span></b></div></div><div className="order-row"><span className="order-icon"><PackageCheck size={20}/></span><div><strong>Камерная свадьба</strong><small>18 сентября · 24 предмета</small></div><span className="status">Подтверждён</span></div><div className="order-row"><span className="order-icon"><Boxes size={20}/></span><div><strong>Ужин в саду</strong><small>21 сентября · 36 предметов</small></div><span className="status neutral">Новый</span></div><div className="catalog-strip"><img src={publicPath("/assets/hero-tablescape.webp")} alt="Коллекция декора с хромированными вазами" loading="lazy"/><div><strong>Ваша коллекция. Ваш бренд.</strong><small>Личный сайт + общий каталог Frents</small></div><ArrowUpRight size={18}/></div></div></div>
    </div>}
    {service === "projects" && <div className="app-window project-window"><div className="app-bar"><span className="mini-brand">FRENTS <span>workspace</span></span><span className="private-label"><LockKeyhole size={12}/> Только для вас</span></div><div className="project-cover"><img src={publicPath("/assets/hero-tablescape.webp")} alt="Флористика и сервировка для камерной свадьбы" loading="lazy"/><span>Мой проект</span></div><div className="project-content"><div className="app-title"><h4>Камерная свадьба</h4><span className="tiny-tag">18 сентября</span></div><p>Реквизит для монтажа</p>{[["Ваза хромированная", "6 шт.", true],["Подсвечник высокий", "12 шт.", true],["Текстиль лайм", "4 шт.", false]].map(([name, count, done])=><div className="packing-row" key={String(name)}><span className={done ? "packing-check done" : "packing-check"}>{done && <Check size={12}/>}</span><span>{name}</span><small>{count}</small><span className={`status ${!done ? "neutral" : ""}`}>{done ? "Свой склад" : "Найти"}</span></div>)}</div></div>}
    {service === "market" && <div className="app-window market-window"><div className="app-bar"><span className="mini-brand">FRENTS <span>барахолка</span></span><span className="tiny-tag green">Бесплатные объявления</span></div><div className="market-content"><div className="mock-search"><Search size={16}/> Декор для следующей идеи</div><div className="market-item"><div className="market-photo"><img src={publicPath("/assets/hero-tablescape.webp")} alt="Набор хромированных предметов декора" loading="lazy"/><span><Heart size={17}/></span></div><div className="market-item-info"><div><small>Из коллекции декоратора</small><h4>Хром. Новая история.</h4><p>Вазы, подсвечники и детали сервировки</p></div><span className="market-free">0 ₽<small>за размещение</small></span></div></div><div className="market-note"><Leaf size={18}/>{intent === "buy" ? "У вашей идеи уже может быть готовое решение" : "Ваш прошлый проект — чья-то новая идея"}</div></div></div>}
    {service === "specialists" && <div className="app-window specialist-window"><div className="app-bar"><span className="mini-brand">FRENTS <span>специалисты</span></span><span className="tiny-tag">Знакомьтесь по работам</span></div><div className="specialist-content"><div className="profile-top"><div className="profile-avatar"><img src={publicPath("/assets/hero-tablescape.webp")} alt="Флористическое портфолио" loading="lazy"/></div><div><small>Флористика и декор</small><h4>Студия «Форма»</h4><p><MapPin size={12}/> Москва</p></div></div><p className="profile-about">Создаём атмосферу события через цветы, фактуры и внимание к деталям.</p><div className="portfolio-title"><strong>Портфолио</strong><span>Услуги и цены <ArrowUpRight size={13}/></span></div><img className="portfolio-image" src={publicPath("/assets/hero-tablescape.webp")} alt="Пример работы: современная сервировка с белыми каллами" loading="lazy"/><div className="profile-footer"><span>Оформление событий</span><span className="mini-button">Написать <ArrowUpRight size={12}/></span></div></div></div>}
    <div className="preview-sticker"><span><Check size={17}/></span>{service === "rental" ? "Всё под рукой. Даже с телефона." : service === "projects" ? "Меньше списков. Больше ясности." : service === "market" ? "Хорошие вещи продолжают работать." : "Те, кто понимает вашу задачу."}</div>
  </div>;
}

export default function Home() {
  const [active, setActive] = useState<ServiceId>("rental");
  const [intents, setIntents] = useState<Record<string,string>>({ market:"sell", specialists:"team" });
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<ServiceId[]>(["rental"]);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [submittedServices, setSubmittedServices] = useState<ServiceId[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(Date.now());

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const s = params.get("service");
    if(s && ids.includes(s as ServiceId)){setActive(s as ServiceId);setSelected([s as ServiceId]);}
  },[]);

  useEffect(()=>{
    type Context = {registerTool:(tool:{name:string;description:string;inputSchema:object;annotations:object;execute:(input:unknown)=>Promise<unknown>}, options:{signal:AbortSignal})=>void|Promise<void>};
    const context=(document as Document & {modelContext?:Context}).modelContext;
    if(!context?.registerTool) return;
    const lifecycle=new AbortController();
    Promise.resolve(context.registerTool({
      name:"start_frents_bonus_request",
      description:"Open the Frents conference contact form with the requested service selected. Does not submit contact details or consent.",
      inputSchema:{type:"object",properties:{service:{type:"string",enum:ids}},required:["service"],additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      async execute(input:unknown){
        const service=(input as {service?:unknown})?.service;
        if(typeof service!=="string" || !ids.includes(service as ServiceId)) throw new Error("Unknown Frents service");
        chooseService(service); openForm(service as ServiceId);
        await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
        return {status:"form_open",service,submitted:false};
      }
    },{signal:lifecycle.signal})).catch(()=>{});
    return ()=>lifecycle.abort();
  },[]);

  function chooseService(value: string) {
    const next = value as ServiceId;
    setActive(next);
    const url = new URL(window.location.href); url.searchParams.set("service", next); window.history.replaceState(null,"",url);
  }
  function openForm(service?: ServiceId) {
    setSelected([service || active]); setSent(false); setError(""); setConsent(false); setRequestId(crypto.randomUUID()); setFormOpen(true); startedAt.current = Date.now();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if(!selected.length){setError("Выберите хотя бы одно направление.");return;}
    if(!consent){setError("Подтвердите согласие на обработку данных.");return;}
    setSending(true);
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch(leadsEndpoint, {method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId,name,contact,services:selected,intents,consent,source:params.get("source") || "conference",utm:Object.fromEntries(["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].map(k=>[k,params.get(k)||""])),website:new FormData(event.currentTarget).get("website"),elapsed:Date.now()-startedAt.current})});
      const result = await response.json() as { error?: string };
      if(!response.ok) throw new Error(result.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      setSubmittedServices([...selected]); setSent(true);
    } catch(e) {setError(e instanceof Error ? e.message : "Нет соединения. Проверьте интернет и попробуйте ещё раз.");}
    finally {setSending(false);}
  }
  const current=services[active];
  const alternate=active==="market"&&intents.market==="buy" || active==="specialists"&&intents.specialists==="provider";
  const benefits=alternate && current.alternate ? current.alternate.benefits : current.benefits;

  return <>
    <a className="skip-link" href="#services">Перейти к сервисам</a>
    <header className="site-header"><div className="header-inner"><Logo/><span className="header-divider"/><span className="header-context">Для тех, кто создаёт события</span><nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Основная навигация"><a href="#services" onClick={()=>setMenuOpen(false)}>Возможности</a><a href="#conference" onClick={()=>setMenuOpen(false)}>Бонусы конференции</a><a href="#app" onClick={()=>setMenuOpen(false)}>Приложение</a></nav><button className="header-cta" onClick={()=>openForm()}>Забрать бонус <Gift size={16}/></button><button className="menu-button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <span/>}</button></div></header>
    <main>
      <section className="hero wrap">
        <div className="hero-copy"><div className="eyebrow"><span className="conference-mark"><Sparkles size={13}/></span> ВСТРЕЧАЕМСЯ НА КОНФЕРЕНЦИИ</div><h1>Вы создаёте<br/><span>красоту.</span><br/>Мы — порядок.</h1><p className="hero-description">Прокат, проекты, декор и своя команда.<br className="desktop-break"/> Четыре сервиса Frents, чтобы у вас оставалось<br className="desktop-break"/> больше времени на то, что вы любите.</p><div className="hero-actions"><a className="button button-dark" href="#services">Найти свой сервис <ArrowDown size={18}/></a><button className="text-link" onClick={()=>openForm()}>Мне за бонусом <ArrowUpRight size={17}/></button></div><div className="hero-note"><Gift size={16}/><span>Особые условия для участников конференции</span></div><a className="hero-app-link" href="#app"><Smartphone size={16}/><span>И в своём приложении — iOS и Android</span><ArrowUpRight size={14}/></a></div>
        <div className="hero-visual"><img className="hero-photo" src={publicPath("/assets/hero-tablescape.webp")} alt="Современная сервировка: белые каллы, хромированные вазы и зелёный текстиль" width="1536" height="1024" fetchPriority="high"/><div className="image-label"><span>КРАСОТА — В ДЕТАЛЯХ.</span><span>Порядок — во Frents.</span></div><div className="hero-float"><div className="hero-float-icon"><Check size={19}/></div><div><strong>Всё сложилось.</strong><span>И проект, и команда, и декор.</span></div></div><div className="visual-index">F / 01</div></div>
      </section>
      <div className="audience-bar wrap"><span>ОДНА ПЛАТФОРМА. ВАШ КРУГ.</span><div><span>Декораторы</span><Plus size={13}/><span>Студии аренды</span><Plus size={13}/><span>Флористы</span><Plus size={13}/><span>Команды событий</span></div></div>
      <section className="services-section wrap" id="services"><div className="section-heading"><div><div className="eyebrow">ЧЕТЫРЕ СЕРВИСА. ОДНА ЭКОСИСТЕМА.</div><h2>Что освободит ваше время?</h2></div><p>Выберите свою задачу.<br/>Мы покажем, как Frents поможет с ней.</p></div>
        <Tabs value={active} onValueChange={chooseService} className="service-tabs"><TabsList className="service-grid" aria-label="Сервисы Frents">{ids.map((id,index)=>{const s=services[id];const Icon=icons[id];return <TabsTrigger value={id} key={id} className={`service-card card-${id}`}><span className="service-card-top"><span className="service-icon"><Icon size={23} strokeWidth={1.6}/></span><span className="service-number">0{index+1}</span></span><span className="service-audience">{s.audience}</span><span className="service-title">{s.cardTitle}</span><span className="service-summary">{s.cardDescription}</span><span className="service-card-bottom"><span>{s.tag}</span><span className="service-arrow"><ArrowUpRight size={20}/></span></span></TabsTrigger>})}</TabsList>
          {ids.map(id=><TabsContent value={id} key={id} className="service-content"><div ref={id===active ? detailRef : undefined} className="detail-grid"><div className="detail-copy"><div className="detail-label"><span>0{ids.indexOf(id)+1}</span> {services[id].name}</div>{(id==="market"||id==="specialists")&&<Tabs value={intents[id]} onValueChange={v=>setIntents({...intents,[id]:v})} className="intent-tabs"><TabsList aria-label="Ваша задача"><TabsTrigger value={id==="market" ? "sell" : "team"}>{id==="market" ? "Хочу продать" : "Ищу команду"}</TabsTrigger><TabsTrigger value={id==="market" ? "buy" : "provider"}>{id==="market" ? "Ищу декор" : "Предлагаю услуги"}</TabsTrigger></TabsList></Tabs>}<h3>{alternate && current.alternate ? current.alternate.title : services[id].title}</h3><p className="detail-description">{alternate && current.alternate ? current.alternate.description : services[id].description}</p><ul className="benefit-list">{benefits.map((b,i)=><li key={i}><span><Check size={15}/></span><div><strong>{b[0]}</strong><p>{b[1]}</p></div></li>)}</ul><div className="detail-actions"><button className="button button-dark" onClick={()=>openForm(id)}>{id==="market"&&intents.market==="buy" ? "Забрать чек-лист покупки" : id==="specialists"&&intents.specialists==="provider" ? "Получить чек-лист профиля" : services[id].cta}<ArrowUpRight size={17}/></button><span>{services[id].footnote}</span></div></div><ProductPreview service={id} intent={intents[id]}/></div><div className="detail-bonus"><span className="bonus-small-icon"><Gift size={21}/></span><div><strong>На конференции — с приятным дополнением</strong><p>{alternate && current.alternate ? current.alternate.bonus : services[id].bonus}</p></div><button className="text-link" onClick={()=>openForm(id)}>Это для меня <ArrowRight size={17}/></button></div><ScreenStoryboard service={id}/></TabsContent>)}
        </Tabs>
      </section>
      <AppShowcase/><section className="ecosystem wrap"><span className="eyebrow">ОТ ЗАМЫСЛА ДО МОНТАЖА</span><h2>Ваши идеи. Ваши люди.<br/><span>Всё в одном кругу.</span></h2><div className="ecosystem-steps">{[{i:FolderOpen,t:"Соберите проект",d:"Начните с идеи и своего реквизита."},{i:Boxes,t:"Найдите недостающее",d:"В аренде или на барахолке."},{i:UsersRound,t:"Пригласите своих",d:"Специалистов, близких вам по стилю."},{i:Sparkles,t:"Создавайте",d:"Когда за кулисами всё в порядке."}].map((s,i)=><div key={i} className="ecosystem-step"><div><s.i size={22} strokeWidth={1.5}/><span>0{i+1}</span></div><h4>{s.t}</h4><p>{s.d}</p></div>)}</div></section>
      <section className="conference-section wrap" id="conference"><div className="conference-panel"><div className="conference-copy"><span className="eyebrow"><Gift size={15}/> ДЛЯ УЧАСТНИКОВ КОНФЕРЕНЦИИ</span><h2>Знакомство,<br/>с которого<br/>что-то начнётся.</h2><p>Выберите то, что интересно именно вам.<br/>Мы пришлём полезный материал и расскажем<br className="desktop-break"/> об условиях для участников.</p><button className="button button-dark" onClick={()=>openForm()}>Забрать свой бонус <ArrowUpRight size={18}/></button><span className="conference-micro">Одна короткая форма. Можно выбрать несколько сервисов.</span></div><div className="conference-ticket"><div className="ticket-top"><span className="mini-brand">FRENTS</span><span>ДЛЯ СВОИХ</span></div><div className="ticket-main"><span className="ticket-label">ВАШЕ ПРИГЛАШЕНИЕ</span><h3>Больше<br/>возможностей.</h3><div className="ticket-benefits"><p><Check size={15}/> Личный разбор задач проката</p><p><Check size={15}/> Ранний доступ для декораторов</p><p><Check size={15}/> Гид по продаже и покупке декора</p><p><Check size={15}/> Чек-лист для команды и портфолио</p></div></div><div className="ticket-bottom"><span>СОЗДАВАТЬ ЛЕГЧЕ ВМЕСТЕ</span><ArrowUpRight size={29}/></div></div></div></section>
      <section className="faq-section wrap" id="faq"><div><span className="eyebrow">ЕЩЁ ПАРА ДЕТАЛЕЙ</span><h2>Вы могли<br/>об этом подумать.</h2></div><Accordion type="single" collapsible className="faq-list">{[["Можно пользоваться только одним сервисом?","Да. Начните с той задачи, которая актуальна сейчас: прокат, свои проекты, барахолка или специалисты. Интерес к остальным можно отметить позже."],["Я декоратор и ничего не сдаю в аренду. Мне подходит?","Да. Направление «Проекты и свой склад» задумано для работы со своим реквизитом. Вы оставляете заявку на ранний доступ — публиковать вещи для аренды не нужно."],["Барахолка бесплатна только для участников?","Нет. Размещение объявлений на барахолке бесплатно и вне конференции. Бонус участника — полезный гид по продаже и покупке декора."],["Что произойдёт после заявки?","Сразу после отправки можно скачать материалы по выбранным направлениям. Команда Frents свяжется с вами по указанному контакту, чтобы рассказать о сервисе и условиях подключения."],["Сколько стоят сервисы?","Размещение на барахолке бесплатно. Для студий аренды есть разные тарифы: подберём вариант под ваши задачи. Условия новых направлений обсудим при знакомстве."]].map(([q,a],i)=><AccordionItem value={String(i)} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></section>
    </main>
    <footer className="site-footer"><div className="wrap footer-top"><Logo light/><p>Хорошие события начинаются<br/>с хороших связей.</p><a href="https://frents.ru" target="_blank" rel="noreferrer">Перейти на frents.ru <ArrowUpRight size={16}/></a><a href="#services">Выбрать сервис <ArrowUpRight size={16}/></a></div><div className="wrap footer-bottom"><span>© 2026 FRENTS</span><a href="https://frents.ru/moskva/policy-privacy" target="_blank" rel="noreferrer">Политика конфиденциальности</a><span>Для тех, кто создаёт.</span></div></footer>
    <div className="mobile-bonus"><span>Для участников конференции</span><button onClick={()=>openForm()}>Забрать бонус <Gift size={15}/></button></div>
    <Dialog open={formOpen} onOpenChange={v=>{if(!sending)setFormOpen(v)}}><DialogContent className="lead-dialog" showCloseButton={false}><DialogClose className="dialog-close" disabled={sending} aria-label="Закрыть форму"><X size={21}/></DialogClose>{sent ? <div className="success-state"><span className="success-icon"><Check size={29}/></span><span className="eyebrow">РАДЫ ЗНАКОМСТВУ</span><DialogTitle>Всё начинается<br/>с хороших связей.</DialogTitle><DialogDescription>Заявка получена. Мы свяжемся с вами по указанному контакту. А полезные материалы уже здесь:</DialogDescription><div className="download-list">{submittedServices.map(id=><a key={id} href={publicPath(`/bonuses/${id}.html`)} target="_blank" rel="noreferrer"><span>{services[id].download}</span><Download size={19}/></a>)}</div><button className="button button-dark" onClick={()=>setFormOpen(false)}>Продолжить знакомство <ArrowRight size={17}/></button></div> : <><span className="form-eyebrow"><Gift size={18}/> БОНУС УЧАСТНИКА</span><DialogTitle>Давайте создадим<br/>что-то хорошее.</DialogTitle><DialogDescription>Отметьте интересные направления. Пришлём материалы и расскажем, с чего начать.</DialogDescription><form onSubmit={submit} className="lead-form"><fieldset><legend>Что вам интересно?</legend><div className="form-services">{ids.map(id=><label className={`interest-chip ${selected.includes(id) ? "selected" : ""}`} key={id}><Checkbox checked={selected.includes(id)} onCheckedChange={checked=>setSelected(checked ? [...selected,id] : selected.filter(s=>s!==id))}/><span>{services[id].shortName}</span></label>)}</div></fieldset><label className="field-label" htmlFor="lead-name">Как к вам обращаться <span>необязательно</span></label><input id="lead-name" name="name" autoComplete="name" maxLength={80} placeholder="Ваше имя" value={name} onChange={e=>setName(e.target.value)}/><label className="field-label" htmlFor="lead-contact">Telegram, телефон или email</label><input id="lead-contact" name="contact" autoComplete="off" required minLength={5} maxLength={120} placeholder="@username, +7… или email" value={contact} onChange={e=>setContact(e.target.value)}/><div className="honeypot" aria-hidden="true"><label>Ваш сайт<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="consent-label"><Checkbox checked={consent} onCheckedChange={v=>setConsent(v===true)} aria-label="Согласие на обработку персональных данных"/><span>Даю <a href="https://frents.ru/moskva/personal-data-consent" target="_blank" rel="noreferrer">согласие на обработку персональных данных</a> для связи по заявке и принимаю <a href="https://frents.ru/moskva/policy-privacy" target="_blank" rel="noreferrer">политику конфиденциальности</a>.</span></label>{error&&<p className="form-error" role="alert">{error}</p>}<button type="submit" className="button button-dark submit-button" disabled={sending}>{sending ? <><LoaderCircle className="spin" size={18}/> Отправляем…</> : <>Получить бонус и подробности <ArrowUpRight size={18}/></>}</button><p className="form-note">Свяжемся только по выбранным направлениям.</p></form></>}</DialogContent></Dialog>
  </>;
}
