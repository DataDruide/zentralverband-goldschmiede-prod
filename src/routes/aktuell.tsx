import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/aktuell")({
  head: () => ({
    meta: [
      { title: "Aktuell — News & Termine" },
      { name: "description", content: "Aktuelle Meldungen und Termine des Zentralverbandes." },
    ],
  }),
  component: AktuellPage,
});

const news = [
  {
    date: "13.05.2026",
    title: "Vortrag der Innung der Gold- und Silberschmiede München und Oberbayern am 13.06.2026",
    body: "Am Samstag, den 13. Juni 2026 veranstaltet die Gold- und Silberschmiedeinnung München/Oberbayern nachmittags in den Räumen der Münchner Berufs- und Meisterschule für Gold- und Silberschmiede, Luisenstraße 9, einen kunsthistorischen Vortrag für alle Interessierte aus unserem schönen Handwerk zum Thema: »Viktorianisch und Art Deco – die Geheimnisse hinter diesen vielfältigen Epochen der Schmuckgeschichte«.",
  },
  {
    date: "12.05.2026",
    title: "Frühjahrstagung 09. Mai 2026 in Würzburg",
    body: "Am 09. Mai 2026 trafen sich 39 Delegierte, Gäste und Ehrenmitglieder des Zentralverbandes der Deutschen Gold- und Silberschmiede e.V. zu ihrer Frühjahrstagung in der wunderschönen und gastfreundlichen Stadt Würzburg.",
  },
  {
    date: "Goldpreis",
    title: "Der aktuelle Goldpreis mit Entwicklungsverlauf über den Tag",
    body: "Aktuelle Notierungen für Mitgliedsbetriebe – tagesgenau aufbereitet.",
  },
];

function AktuellPage() {
  return (
    <>
      <PageHeader eyebrow="News" title="Aktuell" intro="Meldungen, Tagungen und Termine aus dem Verband." />
      <section className="container-prose py-12 sm:py-16">
        <div className="divide-y divide-border">
          {news.map((n) => (
            <article key={n.title} className="grid gap-4 sm:gap-6 py-8 sm:py-10 md:grid-cols-12">
              <time className="md:col-span-2 text-xs sm:text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {n.date}
              </time>
              <div className="md:col-span-10">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl leading-tight text-balance">{n.title}</h2>
                <p className="mt-3 sm:mt-4 text-foreground/80 leading-relaxed max-w-3xl text-pretty">{n.body}</p>
                <Link to="/aktuell" className="mt-4 inline-block text-sm text-accent hover:underline underline-offset-2">
                  weiterlesen →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
