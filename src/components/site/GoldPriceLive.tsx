import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { getGoldPrice, getGoldHistory } from "@/lib/goldprice.functions";

export function GoldPriceLive() {
  const priceFn = useServerFn(getGoldPrice);
  const histFn = useServerFn(getGoldHistory);

  const { data, isLoading } = useQuery({
    queryKey: ["goldprice"],
    queryFn: () => priceFn(),
    staleTime: 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  const { data: history } = useQuery({
    queryKey: ["goldprice-history"],
    queryFn: () => histFn(),
    staleTime: 5 * 60 * 1000,
  });

  const fmt = (n: number) =>
    new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n);

  if (isLoading) {
    return (
      <div className="mt-5 flex items-center gap-2 text-muted-foreground">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">Live-Kurs lädt…</span>
      </div>
    );
  }

  if (!data?.ok) {
    return (
      <div className="mt-5">
        <p className="font-display text-2xl sm:text-3xl text-muted-foreground">Kurs derzeit nicht verfügbar</p>
        <p className="mt-1 text-xs text-muted-foreground">Bitte später erneut versuchen.</p>
      </div>
    );
  }

  const change = data.change_pct;
  const up = (change ?? 0) >= 0;
  const showChart = (history?.length ?? 0) >= 2;
  const first = history?.[0]?.eur_per_g;
  const last = history?.[history.length - 1]?.eur_per_g;
  const trend7 = showChart && first && last ? ((last - first) / first) * 100 : null;
  const trendUp = (trend7 ?? 0) >= 0;

  return (
    <>
      <p className="mt-5 font-display text-3xl sm:text-4xl tabular-nums">
        {fmt(data.eur_per_oz)} €
        <span className="text-base text-muted-foreground"> / oz</span>
      </p>
      <div className="mt-1 flex items-center gap-3 text-sm">
        <span className="text-muted-foreground tabular-nums">{fmt(data.eur_per_g)} € / g</span>
        {change !== null && (
          <span className={`inline-flex items-center gap-1 font-medium tabular-nums ${up ? "text-emerald-600" : "text-destructive"}`}>
            {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {up ? "+" : ""}{fmt(change)} %
          </span>
        )}
      </div>

      {showChart && (
        <div className="mt-3" aria-label="Goldpreis 7-Tage-Verlauf in Euro pro Gramm">
          <div className="h-14 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <Line
                  type="monotone"
                  dataKey="eur_per_g"
                  stroke="var(--ember)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Tooltip
                  cursor={{ stroke: "var(--ember)", strokeOpacity: 0.3 }}
                  contentStyle={{
                    fontSize: 11,
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "4px 8px",
                  }}
                  labelFormatter={(l) => new Date(l as string).toLocaleDateString("de-DE")}
                  formatter={(v: number) => [`${fmt(v)} € / g`, ""]}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {trend7 !== null && (
            <p className="mt-1 text-[11px] text-muted-foreground tabular-nums">
              7-Tage:{" "}
              <span className={trendUp ? "text-emerald-600 font-medium" : "text-destructive font-medium"}>
                {trendUp ? "+" : ""}{fmt(trend7)} %
              </span>
            </p>
          )}
        </div>
      )}

      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mt-1">
        Stand: {new Date(data.updated).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
      </p>
    </>
  );
}
