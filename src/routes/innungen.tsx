import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { MapPin, ExternalLink } from "lucide-react";
import gallery1 from "@/assets/innung-1.jpg";
import gallery2 from "@/assets/innung-2.jpg";
import gallery3 from "@/assets/innung-3.jpg";
import gallery4 from "@/assets/innung-4.jpg";

const galleryImages = [
  { src: gallery1, alt: "Werkzeuge und Ringe auf der Werkbank einer Goldschmiede" },
  { src: gallery2, alt: "Goldschmied lötet einen silbernen Anhänger" },
  { src: gallery3, alt: "Handgefertigte Gold- und Silberringe auf Samttablett" },
  { src: gallery4, alt: "Auszubildender feilt einen Silberring an der Werkbank" },
];

export const Route = createFileRoute("/innungen")({
  head: () => ({
    meta: [
      { title: "Innungen — Zentralverband der Deutschen Gold- & Silberschmiede" },
      { name: "description", content: "Übersicht aller Landesinnungen und regionalen Innungen der Gold- und Silberschmiede in Deutschland." },
    ],
  }),
  component: InnungenPage,
});

interface Innung {
  name: string;
  bundesland: string;
  ort?: string;
  website?: string;
  email?: string;
}

const innungen: Innung[] = [
  { name: "Innung der Gold- und Silberschmiede Baden-Württemberg", bundesland: "Baden-Württemberg", ort: "Stuttgart" },
  { name: "Innung der Gold- und Silberschmiede München und Oberbayern", bundesland: "Bayern", ort: "München" },
  { name: "Goldschmiede-Innung Nürnberg / Mittelfranken", bundesland: "Bayern", ort: "Nürnberg" },
  { name: "Goldschmiede-Innung Berlin", bundesland: "Berlin", ort: "Berlin" },
  { name: "Goldschmiede-Innung Brandenburg", bundesland: "Brandenburg", ort: "Potsdam" },
  { name: "Innung Bremen für Gold- und Silberschmiede", bundesland: "Bremen", ort: "Bremen" },
  { name: "Goldschmiede-Innung Hamburg", bundesland: "Hamburg", ort: "Hamburg" },
  { name: "Landesinnung Hessen der Gold- und Silberschmiede", bundesland: "Hessen", ort: "Frankfurt am Main" },
  { name: "Innung Mecklenburg-Vorpommern", bundesland: "Mecklenburg-Vorpommern", ort: "Schwerin" },
  { name: "Landesinnung Niedersachsen", bundesland: "Niedersachsen", ort: "Hannover" },
  { name: "Goldschmiede-Innung Nordrhein", bundesland: "Nordrhein-Westfalen", ort: "Düsseldorf" },
  { name: "Goldschmiede-Innung Westfalen", bundesland: "Nordrhein-Westfalen", ort: "Dortmund" },
  { name: "Landesinnung Rheinland-Pfalz", bundesland: "Rheinland-Pfalz", ort: "Mainz" },
  { name: "Innung des Saarlandes", bundesland: "Saarland", ort: "Saarbrücken" },
  { name: "Goldschmiede-Innung Sachsen", bundesland: "Sachsen", ort: "Dresden" },
  { name: "Innung Sachsen-Anhalt", bundesland: "Sachsen-Anhalt", ort: "Magdeburg" },
  { name: "Innung Schleswig-Holstein", bundesland: "Schleswig-Holstein", ort: "Kiel" },
  { name: "Goldschmiede-Innung Thüringen", bundesland: "Thüringen", ort: "Erfurt" },
];

function InnungenPage() {
  const byLand = innungen.reduce<Record<string, Innung[]>>((acc, i) => {
    (acc[i.bundesland] ??= []).push(i);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="Verzeichnis"
        title="Landesinnungen"
        intro="Die regionalen Gold- und Silberschmiede-Innungen sind die Säulen unseres Verbandes – Ansprechpartner für Mitglieder vor Ort."
      />
      <section className="container-prose py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap gap-3 items-center justify-between">
          <p className="text-sm text-muted-foreground">{innungen.length} Innungen in {Object.keys(byLand).length} Bundesländern</p>
          <Link to="/mitgliedersuche" className="text-sm text-accent hover:underline">
            Betriebe der Innungen durchsuchen →
          </Link>
        </div>

        {/* Bildergalerie */}
        <section className="mb-12" aria-labelledby="innung-galerie">
          <h2 id="innung-galerie" className="font-display text-2xl mb-4 flex items-center gap-2">
            <span className="inline-block h-1.5 w-6 bg-gradient-to-r from-[var(--gold)] to-[var(--ember)] rounded-full" />
            Aus den Werkstätten der Innungen
          </h2>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((img, idx) => (
              <figure key={idx} className="group relative overflow-hidden rounded-xl border border-border aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </section>

        <div className="space-y-8">
          {Object.entries(byLand).sort(([a], [b]) => a.localeCompare(b, "de")).map(([land, list]) => (
            <div key={land}>
              <h2 className="font-display text-xl mb-3 flex items-center gap-2">
                <span className="inline-block h-1.5 w-6 bg-gradient-to-r from-[var(--gold)] to-[var(--ember)] rounded-full" />
                {land}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((i) => (
                  <article key={i.name} className="card-jewel p-4">
                    <h3 className="font-medium text-sm leading-snug text-balance">{i.name}</h3>
                    {i.ort && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={12} className="text-accent" />{i.ort}
                      </p>
                    )}
                    {i.website && (
                      <a href={i.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline">
                        Website <ExternalLink size={11} />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
