import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { LinkButton } from "@/components/site/Button";

export const Route = createFileRoute("/gold-silberschmiede")({
  head: () => ({
    meta: [
      { title: "Gold- & Silberschmiede — Ihr Fachmann für Schmückendes" },
      {
        name: "description",
        content: "Finden Sie Ihren Gold- und Silberschmied in Ihrer Nähe – individuelle Anfertigungen, Umarbeitungen, Service und Reparatur.",
      },
    ],
  }),
  component: GoldSilberPage,
});

function GoldSilberPage() {
  return (
    <>
      <PageHeader
        eyebrow="Mitgliedsbetriebe"
        title="Gold- & Silberschmiede"
        intro="Ihr Fachmann für Schmückendes – individuelle Anfertigungen, Umarbeitungen, Verkauf, Service und Reparatur."
      />
      <section className="container-prose py-12 sm:py-16 grid gap-8 lg:gap-12 lg:grid-cols-2">
        <div className="space-y-5 text-foreground/85 leading-relaxed text-pretty">
          <p>
            Ihren Gold- und Silberschmied finden Sie auch in Ihrer Nähe. Er ist Ihr Fachmann für
            individuelle Anfertigungen, Umarbeitungen, Verkauf, Service und Reparatur. Ihr
            Fachmann für Schmückendes!
          </p>
          <p>
            Schauen Sie unter »Mitgliedsbetriebe« – dort sind unsere organisierten Betriebe
            aufgeführt. Sie können sich vertrauensvoll an die dort angegebenen Adressen wenden.
          </p>
          <LinkButton to="/mitgliedersuche" className="mt-2">Mitgliedsbetrieb suchen</LinkButton>
        </div>
        <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl text-balance">Leistungen unserer Betriebe</h2>
          <ul className="mt-5 sm:mt-6 grid gap-3 text-sm text-foreground/80">
            {[
              "Individuelle Anfertigungen",
              "Trauringe & Ehrungsschmuck",
              "Umarbeitungen aus eigenem Material",
              "Reparatur und Service",
              "Beratung zu Edelmetallen & Edelsteinen",
              "Restaurierung & Bewertung",
            ].map((s) => (
              <li key={s} className="flex gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <span className="text-accent shrink-0" aria-hidden>◆</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
