import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const leads = sqliteTable("leads", {
 id: text("id").primaryKey(),
 name: text("name").notNull(),
 contact: text("contact").notNull(),
 services: text("services").notNull(),
 intents: text("intents").notNull(),
 source: text("source").notNull(),
 utm: text("utm").notNull(),
 consentVersion: text("consent_version").notNull(),
 createdAt: integer("created_at").notNull(),
 ipHash: text("ip_hash").notNull(),
}, table => [index("leads_ip_created_idx").on(table.ipHash, table.createdAt)]);
