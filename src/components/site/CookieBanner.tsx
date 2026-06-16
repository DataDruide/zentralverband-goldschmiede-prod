import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "./Button";

const KEY = "zv-cookie-consent-v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const acceptBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  // Reserve page space so banner never covers H1, hero CTAs or footer links.
  useEffect(() => {
    if (!visible) return;
    const setPad = () => {
      const h = containerRef.current?.offsetHeight ?? 0;
      document.body.style.paddingBottom = `${h + 16}px`;
    };
    setPad();
    window.addEventListener("resize", setPad);
    return () => {
      window.removeEventListener("resize", setPad);
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  // Move focus to primary action when shown; trap Tab within the banner.
  useEffect(() => {
    if (!visible) return;
    const prev = document.activeElement as HTMLElement | null;
    acceptBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        decide("necessary");
        return;
      }
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusables = containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  const decide = (value: "all" | "necessary") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-5 z-50 mx-auto max-w-3xl rounded-xl sm:rounded-2xl border border-border bg-card/95 backdrop-blur shadow-[0_30px_80px_-40px_oklch(0.2_0.02_60/0.4)] p-3 sm:p-5"
    >
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1 min-w-0">
          <p id="cookie-title" className="font-display text-sm sm:text-lg">
            <span className="accent-dot" aria-hidden />Datenschutz & Cookies
          </p>
          <p id="cookie-desc" className="mt-1 text-[11px] leading-snug sm:text-sm sm:leading-relaxed text-muted-foreground">
            Technisch notwendige Cookies & – optional – Analyse. Details in der{" "}
            <Link to="/datenschutz" className="text-accent underline-offset-2 hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-row gap-2 sm:shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => decide("necessary")}
            className="flex-1 sm:flex-none whitespace-nowrap"
            aria-label="Nur technisch notwendige Cookies zulassen"
          >
            Nur notwendige
          </Button>
          <Button
            ref={acceptBtnRef}
            size="sm"
            onClick={() => decide("all")}
            className="flex-1 sm:flex-none whitespace-nowrap"
            aria-label="Allen Cookies inklusive Analyse zustimmen"
          >
            Allen zustimmen
          </Button>
        </div>
      </div>
    </div>
  );
}
