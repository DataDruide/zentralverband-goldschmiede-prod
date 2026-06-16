import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/wettbewerbe")({
  head: () => ({
    meta: [
      { title: "Wettbewerbe" },
      { name: "description", content: "Wettbewerbe des Zentralverbandes." },
    ],
  }),
  component: WettbewerbePage,
});

function WettbewerbePage() {
  return (
    <>
      <PageHeader
        eyebrow="Auszeichnungen"
        title="Wettbewerbe"
        intro="Bühne für herausragendes Handwerk – nationale und internationale Wettbewerbe."
      />
      <section className="container-prose py-12 sm:py-16">
        <div className="rounded-sm border border-dashed border-border bg-secondary/40 p-6 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-balance">Inhalte folgen</h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground text-pretty max-w-xl mx-auto">
            Aktuelle Wettbewerbsausschreibungen werden hier zeitnah veröffentlicht.
          </p>
        </div>
      </section>
    </>
  );
}
