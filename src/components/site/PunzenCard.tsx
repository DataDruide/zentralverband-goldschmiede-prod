import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { lookupPunzen } from "@/lib/punzen.functions";
import { Stamp, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from "lucide-react";

interface PunzenAccount {
  exists?: boolean;
  found?: boolean;
  account_id?: string;
  id?: string;
  name?: string;
  display_name?: string;
  punzen?: PunzeItem[];
  marks?: PunzeItem[];
  hallmarks?: PunzeItem[];
  count?: number;
}

interface PunzeItem {
  id?: string;
  code?: string;
  punze?: string;
  name?: string;
  registered_at?: string;
  created_at?: string;
  status?: string;
  image_url?: string;
  preview_url?: string;
}

export function PunzenCard({ email }: { email: string }) {
  const fn = useServerFn(lookupPunzen);
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["punzen", email],
    queryFn: () => fn({ data: { email } }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return (
    <div className="card-jewel p-6 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[var(--gold)]/10 blur-2xl pointer-events-none" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="chip"><Stamp size={12} /> Punzenverzeichnis</p>
          <h3 className="mt-3 font-display text-xl">Ihre registrierten Punzen</h3>
          <p className="text-xs text-muted-foreground mt-1">Live-Abgleich mit dem Punzenverzeichnis</p>
        </div>
        {isFetching && <Loader2 size={16} className="animate-spin text-accent shrink-0 mt-1" />}
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
          </div>
        ) : error || !data?.ok ? (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm">
            <AlertCircle size={16} className="text-destructive shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-medium">Abruf fehlgeschlagen</p>
              <p className="text-muted-foreground text-xs mt-0.5 break-words">
                {(error instanceof Error ? error.message : null) ?? (data && !data.ok ? data.error : "Unbekannter Fehler")}
              </p>
              <button onClick={() => refetch()} className="mt-2 text-xs text-accent hover:underline">
                Erneut versuchen
              </button>
            </div>
          </div>
        ) : (
          <PunzenContent account={data.data as unknown as PunzenAccount | null} />
        )}
      </div>

      <a
        href="https://punzenverzeichnis.de"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
      >
        Zum Punzenverzeichnis <ExternalLink size={12} />
      </a>
    </div>
  );
}

function PunzenContent({ account }: { account: PunzenAccount | null }) {
  if (!account || (account.exists === false && account.found === false)) {
    return (
      <div className="rounded-lg border border-dashed border-border p-4 text-sm">
        <p className="font-medium">Kein Punzen-Account gefunden</p>
        <p className="text-muted-foreground text-xs mt-1">
          Für diese E-Mail ist noch kein Account im Punzenverzeichnis hinterlegt.
        </p>
      </div>
    );
  }

  const punzen = account.punzen ?? account.marks ?? account.hallmarks ?? [];
  const name = account.display_name ?? account.name;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 size={16} className="text-emerald-500" />
        <span>Account verknüpft{name ? <> · <span className="font-medium">{name}</span></> : null}</span>
      </div>

      {punzen.length === 0 ? (
        <p className="text-sm text-muted-foreground">Noch keine Punzen registriert.</p>
      ) : (
        <>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {punzen.length} {punzen.length === 1 ? "Punze" : "Punzen"}
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {punzen.map((p, i) => (
              <li
                key={p.id ?? p.code ?? i}
                className="group relative aspect-square rounded-xl border border-border bg-gradient-to-br from-card to-secondary/40 p-3 flex flex-col items-center justify-center text-center hover:border-accent transition-colors"
              >
                {(p.image_url ?? p.preview_url) ? (
                  <img src={p.image_url ?? p.preview_url} alt={p.name ?? p.code ?? "Punze"} className="h-12 w-12 object-contain" loading="lazy" />
                ) : (
                  <Stamp size={28} className="text-[var(--gold)]" />
                )}
                <span className="mt-2 text-xs font-medium truncate w-full">{p.code ?? p.punze ?? p.name ?? "—"}</span>
                {p.status && (
                  <span className="absolute top-1.5 right-1.5 text-[9px] uppercase tracking-wider text-emerald-600">
                    {p.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
