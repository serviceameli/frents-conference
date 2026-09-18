import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const base = "/frents-conference/";
const outDir = join(projectRoot, "pages-dist");

export default defineConfig({
  root: fileURLToPath(new URL("./", import.meta.url)),
  base,
  publicDir: join(projectRoot, "public"),
  resolve: { alias: { "@": projectRoot } },
  define: {
    "process.env.NEXT_PUBLIC_BASE_PATH": JSON.stringify(base.slice(0, -1)),
    "process.env.NEXT_PUBLIC_LEADS_URL": JSON.stringify("https://frents-conference.ameli-aniri.chatgpt.site/api/leads"),
  },
  plugins: [react(), {
    name: "frents-pages-bonus-paths",
    closeBundle() {
      const dir = join(outDir, "bonuses");
      for (const file of readdirSync(dir)) {
        if (!file.endsWith(".html")) continue;
        const path = join(dir, file);
        const html = readFileSync(path, "utf8")
          .replaceAll('href="/"', `href="${base}"`)
          .replaceAll('href="/favicon.svg"', `href="${base}favicon.svg"`)
          .replaceAll('src="/assets/', `src="${base}assets/`)
          .replaceAll("url(/assets/", `url(${base}assets/`);
        writeFileSync(path, html);
      }
      writeFileSync(join(outDir, ".nojekyll"), "");
    },
  }],
  build: { outDir, emptyOutDir: true, rollupOptions: { input: { main: join(projectRoot, "github-pages/index.html"), baraholka: join(projectRoot, "github-pages/baraholka/index.html") } } },
});
