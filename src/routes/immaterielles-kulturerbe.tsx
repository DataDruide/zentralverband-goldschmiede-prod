import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GraduationCap, Hammer, Heart, Globe2 } from "lucide-react";

export const Route = createFileRoute("/immaterielles-kulturerbe")({
  head: () => ({
    meta: [
      { title: "Immaterielles Kulturerbe – Gold- & Silberschmiedehandwerk" },
      { name: "description", content: "Das deutsche Gold- und Silberschmiedehandwerk ist seit 2024 Teil des bundesweiten Verzeichnisses des Immateriellen Kulturerbes der UNESCO." },
    ],
  }),
  component: IKEPage,
});

function IKEPage() {
  return (
    <>
      <PageHeader
        eyebrow="UNESCO"
        title="Immaterielles Kulturerbe"
        intro="Wissen. Können. Weitergeben. Das Gold- und Silberschmiedehandwerk wurde 2024 in das bundesweite Verzeichnis des Immateriellen Kulturerbes der UNESCO aufgenommen."
      />
      <section className="bg-emerald-band border-b border-border">
        <div className="container-prose py-12 sm:py-16 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <span className="chip chip-emerald">Anerkannt 2024</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-balance">Über 5000 Jahre lebendige Tradition</h2>
            <p className="mt-4 text-foreground/85 leading-relaxed text-pretty">
              Seit den frühen Hochkulturen begleitet das Gold- und Silberschmiedehandwerk die
              Menschheit. Mit der Aufnahme in das bundesweite Verzeichnis des Immateriellen
              Kulturerbes würdigt die UNESCO ein Handwerk, das technisches Können, künstlerische
              Gestaltung und Generationenwissen vereint.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Hammer, label: "Können", text: "Über 50 traditionelle Techniken – vom Treiben bis zur Granulation." },
              { icon: GraduationCap, label: "Weitergeben", text: "Lehrlinge, Gesellen, Meister – ein gelebtes Lernsystem." },
              { icon: Heart, label: "Identität", text: "Schmuck als Ausdruck persönlicher Geschichten." },
              { icon: Globe2, label: "Weltweit", text: "Teil einer globalen Tradition handwerklicher Kultur." },
            ].map(({ icon: Icon, label, text }) => (
              <div key={label} className="card-jewel p-4">
                <Icon className="text-[var(--emerald)]" size={22} strokeWidth={1.5} />
                <p className="mt-2 font-display text-lg">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-12 sm:py-20 max-w-3xl space-y-6 text-foreground/85 leading-relaxed text-pretty">
        <h2 className="font-display text-2xl sm:text-3xl text-foreground">Was bedeutet die Aufnahme?</h2>
        <p>
          Die Aufnahme bestätigt das Gold- und Silberschmiedehandwerk als schützenswerte
          kulturelle Ausdrucksform. Sie würdigt die Werkstätten, Meisterinnen und Meister, die
          ihr Wissen Tag für Tag weitergeben und damit ein Stück lebendige Geschichte bewahren.
        </p>
        <p>
          Für den Zentralverband ist diese Anerkennung Ansporn, die Ausbildung weiter zu stärken,
          den Meistertitel zu schützen und das Handwerk in einer zunehmend industrialisierten
          Welt sichtbar zu halten.
        </p>
      </section>
    </>
  );
}
