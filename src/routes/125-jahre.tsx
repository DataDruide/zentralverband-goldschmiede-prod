import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/125-jahre")({
  head: () => ({
    meta: [
      { title: "125 Jahre Zentralverband" },
      { name: "description", content: "125 Jahre Zentralverband der Deutschen Gold- & Silberschmiede – ein Verband mit Geschichte." },
    ],
  }),
  component: JubilaeumPage,
});

const milestones = [
  { jahr: "1900", text: "Gründung des Zentralverbandes als Dachverband der Goldschmiede-Innungen im Deutschen Reich." },
  { jahr: "1925", text: "Erste reichsweite Ausbildungsordnung für Gold- und Silberschmiede unter Mitwirkung des Verbandes." },
  { jahr: "1953", text: "Wiederaufnahme der Verbandsarbeit nach dem Krieg, Neugründung der Innungen in der Bundesrepublik." },
  { jahr: "1990", text: "Wiedervereinigung der ost- und westdeutschen Goldschmiede-Innungen unter einem Dach." },
  { jahr: "2015", text: "Engagement für Fairtrade-Gold und ressourcenschonende Goldschmiedearbeit." },
  { jahr: "2024", text: "Aufnahme des Gold- und Silberschmiede-Handwerks in das Verzeichnis des Immateriellen Kulturerbes der UNESCO." },
  { jahr: "2025", text: "125-jähriges Jubiläum – ein Vierteljahrtausend Tradition, Handwerk und Verantwortung." },
];

function JubilaeumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Jubiläum"
        title="125 Jahre Zentralverband"
        intro="Seit 1900 vertreten wir das deutsche Gold- und Silberschmiedehandwerk – politisch, wirtschaftlich und kulturell."
      />
      <section className="bg-hero-grad border-b border-border">
        <div className="container-prose py-12 sm:py-16 text-center">
          <Sparkles className="mx-auto text-[var(--ember)]" size={42} strokeWidth={1.5} />
          <p className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-balance" style={{ background: "linear-gradient(120deg, var(--gold), var(--ember), var(--plum))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            1900 — 2025
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-pretty">
            Ein Vierteljahrtausend hat uns durch Kaiserreich, Republik, Wiederaufbau, Wiedervereinigung
            und in die digitale Gegenwart geführt – getragen von der Leidenschaft für unser Handwerk.
          </p>
        </div>
      </section>

      <section className="container-prose py-12 sm:py-20">
        <div className="relative max-w-3xl mx-auto">
          <div aria-hidden className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gold)] via-[var(--ember)] to-[var(--plum)]" />
          <ol className="space-y-10 sm:space-y-14">
            {milestones.map((m, i) => (
              <li key={m.jahr} className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${i % 2 ? "sm:[&>*:first-child]:col-start-2" : ""}`}>
                <div className={`pl-12 sm:pl-0 ${i % 2 ? "sm:text-left" : "sm:text-right"}`}>
                  <span className="absolute left-2.5 sm:left-1/2 sm:-translate-x-1/2 top-1 grid h-4 w-4 place-items-center rounded-full bg-card border-2 border-[var(--gold)] shadow-md" />
                  <p className="font-display text-2xl sm:text-3xl text-accent">{m.jahr}</p>
                  <p className="mt-2 text-sm sm:text-base text-foreground/85 leading-relaxed text-pretty">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
