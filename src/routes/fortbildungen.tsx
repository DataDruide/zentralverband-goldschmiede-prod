import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/fortbildungen")({
  head: () => ({
    meta: [
      { title: "Fortbildungen beim ZV" },
      { name: "description", content: "Fortbildungsangebote des Zentralverbandes." },
    ],
  }),
  component: FortbildungenPage,
});

function FortbildungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wissen"
        title="Fortbildungen beim ZV"
        intro="Qualifizierte Fortbildungen für Gold- und Silberschmiede – fachlich fundiert, praxisnah, gemeinschaftlich."
      />
      <section className="container-prose py-12 sm:py-16">
        <div className="rounded-sm border border-dashed border-border bg-secondary/40 p-6 sm:p-10 text-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-accent">In Vorbereitung</p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl text-balance">Aktuelle Fortbildungstermine folgen</h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto text-pretty">
            Wir aktualisieren das Fortbildungsprogramm regelmäßig. Für individuelle Anfragen
            wenden Sie sich gerne direkt an die Geschäftsstelle.
          </p>
        </div>
      </section>
    </>
  );
}
