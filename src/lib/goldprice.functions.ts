import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type GoldPriceResult =
  | { ok: true; eur_per_oz: number; eur_per_g: number; change_pct: number | null; updated: string }
  | { ok: false; error: string };

export type GoldHistoryPoint = { day: string; eur_per_g: number };

// Public, no-key endpoints:
//  - https://api.gold-api.com/price/XAU       → { price: USD/oz, updatedAt }
//  - https://api.frankfurter.dev/v1/latest?from=USD&to=EUR
export const getGoldPrice = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoldPriceResult> => {
    try {
      const [goldRes, fxRes] = await Promise.all([
        fetch("https://api.gold-api.com/price/XAU", { headers: { Accept: "application/json" } }),
        fetch("https://api.frankfurter.dev/v1/latest?from=USD&to=EUR", { headers: { Accept: "application/json" } }),
      ]);
      if (!goldRes.ok) return { ok: false, error: `Gold HTTP ${goldRes.status}` };
      if (!fxRes.ok) return { ok: false, error: `FX HTTP ${fxRes.status}` };

      const gold = (await goldRes.json()) as { price?: number; updatedAt?: string };
      const fx = (await fxRes.json()) as { rates?: { EUR?: number } };

      const usdPerOz = Number(gold.price);
      const usdToEur = Number(fx.rates?.EUR);
      if (!usdPerOz || !usdToEur) return { ok: false, error: "Unvollständige Daten" };

      const eur_per_oz = usdPerOz * usdToEur;
      const eur_per_g = eur_per_oz / 31.1034768;

      // Snapshot once per day — silent best-effort
      try {
        const today = new Date().toISOString().slice(0, 10);
        await supabaseAdmin
          .from("gold_prices")
          .upsert(
            {
              day: today,
              eur_per_oz: Number(eur_per_oz.toFixed(4)),
              eur_per_g: Number(eur_per_g.toFixed(4)),
            },
            { onConflict: "day" },
          );
      } catch {
        /* ignore snapshot errors */
      }

      return {
        ok: true,
        eur_per_oz,
        eur_per_g,
        change_pct: null,
        updated: gold.updatedAt ?? new Date().toISOString(),
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Netzwerkfehler" };
    }
  },
);

export const getGoldHistory = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoldHistoryPoint[]> => {
    try {
      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const { data, error } = await supabaseAdmin
        .from("gold_prices")
        .select("day, eur_per_g")
        .gte("day", since)
        .order("day", { ascending: true });
      if (error || !data) return [];
      return data.map((r) => ({ day: r.day, eur_per_g: Number(r.eur_per_g) }));
    } catch {
      return [];
    }
  },
);
