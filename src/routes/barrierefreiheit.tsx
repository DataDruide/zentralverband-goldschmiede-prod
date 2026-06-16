import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/barrierefreiheit")({
  head: () => ({ meta: [{ title: "Barrierefreiheitserklärung" }] }),
  component: BarrierePage,
});

function BarrierePage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Barrierefreiheitserklärung" />
      <section className="container-prose py-16 max-w-3xl space-y-5 text-foreground/85 leading-relaxed">
        <p>
          Der Zentralverband der Deutschen Gold- und Silberschmiede e.V. ist bemüht, seine
          Website im Einklang mit den geltenden nationalen Rechtsvorschriften barrierefrei
          zugänglich zu machen.
        </p>
        <p className="text-muted-foreground text-sm">
          Diese Erklärung wird derzeit überarbeitet. Hinweise zur Barrierefreiheit nehmen wir
          gerne entgegen unter info@zentralverband-goldschmiede.de.
        </p>
      </section>
    </>
  );
}
