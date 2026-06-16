import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Leaf, Recycle, Sprout } from "lucide-react";

export const Route = createFileRoute("/nachhaltigkeit")({
  head: () => ({
    meta: [
      { title: "Nachhaltigkeit & Fairtrade" },
      { name: "description", content: "Green Economy, Fairtrade und Ressourceneffizienz im Goldschmiedehandwerk." },
    ],
  }),
  component: NachhaltigkeitPage,
});

function NachhaltigkeitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Verantwortung"
        title="Nachhaltigkeit & Fairtrade"
        intro="Der Zentralverband tritt ein für Green Economy und Zukunftslösungen mit Ressourceneffizienz."
      />
      <section className="container-prose py-12 sm:py-16">
        <div className="grid gap-px bg-border rounded-sm overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Leaf, title: "Green Economy", text: "Ökologisch denken, ökonomisch handeln – im Sinne kommender Generationen." },
            { icon: Recycle, title: "Ressourceneffizienz", text: "Wiederverwertung, Umarbeitung und ressourcenschonende Prozesse stehen im Mittelpunkt." },
            { icon: Sprout, title: "Fairtrade-Gold", text: "Wir unterstützen Initiativen für fair gewonnenes Gold und transparente Lieferketten." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-card p-6 sm:p-8">
              <Icon className="text-accent" size={28} strokeWidth={1.5} aria-hidden />
              <h2 className="mt-4 sm:mt-5 font-display text-lg sm:text-xl text-balance">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
