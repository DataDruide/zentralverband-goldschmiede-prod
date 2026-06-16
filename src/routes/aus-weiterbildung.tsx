import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/aus-weiterbildung")({
  head: () => ({
    meta: [
      { title: "Aus- & Weiterbildung" },
      { name: "description", content: "Aus- und Weiterbildung im Gold- und Silberschmiedehandwerk." },
    ],
  }),
  component: AusWeiterPage,
});

function AusWeiterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nachwuchs"
        title="Aus- & Weiterbildung"
        intro="Der Meistertitel ist Ausdruck von Qualität, Kompetenz, Verbraucherschutz und Nachhaltigkeit."
      />
      <section className="container-prose py-12 sm:py-16 grid gap-6 sm:gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Ausbildung",
            text: "Die Ausbildung zur Goldschmiedin / zum Goldschmied ist ein besonderes Anliegen des Verbandes – fachlich fundiert und gestalterisch frei.",
          },
          {
            title: "Meistertitel",
            text: "Der Meistertitel steht für höchste handwerkliche Qualität und ist ein verlässliches Versprechen an die Kundschaft.",
          },
          {
            title: "Weiterbildung",
            text: "Wir bieten Weiterbildungen für Gestalter:innen, technische Fachkräfte und Inhaber:innen von Betrieben.",
          },
        ].map((b) => (
          <div key={b.title} className="rounded-sm border border-border bg-card p-6 sm:p-8 hover:border-accent/60 transition-colors">
            <h2 className="font-display text-xl sm:text-2xl text-balance">{b.title}</h2>
            <p className="mt-3 sm:mt-4 text-sm text-foreground/80 leading-relaxed text-pretty">{b.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
