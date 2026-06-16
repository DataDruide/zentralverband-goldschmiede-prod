import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "zv_visit_counted";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const alreadyCounted = sessionStorage.getItem(STORAGE_KEY);
        if (!alreadyCounted) {
          const { data, error } = await supabase.rpc("increment_visitor");
          if (!error && typeof data === "number") {
            sessionStorage.setItem(STORAGE_KEY, "1");
            if (!cancelled) setCount(data);
            return;
          }
        }
        const { data } = await supabase
          .from("site_stats")
          .select("visits")
          .eq("key", "home")
          .maybeSingle();
        if (!cancelled && data) setCount(Number(data.visits));
      } catch {
        /* silent */
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
      aria-label={`Bisher ${count.toLocaleString("de-DE")} Besucher`}
    >
      <Eye size={14} aria-hidden />
      <span className="tabular-nums">{count.toLocaleString("de-DE")}</span>
      <span>Besucher</span>
    </span>
  );
}
