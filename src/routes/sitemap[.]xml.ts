import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://zentralverband-goldschmiede.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/der-zv", changefreq: "monthly", priority: "0.8" },
  { path: "/gold-silberschmiede", changefreq: "monthly", priority: "0.8" },
  { path: "/aus-weiterbildung", changefreq: "monthly", priority: "0.8" },
  { path: "/fortbildungen", changefreq: "monthly", priority: "0.7" },
  { path: "/wettbewerbe", changefreq: "monthly", priority: "0.7" },
  { path: "/nachhaltigkeit", changefreq: "monthly", priority: "0.7" },
  { path: "/immaterielles-kulturerbe", changefreq: "yearly", priority: "0.6" },
  { path: "/125-jahre", changefreq: "yearly", priority: "0.6" },
  { path: "/innungen", changefreq: "monthly", priority: "0.8" },
  { path: "/mitgliedersuche", changefreq: "weekly", priority: "0.9" },
  { path: "/aktuell", changefreq: "weekly", priority: "0.8" },
  { path: "/kontakt", changefreq: "yearly", priority: "0.6" },
  { path: "/impressum", changefreq: "yearly", priority: "0.3" },
  { path: "/datenschutz", changefreq: "yearly", priority: "0.3" },
  { path: "/barrierefreiheit", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const urls = entries
          .map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              `    <lastmod>${today}</lastmod>`,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
