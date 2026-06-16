import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/ai-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = request.headers.get("authorization");
        const token = auth?.replace(/^Bearer\s+/i, "");
        if (!token) return new Response("Unauthorized", { status: 401 });

        const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
        if (userErr || !userData.user) return new Response("Unauthorized", { status: 401 });

        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        if (!LOVABLE_API_KEY) {
          return new Response(JSON.stringify({ error: "AI nicht konfiguriert" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { messages } = (await request.json()) as {
          messages: Array<{ role: "user" | "assistant"; content: string }>;
        };

        const systemPrompt = `Du bist der digitale Assistent des Zentralverbandes der Deutschen Gold- & Silberschmiede e.V.
Du hilfst Mitgliedern bei Fragen rund um:
- Mitgliedschaft, Innungen, Verbandsthemen
- Ausbildung, Fortbildung, Meisterprüfung
- Wettbewerbe und Auszeichnungen
- Nachhaltigkeit und Green Economy im Goldschmiede-Handwerk
- Goldpreis und wirtschaftliche Themen
- Immaterielles Kulturerbe & 125 Jahre ZV
Antworte freundlich, präzise, auf Deutsch. Wenn du etwas nicht weißt, sage es ehrlich und verweise auf die Geschäftsstelle (info@zentralverband-goldschmiede.de, 0355 / 29065035).`;

        const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            stream: true,
            messages: [{ role: "system", content: systemPrompt }, ...messages],
          }),
        });

        if (!resp.ok) {
          if (resp.status === 429)
            return new Response(JSON.stringify({ error: "Zu viele Anfragen, bitte kurz warten." }), {
              status: 429,
              headers: { "Content-Type": "application/json" },
            });
          if (resp.status === 402)
            return new Response(JSON.stringify({ error: "AI-Guthaben aufgebraucht." }), {
              status: 402,
              headers: { "Content-Type": "application/json" },
            });
          const t = await resp.text();
          console.error("AI gateway error", resp.status, t);
          return new Response(JSON.stringify({ error: "AI-Fehler" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(resp.body, {
          headers: { "Content-Type": "text/event-stream" },
        });
      },
    },
  },
});
