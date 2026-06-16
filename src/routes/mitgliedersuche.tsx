import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail, Globe, Search, Award } from "lucide-react";

export const Route = createFileRoute("/mitgliedersuche")({
  head: () => ({
    meta: [
      { title: "Mitgliedsbetrieb finden" },
      { name: "description", content: "Goldschmiede und Silberschmiede im Zentralverband – Suche nach Ort, PLZ oder Name." },
    ],
  }),
  component: MitgliedersuchePage,
});

function MitgliedersuchePage() {
  const [q, setQ] = useState("");
  const [land, setLand] = useState<string>("");
  const [meisterOnly, setMeisterOnly] = useState(false);
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isLoading } = useQuery({
    queryKey: ["betriebe", debounced, land, meisterOnly],
    queryFn: async () => {
      let qb = supabase.from("betriebe").select("*").order("name");
      if (debounced) qb = qb.or(`name.ilike.%${debounced}%,ort.ilike.%${debounced}%,plz.ilike.%${debounced}%,inhaber.ilike.%${debounced}%`);
      if (land) qb = qb.eq("bundesland", land);
      if (meisterOnly) qb = qb.eq("meisterbetrieb", true);
      const { data, error } = await qb.limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: laender } = useQuery({
    queryKey: ["betriebe-bundeslaender"],
    queryFn: async () => {
      const { data } = await supabase.from("betriebe").select("bundesland");
      const set = new Set<string>();
      data?.forEach((b) => b.bundesland && set.add(b.bundesland));
      return Array.from(set).sort();
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="Verzeichnis"
        title="Mitgliedsbetrieb finden"
        intro="Goldschmiede- und Silberschmiede-Betriebe des Zentralverbandes – durchsuchbar nach Ort, PLZ oder Name."
      />
      <section className="container-prose py-12 sm:py-16">
        <div className="mb-6 flex flex-wrap gap-2">
          <Link to="/innungen" className="chip hover:border-accent hover:text-accent transition-colors">
            → Alle Landesinnungen ansehen
          </Link>
        </div>
        {/* Filter */}
        <div className="card-jewel p-4 sm:p-6 mb-8 sticky top-[72px] z-10 bg-card/95 backdrop-blur">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, Ort oder PLZ…"
                aria-label="Suche"
                className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-sm min-h-11 hover:border-foreground/30"
              />
            </div>
            <select
              value={land}
              onChange={(e) => setLand(e.target.value)}
              aria-label="Bundesland"
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm min-h-11"
            >
              <option value="">Alle Bundesländer</option>
              {laender?.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <label className="inline-flex items-center gap-2 text-sm whitespace-nowrap px-3">
              <input type="checkbox" checked={meisterOnly} onChange={(e) => setMeisterOnly(e.target.checked)} className="h-4 w-4 accent-[var(--gold)]" />
              Nur Meisterbetriebe
            </label>
          </div>
        </div>

        {/* Ergebnisse */}
        {isLoading ? (
          <p className="text-center py-10 text-muted-foreground">Lädt…</p>
        ) : !data?.length ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">Keine Betriebe gefunden.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">{data.length} Betrieb{data.length === 1 ? "" : "e"} gefunden</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((b) => (
                <article key={b.id} className="card-jewel p-5 sm:p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg leading-snug text-balance">{b.name}</h3>
                    {b.meisterbetrieb && (
                      <span className="chip shrink-0" title="Meisterbetrieb">
                        <Award size={12} /> Meister
                      </span>
                    )}
                  </div>
                  {b.inhaber && <p className="text-sm text-muted-foreground mt-1">{b.inhaber}</p>}
                  <div className="mt-4 space-y-1.5 text-sm">
                    <p className="flex items-start gap-2">
                      <MapPin size={14} className="text-accent mt-0.5 shrink-0" />
                      <span>{b.strasse && <>{b.strasse}<br /></>}{b.plz} {b.ort}</span>
                    </p>
                    {b.telefon && (
                      <p className="flex items-center gap-2">
                        <Phone size={14} className="text-accent shrink-0" />
                        <a href={`tel:${b.telefon}`} className="hover:text-accent">{b.telefon}</a>
                      </p>
                    )}
                    {b.email && (
                      <p className="flex items-center gap-2 min-w-0">
                        <Mail size={14} className="text-accent shrink-0" />
                        <a href={`mailto:${b.email}`} className="hover:text-accent truncate">{b.email}</a>
                      </p>
                    )}
                    {b.website && (
                      <p className="flex items-center gap-2 min-w-0">
                        <Globe size={14} className="text-accent shrink-0" />
                        <a href={b.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent truncate">
                          {b.website.replace(/^https?:\/\//, "")}
                        </a>
                      </p>
                    )}
                  </div>
                  {b.innung && (
                    <p className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
                      Innung: {b.innung}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
