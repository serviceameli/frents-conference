import { z } from "zod";
import { serviceIds } from "@/lib/services";
const contact = z.string().trim().min(5).max(120).refine(v => /^@[a-zA-Z0-9_]{5,32}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || (/^[+\d\s()\-]+$/.test(v) && v.replace(/\D/g,"").length >= 10 && v.replace(/\D/g,"").length <= 15), "Укажите Telegram в формате @username, телефон с кодом страны или email.");
export const leadSchema = z.object({
 requestId:z.string().uuid(), name:z.string().trim().max(80).default(""), contact,
 services:z.array(z.enum(serviceIds)).min(1).max(serviceIds.length).transform(v=>[...new Set(v)]),
 intents:z.object({market:z.enum(["sell","buy"]).optional(),specialists:z.enum(["team","provider"]).optional()}).default({}),
 source:z.string().max(160).default("conference"),
 utm:z.object({utm_source:z.string().max(300).optional(),utm_medium:z.string().max(300).optional(),utm_campaign:z.string().max(300).optional(),utm_content:z.string().max(300).optional(),utm_term:z.string().max(300).optional()}).default({}),
 consent:z.literal(true), website:z.string().max(0).nullable().optional(), elapsed:z.number().nonnegative().optional(),
});
