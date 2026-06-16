import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, Sparkles, Loader2, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Wie werde ich Mitglied im Zentralverband?",
  "Welche Fortbildungen gibt es 2026?",
  "Was bedeutet das Immaterielle Kulturerbe für unser Handwerk?",
];

export function AssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setStreaming(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      const resp = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Zu viele Anfragen – bitte kurz warten.");
        else if (resp.status === 402) toast.error("AI-Guthaben aufgebraucht.");
        else toast.error("Verbindung zum Assistenten fehlgeschlagen.");
        setStreaming(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const append = (chunk: string) => {
        acc += chunk;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      };

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) append(c);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Es ist ein Fehler aufgetreten.");
    } finally {
      setStreaming(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="card-jewel overflow-hidden flex flex-col h-[560px]">
      <div className="px-5 sm:px-6 py-4 border-b border-border flex items-center gap-2.5 bg-gradient-to-r from-[color:color-mix(in_oklch,var(--accent)_8%,transparent)] to-transparent">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
          <Sparkles size={16} />
        </span>
        <div>
          <h3 className="font-display text-lg leading-tight">ZV Assistent</h3>
          <p className="text-xs text-muted-foreground">KI-gestützte Hilfe für Mitglieder</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Stellen Sie Ihre Frage – ich helfe Ihnen bei Themen rund um den Zentralverband, Ausbildung,
              Wettbewerbe und Nachhaltigkeit.
            </p>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs sm:text-[13px] rounded-full border border-border bg-card px-3 py-1.5 hover:border-accent hover:text-accent transition-colors text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                m.role === "user" ? "bg-secondary text-foreground" : "bg-accent/15 text-accent"
              }`}
            >
              {m.role === "user" ? <UserIcon size={14} /> : <Sparkles size={14} />}
            </span>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-secondary/70 text-foreground rounded-tl-sm"
              }`}
            >
              {m.content || (streaming && i === messages.length - 1 ? <span className="opacity-60">…</span> : null)}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="border-t border-border p-3 sm:p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Frage stellen…"
          disabled={streaming}
          className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors disabled:opacity-50"
          aria-label="Senden"
        >
          {streaming ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </form>
    </div>
  );
}
