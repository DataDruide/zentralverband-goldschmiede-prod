import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/site/Button";
import { useEffect, useId, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Mitglieder-Login" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const emailId = useId();
  const pwId = useId();
  const nameId = useId();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate({ to: "/mitgliederbereich" });
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Willkommen zurück!");
        navigate({ to: "/mitgliederbereich" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/mitgliederbereich`,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Konto erstellt – Sie sind angemeldet.");
        navigate({ to: "/mitgliederbereich" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Anmeldung fehlgeschlagen";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/mitgliederbereich`,
      });
      if (result.error) {
        toast.error(result.error.message || "Google-Anmeldung fehlgeschlagen");
        setBusy(false);
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/mitgliederbereich" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Fehler bei Google-Anmeldung");
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Mitgliederbereich"
        title={mode === "login" ? "Anmelden" : "Konto anlegen"}
        intro="Geschützter Bereich für Mitglieder des Zentralverbandes."
      />
      <section className="container-prose py-12 sm:py-16">
        <div className="mx-auto max-w-md">
          <div className="card-jewel p-6 sm:p-8">
            <div role="tablist" aria-label="Anmeldemodus" className="flex gap-1 text-sm mb-6 p-1 rounded-full bg-secondary/60">
              <button
                role="tab"
                aria-selected={mode === "login"}
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-2 min-h-10 transition-colors ${
                  mode === "login" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-accent"
                }`}
              >
                Login
              </button>
              <button
                role="tab"
                aria-selected={mode === "register"}
                onClick={() => setMode("register")}
                className={`flex-1 rounded-full px-4 py-2 min-h-10 transition-colors ${
                  mode === "register" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-accent"
                }`}
              >
                Registrieren
              </button>
            </div>

            <button
              type="button"
              onClick={onGoogle}
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 min-h-11 text-sm font-medium hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3.01-2.32z" fill="#FBBC05"/>
                <path d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.96l3.01 2.32C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Mit Google {mode === "login" ? "anmelden" : "registrieren"}
            </button>

            <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px flex-1 bg-border" />oder<span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label htmlFor={nameId} className="block text-sm font-medium text-foreground/85">Anzeigename</label>
                  <input
                    id={nameId}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm min-h-11 hover:border-foreground/30"
                  />
                </div>
              )}
              <div>
                <label htmlFor={emailId} className="block text-sm font-medium text-foreground/85">E-Mail</label>
                <input
                  id={emailId}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm min-h-11 hover:border-foreground/30"
                />
              </div>
              <div>
                <label htmlFor={pwId} className="block text-sm font-medium text-foreground/85">Passwort</label>
                <input
                  id={pwId}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                  minLength={8}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm min-h-11 hover:border-foreground/30"
                />
              </div>
              <Button type="submit" size="lg" fullWidth disabled={busy}>
                {busy ? "Bitte warten…" : mode === "login" ? "Anmelden" : "Konto anlegen"}
              </Button>
            </form>
          </div>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            Mit der Anmeldung stimmen Sie unserer{" "}
            <Link to="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</Link> zu.
          </p>
        </div>
      </section>
    </>
  );
}
