import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({ email: z.string().email().max(255) });

export type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };

export type PunzenLookupResult =
  | { ok: true; data: JsonValue }
  | { ok: false; status: number | null; error: string };



export const lookupPunzen = createServerFn({ method: "POST" })
  .inputValidator((input) => Input.parse(input))
  .handler(async ({ data }): Promise<PunzenLookupResult> => {
    const apiKey = process.env.PUNZEN_API_KEY;
    if (!apiKey) return { ok: false, status: null, error: "PUNZEN_API_KEY nicht konfiguriert" };
    try {
      const res = await fetch(
        "https://gnufywlflvxvfmczvylu.supabase.co/functions/v1/account-lookup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey },
          body: JSON.stringify({ email: data.email }),
        },
      );
      const text = await res.text();
      let payload: JsonValue = null;
      let parseFailed = false;
      try { payload = text ? (JSON.parse(text) as JsonValue) : null; } catch { parseFailed = true; }
      if (!res.ok) {
        const errMsg =
          (!parseFailed && payload && typeof payload === "object" && !Array.isArray(payload) && typeof payload.error === "string"
            ? payload.error
            : null) ?? (parseFailed ? text : null) ?? `HTTP ${res.status}`;
        return { ok: false, status: res.status, error: errMsg };
      }
      return { ok: true, data: payload };
    } catch (err) {
      return { ok: false, status: null, error: err instanceof Error ? err.message : "Netzwerkfehler" };
    }
  });


