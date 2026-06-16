import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/hero-goldsmith.jpg";
import {
  ArrowUpRight,
  Award,
  GraduationCap,
  Leaf,
  Sparkles,
  TrendingUp,
  Briefcase,
  Megaphone,
  PlayCircle,
  X,
} from "lucide-react";
import { GoldPriceLive } from "@/components/site/GoldPriceLive";
import { LinkButton } from "@/components/site/Button";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zentralverband der Deutschen Gold- & Silberschmiede e.V." },
      {
        name: "description",
        content:
          "Dachverband für das Goldschmiede- und Silberschmiedehandwerk in Deutschland – Tradition seit 1900, Verbraucherschutz, Ausbildung und Nachhaltigkeit.",
      },
    ],
  }),
  component: HomePage,
});

const newsItems = [
  {
    date: "19.05.2026",
    chip: "Stellenangebot",
    chipClass: "chip-emerald",
    title: "Praktikant/in für die Schmuckschmiede gesucht",
    excerpt:
      "Eine etablierte Schmuckschmiede sucht ab sofort engagierte Unterstützung im Praktikum – mit Einblick in alle Bereiche des Goldschmiedehandwerks.",
  },
  {
    date: "13.05.2026",
    chip: "Veranstaltung",
    chipClass: "chip-plum",
    title: "Vortrag der Innung München/Oberbayern am 13.06.2026",
    excerpt:
      "Am Samstag, den 13. Juni 2026 veranstaltet die Gold- und Silberschmiedeinnung München/Oberbayern einen kunsthistorischen Vortrag: »Viktorianisch und Art Deco«.",
  },
  {
    date: "12.05.2026",
    chip: "Verband",
    chipClass: "chip-ember",
    title: "Frühjahrstagung 09. Mai 2026 in Würzburg",
    excerpt:
      "Am 09. Mai 2026 trafen sich 39 Delegierte, Gäste und Ehrenmitglieder zur Frühjahrstagung des Zentralverbandes in der gastfreundlichen Stadt Würzburg.",
  },
];

const highlights = [
  {
    icon: Award,
    title: "Ja zum Meister",
    text: "Der Meistertitel steht für Qualität, Verbraucherschutz und nachhaltiges Handwerk.",
    accent: "text-accent",
    to: "/der-zv" as const,
  },
  {
    icon: Sparkles,
    title: "125 Jahre ZV",
    text: "Seit 1900 vertreten wir das Gold- und Silberschmiedehandwerk in Deutschland.",
    accent: "text-[var(--ember)]",
    to: "/125-jahre" as const,
  },
  {
    icon: GraduationCap,
    title: "Immaterielles Kulturerbe",
    text: "Unser Handwerk ist Teil des immateriellen Kulturerbes – über 5000 Jahre Tradition.",
    accent: "text-[var(--plum)]",
    to: "/immaterielles-kulturerbe" as const,
  },
  {
    icon: Leaf,
    title: "Green Economy",
    text: "Wir treten ein für Ressourceneffizienz, Fairtrade und Zukunftslösungen.",
    accent: "text-[var(--emerald)]",
    to: "/nachhaltigkeit" as const,
  },
];

function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-hero-grad">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--gold-soft), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--emerald-soft), transparent 70%)" }}
        />
        <div className="container-prose relative grid gap-10 py-12 sm:py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 flex flex-col justify-center order-1">
            <span className="chip self-start">
              <span className="accent-dot" style={{ background: "var(--gold)", margin: 0 }} />
              Seit 1900
            </span>
            <h1 className="mt-4 sm:mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground text-balance">
              Schmuck und Gerät{" "}
              <span className="italic" style={{ background: "linear-gradient(120deg, var(--gold), var(--ember))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                von Menschen für Menschen.
              </span>
            </h1>
            <p className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              Sich zu schmücken ist ein Grundbedürfnis des Menschen. Der Zentralverband vertritt
              die Interessen aller Goldschmiedinnen und Silberschmiedinnen in Deutschland – auf
              politischer, wirtschaftlicher und kultureller Ebene.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
              <LinkButton to="/der-zv" size="lg" fullWidth>
                Über den Verband
                <ArrowUpRight size={18} aria-hidden />
              </LinkButton>
              <LinkButton to="/mitgliedersuche" variant="outline" size="lg" fullWidth>
                Mitgliedsbetrieb finden
              </LinkButton>
            </div>
          </div>


          <div className="lg:col-span-5 order-2">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-[0_30px_80px_-40px_oklch(0.4_0.05_60/0.5)]">
              <img
                src={heroImage}
                alt="Goldschmiedearbeit auf der Werkbank"
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
              <button
                type="button"
                aria-label="Imagefilm 2024 abspielen"
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 grid place-items-center group focus-visible:outline-none cursor-pointer"
              >
                <span className="grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full bg-cream/90 text-ink shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle size={32} strokeWidth={1.5} />
                </span>
              </button>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-cream">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] opacity-80">Imagefilm 2024</p>
                <p className="font-display text-xl sm:text-2xl mt-1 text-balance">Unser Handwerk in Bewegung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT BAR */}
      <section className="bg-ink-band">
        <div className="container-prose flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-4 sm:py-5">
          <p className="flex items-center gap-3 text-sm text-cream/90">
            <Megaphone size={18} className="shrink-0 text-[var(--gold-soft)]" />
            <span>
              <strong className="text-cream">Ausbilderförderungsprogramm verlängert</strong> – jetzt informieren und Förderung sichern.
            </span>
          </p>
          <Link
            to="/aktuell"
            className="inline-flex items-center gap-1 text-sm text-[var(--gold-soft)] hover:text-cream self-start sm:self-auto"
          >
            Mehr erfahren <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container-prose py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-12 section-rule pt-6">
          <p className="chip chip-ember">Werte & Auftrag</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-balance">Wofür wir stehen</h2>
        </div>
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text, accent, to }) => (
            <Link
              key={title}
              to={to}
              className="card-jewel p-6 sm:p-7 group block focus-visible:outline-none"
            >
              <Icon className={accent} size={30} strokeWidth={1.5} />
              <h3 className="mt-4 sm:mt-5 font-display text-lg sm:text-xl text-balance group-hover:text-accent transition-colors">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">{text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Mehr erfahren <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>

      </section>

      {/* INTRO TEXT auf Smaragd-Band */}
      <section className="bg-emerald-band border-y border-border">
        <div className="container-prose grid gap-8 lg:gap-10 py-14 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="chip chip-emerald">Der Zentralverband</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-balance">
              Ein Dachverband mit Haltung.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-foreground/85 leading-relaxed text-pretty">
            <p>
              Seit 1900 kann der Zentralverband seine Aufgaben in unterschiedlichen
              Gesellschaftsordnungen auf politischer, wirtschaftlicher und kultureller Ebene
              verwirklichen. Die über 5000-jährige Tradition des Berufes ist Verpflichtung für
              die Zukunft.
            </p>
            <p>
              Die Ausbildung und Weiterbildung ist ein besonderes Anliegen des Zentralverbandes.
              Der Meistertitel ist Ausdruck von Qualität und Kompetenz – er steht für
              Verbraucherschutz und Nachhaltigkeit. Auch tritt der Zentralverband für Green
              Economy und Zukunftslösungen mit Ressourceneffizienz ein.
            </p>
            <Link
              to="/der-zv"
              className="inline-flex items-center gap-1 text-[var(--emerald)] hover:gap-2 transition-all font-medium"
            >
              Mehr über den ZV erfahren <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* GOLDPREIS + STELLEN Quick-Access */}
      <section className="container-prose py-14 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="card-jewel p-6 sm:p-8 bg-ember-soft border-[color:color-mix(in_oklch,var(--ember)_30%,transparent)]">
            <div className="flex items-center justify-between">
              <span className="chip chip-ember">Goldpreis</span>
              <TrendingUp className="text-[var(--ember)]" size={22} />
            </div>
            <GoldPriceLive />
            <p className="mt-3 text-sm text-muted-foreground text-pretty">
              Aktueller Spot-Kurs – verlässliche Basis für Kalkulation und Beratung.
            </p>
            <Link to="/aktuell" className="mt-5 inline-flex items-center gap-1 text-sm text-[var(--ember)] font-medium hover:gap-2 transition-all">
              Zum Verlauf <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="card-jewel p-6 sm:p-8 bg-plum-soft border-[color:color-mix(in_oklch,var(--plum)_25%,transparent)]">
            <div className="flex items-center justify-between">
              <span className="chip chip-plum">Stellenmarkt</span>
              <Briefcase className="text-[var(--plum)]" size={22} />
            </div>
            <p className="mt-5 font-display text-2xl sm:text-3xl text-balance">Aktuelle Stellen & Praktika</p>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Offene Positionen in Werkstätten, Ateliers und Schmuckschmieden im gesamten
              deutschsprachigen Raum.
            </p>
            <Link to="/aktuell" className="mt-5 inline-flex items-center gap-1 text-sm text-[var(--plum)] font-medium hover:gap-2 transition-all">
              Stellen ansehen <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-ice border-y border-border">
        <div className="container-prose py-14 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="chip">Aktuell</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl text-balance">Neuigkeiten & Termine</h2>
            </div>
            <Link to="/aktuell" className="text-sm text-accent hover:underline self-start sm:self-auto font-medium">
              Alle Meldungen →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item) => (
              <article key={item.title} className="card-jewel p-6 sm:p-7 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className={`chip ${item.chipClass}`}>{item.chip}</span>
                  <time className="text-xs text-muted-foreground">{item.date}</time>
                </div>
                <h3 className="mt-4 font-display text-lg sm:text-xl leading-snug text-balance">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1 text-pretty">
                  {item.excerpt}
                </p>
                <Link to="/aktuell" className="mt-5 text-sm text-accent hover:underline self-start font-medium">
                  weiterlesen →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose py-14 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink-band p-8 sm:p-12 md:p-16 text-center">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--ember), transparent 70%)" }}
          />
          <div className="relative">
            <span className="chip" style={{ background: "color-mix(in oklch, var(--gold) 22%, transparent)", color: "var(--gold-soft)", borderColor: "color-mix(in oklch, var(--gold) 40%, transparent)" }}>
              Mitglied werden
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-cream text-balance">
              Werden Sie Teil unserer Gemeinschaft.
            </h2>
            <p className="mt-4 sm:mt-5 mx-auto max-w-2xl text-base sm:text-lg text-cream/75 text-pretty">
              Um eine Meinungsvielfalt zu erfahren und vertreten zu können, braucht der
              Zentralverband die Mitarbeit aller Goldschmiedinnen.
            </p>
            <LinkButton to="/kontakt" variant="accent" size="lg" className="mt-7 sm:mt-8">
              Kontakt aufnehmen <ArrowUpRight size={18} aria-hidden />
            </LinkButton>
          </div>
        </div>
      </section>

      {/* IMAGEFILM MODAL */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Imagefilm 2024"
          className="fixed inset-0 z-50 grid place-items-center bg-ink/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-ink rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Schließen"
              className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-ink hover:bg-cream transition-colors"
            >
              <X size={20} />
            </button>
            <iframe
              src="https://www.youtube-nocookie.com/embed/9p-9qB6nSMI?autoplay=1&rel=0&modestbranding=1"
              title="Imagefilm 2024 — Zentralverband der Deutschen Gold- & Silberschmiede"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      )}
    </>
  );
}

