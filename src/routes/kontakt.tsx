import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/site/Button";
import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Zentralverband der Deutschen Gold- & Silberschmiede e.V." },
      { name: "description", content: "Kontakt zur Geschäftsstelle des Zentralverbandes in Cottbus." },
    ],
  }),
  component: KontaktPage,
});

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const consent = fd.get("consent");
    if (!name) e.name = "Bitte geben Sie Ihren Namen an.";
    if (!email) e.email = "Bitte geben Sie eine E-Mail-Adresse an.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Diese E-Mail-Adresse scheint nicht gültig zu sein.";
    if (!message) e.message = "Bitte hinterlassen Sie uns eine kurze Nachricht.";
    else if (message.length < 10) e.message = "Bitte schreiben Sie mindestens ein paar Worte (min. 10 Zeichen).";
    if (!consent) e.consent = "Bitte bestätigen Sie die Datenschutzerklärung.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = ev.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Schreiben Sie uns"
        intro="Wir freuen uns über Ihre Anfrage – telefonisch, per E-Mail oder über das Formular."
      />
      <section className="container-prose py-12 sm:py-16 grid gap-10 lg:gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl text-balance">
              Zentralverband der Deutschen Gold- & Silberschmiede e.V.
            </h2>
            <ul className="mt-5 space-y-3 text-foreground/85">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>Altmarkt 17, 03046 Cottbus</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a href="tel:+4935529065035" className="hover:text-accent transition-colors">0355 / 29065035</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a href="mailto:info@zentralverband-goldschmiede.de" className="hover:text-accent transition-colors break-all">
                  info@zentralverband-goldschmiede.de
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-sm border border-border bg-card p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-accent" aria-hidden />
              <h3 className="font-display text-lg">Öffnungszeiten</h3>
            </div>
            <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm text-foreground/80">
              <dt>Mo – Do</dt><dd>07:30 – 16:00 Uhr</dd>
              <dt>Fr</dt><dd>07:30 – 12:00 Uhr</dd>
            </dl>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          aria-label="Kontaktformular"
          className="rounded-sm border border-border bg-card p-5 sm:p-8 space-y-4"
        >
          {sent ? (
            <div className="text-center py-8" role="status" aria-live="polite">
              <CheckCircle2 className="mx-auto text-accent" size={40} strokeWidth={1.5} aria-hidden />
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-accent">Vielen Dank</p>
              <h3 className="mt-2 font-display text-2xl text-balance">Ihre Nachricht wurde gesendet.</h3>
              <p className="mt-2 text-sm text-muted-foreground">Wir melden uns zeitnah bei Ihnen.</p>
            </div>
          ) : (
            <>
              <Field label="Ihr Name" name="name" required error={errors.name} autoComplete="name" />
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                <Field label="Straße" name="street" autoComplete="address-line1" />
                <Field label="PLZ" name="zip" autoComplete="postal-code" inputMode="numeric" className="sm:w-28" />
              </div>
              <Field label="Ort" name="city" autoComplete="address-level2" />
              <Field label="E-Mail" name="email" type="email" required error={errors.email} autoComplete="email" inputMode="email" />
              <TextArea label="Ihre Mitteilung" name="message" required error={errors.message} rows={5} />

              <Consent error={errors.consent} />

              <div className="flex flex-col sm:flex-row-reverse sm:items-center sm:justify-between gap-3 pt-2">
                <Button type="submit" size="lg" fullWidth disabled={submitting} className="sm:w-auto">
                  {submitting ? "Wird gesendet …" : "Absenden"}
                </Button>
                <p className="text-xs text-muted-foreground text-center sm:text-left">* Pflichtfelder</p>
              </div>
            </>
          )}
        </form>
      </section>
    </>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "email" | "tel" | "search" | "url";
  className?: string;
}

function Field({ label, name, type = "text", required, error, autoComplete, inputMode, className = "" }: FieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground/85">
        {label}{required && <span className="text-accent" aria-hidden> *</span>}
        {required && <span className="sr-only"> (Pflichtfeld)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`mt-1.5 w-full rounded-sm border bg-background px-3 py-2.5 text-sm min-h-11 transition-colors ${
          error ? "border-destructive" : "border-input hover:border-foreground/30"
        }`}
      />
      {error && (
        <p id={errId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-destructive">
          <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function TextArea({ label, name, required, error, rows = 5 }: { label: string; name: string; required?: boolean; error?: string; rows?: number }) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground/85">
        {label}{required && <span className="text-accent" aria-hidden> *</span>}
        {required && <span className="sr-only"> (Pflichtfeld)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`mt-1.5 w-full rounded-sm border bg-background px-3 py-2.5 text-sm resize-y transition-colors ${
          error ? "border-destructive" : "border-input hover:border-foreground/30"
        }`}
      />
      {error && (
        <p id={errId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-destructive">
          <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function Consent({ error }: { error?: string }) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground cursor-pointer">
        <input
          id={id}
          type="checkbox"
          name="consent"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--gold)]"
        />
        <span>
          Ich habe die <a href="/datenschutz" className="text-accent underline-offset-2 hover:underline">Datenschutzerklärung</a> gelesen und akzeptiert.<span className="text-accent" aria-hidden> *</span>
        </span>
      </label>
      {error && (
        <p id={errId} role="alert" className="mt-1.5 ml-6 flex items-start gap-1.5 text-xs text-destructive">
          <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
