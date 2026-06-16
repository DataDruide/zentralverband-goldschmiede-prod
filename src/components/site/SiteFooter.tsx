import { Link } from "@tanstack/react-router";
import { VisitorCounter } from "./VisitorCounter";

const verband = [
  { to: "/der-zv", label: "Der Verband" },
  { to: "/125-jahre", label: "125 Jahre ZV" },
  { to: "/immaterielles-kulturerbe", label: "Immaterielles Kulturerbe" },
  { to: "/nachhaltigkeit", label: "Nachhaltigkeit" },
] as const;

const themen = [
  { to: "/aktuell", label: "Aktuelles" },
  { to: "/mitgliedersuche", label: "Mitgliedersuche" },
  { to: "/innungen", label: "Innungen" },
  { to: "/fortbildungen", label: "Fortbildungen" },
  { to: "/wettbewerbe", label: "Wettbewerbe" },
  { to: "/aus-weiterbildung", label: "Aus- & Weiterbildung" },
  { to: "/gold-silberschmiede", label: "Gold- & Silberschmiede" },
] as const;

const recht = [
  { to: "/kontakt", label: "Kontakt" },
  { to: "/login", label: "Mitgliederbereich" },
  { to: "/impressum", label: "Impressum" },
  { to: "/datenschutz", label: "Datenschutz" },
  { to: "/barrierefreiheit", label: "Barrierefreiheit" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-border bg-secondary/60">
      <div className="container-prose grid gap-8 sm:gap-10 py-10 sm:py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <p className="font-display text-xl sm:text-2xl text-foreground text-balance">
            Zentralverband der Deutschen Gold- & Silberschmiede e.V.
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed text-pretty">
            Seit 1900 vertreten wir die Interessen der Goldschmiede und Silberschmiede in
            Deutschland – auf politischer, wirtschaftlicher und kultureller Ebene.
          </p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-foreground/80">
            Altmarkt 17, 03046 Cottbus<br />
            <a href="tel:+4935529065035" className="hover:text-accent transition-colors">
              0355 / 29065035
            </a>{" · "}
            <a href="mailto:info@zentralverband-goldschmiede.de" className="hover:text-accent transition-colors break-all">
              info@zentralverband-goldschmiede.de
            </a>
          </address>
        </div>

        <FooterCol title="Verband" items={verband} />
        <FooterCol title="Themen" items={themen} />
        <FooterCol title="Service" items={recht} />
      </div>
      <div className="border-t border-border/70">
        <div className="container-prose flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-5 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Zentralverband der Deutschen Gold- & Silberschmiede e.V.</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <VisitorCounter />
            <span className="italic hidden sm:inline">Schmuck und Gerät von Menschen für Menschen.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ to: string; label: string }>;
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.to}>
            <Link to={it.to} className="hover:text-accent transition-colors">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
