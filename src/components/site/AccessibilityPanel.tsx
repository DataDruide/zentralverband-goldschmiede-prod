import { useEffect, useState } from "react";
import { Accessibility, Type, Contrast, X, RotateCcw } from "lucide-react";

const FS_KEY = "zv-a11y-font-scale";
const HC_KEY = "zv-a11y-high-contrast";

function applySettings(scale: number, hc: boolean) {
  const root = document.documentElement;
  root.style.setProperty("--user-font-scale", String(scale));
  root.classList.toggle("high-contrast", hc);
}

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [hc, setHc] = useState(false);

  useEffect(() => {
    try {
      const s = parseFloat(localStorage.getItem(FS_KEY) || "1");
      const h = localStorage.getItem(HC_KEY) === "1";
      setScale(s);
      setHc(h);
      applySettings(s, h);
    } catch {
      /* ignore */
    }
  }, []);

  const update = (newScale: number, newHc: boolean) => {
    setScale(newScale);
    setHc(newHc);
    applySettings(newScale, newHc);
    try {
      localStorage.setItem(FS_KEY, String(newScale));
      localStorage.setItem(HC_KEY, newHc ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Barrierefreiheit einstellen"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Accessibility size={22} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Barrierefreiheits-Einstellungen"
          className="fixed bottom-20 right-4 z-40 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-5 shadow-[0_30px_80px_-40px_oklch(0.2_0.02_60/0.4)]"
        >
          <div className="flex items-center justify-between">
            <p className="font-display text-lg">Barrierefreiheit</p>
            <button
              type="button"
              aria-label="Schließen"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2">
              <Type size={14} /> Schriftgröße
            </p>
            <div className="mt-2 flex gap-2">
              {[
                { v: 0.9, l: "A" },
                { v: 1, l: "A" },
                { v: 1.15, l: "A" },
                { v: 1.3, l: "A" },
              ].map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => update(opt.v, hc)}
                  className={`flex-1 rounded-lg border py-2 transition-colors ${
                    scale === opt.v
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/50"
                  }`}
                  style={{ fontSize: `${opt.v}rem` }}
                  aria-label={`Schriftgröße ${Math.round(opt.v * 100)}%`}
                  aria-pressed={scale === opt.v}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2">
              <Contrast size={14} /> Kontrast
            </p>
            <button
              type="button"
              onClick={() => update(scale, !hc)}
              className={`mt-2 w-full rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                hc ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/50"
              }`}
              aria-pressed={hc}
            >
              {hc ? "Hoher Kontrast: an" : "Hoher Kontrast: aus"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => update(1, false)}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-accent"
          >
            <RotateCcw size={12} /> Auf Standard zurücksetzen
          </button>
        </div>
      )}
    </>
  );
}
