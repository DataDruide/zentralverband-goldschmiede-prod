import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Zentralverband der Deutschen Gold- & Silberschmiede e.V." },
      { name: "description", content: "Datenschutzerklärung nach DS-GVO: Erfassung, Verarbeitung und Rechte gemäß Art. 13/14 DS-GVO." },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: DatenschutzPage,
});

const sections: Array<{ id: string; title: string }> = [
  { id: "verantwortlich", title: "Verantwortliche Stelle" },
  { id: "begriffe", title: "Begriffsbestimmungen" },
  { id: "allgemein", title: "Erfassung allgemeiner Informationen" },
  { id: "cookies", title: "Cookies" },
  { id: "serverdaten", title: "Serverdaten" },
  { id: "ssl", title: "SSL-Verschlüsselung" },
  { id: "rechtsgrundlage", title: "Rechtsgrundlage der Verarbeitung" },
  { id: "loeschung", title: "Löschung bzw. Sperrung der Daten" },
  { id: "weitergabe", title: "Weitergabe von Daten" },
  { id: "kontakt", title: "Kontaktmöglichkeit" },
  { id: "analytics", title: "Google Analytics (anonymisiert)" },
  { id: "maps", title: "Google Maps" },
  { id: "youtube", title: "Eingebettete YouTube-Videos" },
  { id: "rechte", title: "Rechte der betroffenen Person" },
  { id: "automatisiert", title: "Automatisierte Entscheidungsfindung" },
];

function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" />

      <section className="container-prose py-10 sm:py-14 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
        {/* TOC */}
        <nav aria-label="Inhaltsverzeichnis" className="lg:sticky lg:top-24 self-start">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Inhalt</p>
          <ul className="space-y-1.5 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-foreground/75 hover:text-accent hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="space-y-10 text-foreground/85 leading-relaxed text-pretty max-w-3xl">
          <section id="verantwortlich">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Verantwortliche Stelle</h2>
            <p className="mt-3">
              <strong>Verantwortliche Stelle im Sinne der Datenschutzgesetze ist:</strong>
            </p>
            <address className="not-italic mt-2">
              Zentralverband der Deutschen Goldschmiede und Silberschmiede e.V.<br />
              Altmarkt 17, 03046 Cottbus
            </address>
            <p className="mt-3">
              gesetzlich vertreten durch den Präsidenten als Verantwortlicher im Sinne des geltenden
              Datenschutzrechts.
            </p>
            <p className="mt-3">
              Mittels dieser Datenschutzerklärung möchten wir die Öffentlichkeit über Art, Umfang
              und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten
              informieren. Ferner werden betroffene Personen über die ihnen zustehenden Rechte
              aufgeklärt. Sie können diese Datenschutzinformation jederzeit unter der Rubrik
              „Datenschutz" auf der Website aufrufen.
            </p>
          </section>

          <section id="begriffe">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Begriffsbestimmungen</h2>
            <p className="mt-3">
              Die Datenschutzerklärung beruht auf den Begrifflichkeiten, die durch den Europäischen
              Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO)
              verwendet wurden. Wir verwenden u.a. folgende Begriffe: personenbezogene Daten,
              betroffene Person, Verarbeitung, Einschränkung der Verarbeitung, Profiling,
              Pseudonymisierung, Verantwortlicher, Auftragsverarbeiter, Empfänger, Dritter und
              Einwilligung – jeweils im Sinne der Definitionen aus Art. 4 DS-GVO.
            </p>
          </section>

          <section id="allgemein">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Erfassung allgemeiner Informationen</h2>
            <p className="mt-3">
              Eine Nutzung unserer Internetseiten ist grundsätzlich ohne Angabe personenbezogener
              Daten möglich. Beim Zugriff werden automatisch Informationen allgemeiner Natur erfasst
              (Server-Logfiles), z.B. Browsertyp, Betriebssystem, Domainname des Internet Service
              Providers. Diese Informationen lassen keine Rückschlüsse auf Ihre Person zu und werden
              statistisch ausgewertet, um Internetauftritt und Technik zu optimieren.
            </p>
            <p className="mt-3">
              Die Verarbeitung personenbezogener Daten erfolgt stets im Einklang mit der DS-GVO und
              den landesspezifischen Datenschutzbestimmungen. Aufbewahrungsfristen ergeben sich aus
              gesetzlichen Vorgaben (i.d.R. 10 Jahre steuerrechtlich, 6 Jahre handelsrechtlich).
            </p>
          </section>

          <section id="cookies">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Cookies</h2>
            <p className="mt-3">
              Wir verwenden Cookies zum Wiedererkennen mehrfacher Nutzung unseres Angebots. Es
              handelt sich überwiegend um Session-Cookies, die nach Ende Ihres Besuchs gelöscht
              werden. Sie können die Installation durch Browser-Einstellungen verhindern oder
              bereits gesetzte Cookies löschen. Bei deaktivierten Cookies sind ggf. nicht alle
              Funktionen unserer Website nutzbar.
            </p>
          </section>

          <section id="serverdaten">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Serverdaten</h2>
            <p className="mt-3">Aus technischen Gründen werden u.a. folgende Daten erfasst:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browsertyp und -version</li>
              <li>verwendetes Betriebssystem</li>
              <li>Webseite, von der aus Sie uns besuchen (Referrer URL)</li>
              <li>Webseite, die Sie besuchen</li>
              <li>Datum und Uhrzeit Ihres Zugriffs</li>
              <li>Ihre Internet Protokoll (IP)-Adresse</li>
            </ul>
            <p className="mt-3">
              Diese anonymen Daten werden getrennt von eventuell angegebenen personenbezogenen Daten
              gespeichert und lassen keine Rückschlüsse auf eine bestimmte Person zu.
            </p>
          </section>

          <section id="ssl">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">SSL-Verschlüsselung</h2>
            <p className="mt-3">
              Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem
              aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren (TLS 1.3 mit
              AES-256) über HTTPS. Daten in der Datenbank werden zusätzlich verschlüsselt at-rest
              (AES-256) gespeichert.
            </p>
          </section>

          <section id="rechtsgrundlage">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Rechtsgrundlage der Verarbeitung</h2>
            <p className="mt-3">
              Art. 6 I lit. a DS-GVO dient als Rechtsgrundlage für Verarbeitungsvorgänge mit
              Einwilligung. Art. 6 I lit. b für Vertragsanbahnung und -erfüllung, Art. 6 I lit. c
              für rechtliche Verpflichtungen (z.B. steuerliche Pflichten), Art. 6 I lit. f für die
              Wahrung berechtigter Interessen – insbesondere zur Durchführung unserer Geschäfts­tätigkeit
              zugunsten unserer Mitglieder und Mitarbeiter.
            </p>
          </section>

          <section id="loeschung">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Löschung bzw. Sperrung der Daten</h2>
            <p className="mt-3">
              Wir halten uns an die Grundsätze der Datenvermeidung und Datensparsamkeit und
              speichern personenbezogene Daten nur so lange, wie es zur Erreichung der genannten
              Zwecke erforderlich ist oder gesetzliche Speicherfristen es vorsehen. Nach Fortfall
              des Zwecks bzw. Ablauf der Frist werden Daten routinemäßig gesperrt oder gelöscht.
            </p>
          </section>

          <section id="weitergabe">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Weitergabe von Daten</h2>
            <p className="mt-3">
              Im Rahmen der genannten Zwecke geben wir Daten ggf. an Partner und Kammern weiter.
              Weitergabe an Dritte erfolgt nur bei gesetzlicher Pflicht oder zur Strafverfolgung.
              Für bestimmte Datenverarbeitungstätigkeiten setzen wir weisungsgebundene
              Auftragsverarbeiter ein. Eine Übermittlung an Drittstaaten ist nicht geplant.
            </p>
          </section>

          <section id="kontakt">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Kontaktmöglichkeit</h2>
            <p className="mt-3">
              Wir bieten auf unserer Seite die Möglichkeit, per E-Mail und/oder über ein
              Kontaktformular Kontakt aufzunehmen. Die Angaben werden ausschließlich zum Zweck der
              Bearbeitung Ihrer Anfrage gespeichert. Eine Weitergabe an Dritte erfolgt nicht.
            </p>
          </section>

          <section id="analytics">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Google Analytics (mit Anonymisierung)</h2>
            <p className="mt-3">
              Sofern aktiviert, setzen wir Google Analytics der Google Inc. (1600 Amphitheatre
              Parkway, Mountain View, CA 94043, USA) mit IP-Anonymisierung ein. Ihre IP-Adresse wird
              innerhalb der EU/EWR-Staaten gekürzt. Sie können die Erfassung durch Browser-Add-On
              widersprechen:{" "}
              <a href="http://tools.google.com/dlpage/gaoptout?hl=de" className="text-accent hover:underline">
                tools.google.com/dlpage/gaoptout
              </a>
              . Datenschutzbestimmungen Google:{" "}
              <a href="https://policies.google.com/privacy" className="text-accent hover:underline">
                policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section id="maps">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Verwendung von Google Maps</h2>
            <p className="mt-3">
              Diese Webseite kann Google Maps API verwenden, um geographische Informationen visuell
              darzustellen. Dabei werden auch Daten über die Nutzung der Kartenfunktionen erhoben.
              Weitere Informationen unter{" "}
              <a href="https://policies.google.com/privacy" className="text-accent hover:underline">
                policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section id="youtube">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Eingebettete YouTube-Videos</h2>
            <p className="mt-3">
              Auf einigen Seiten betten wir YouTube-Videos ein (Betreiber: YouTube, LLC, 901 Cherry
              Ave., San Bruno, CA 94066, USA). Bei Aufruf einer solchen Seite werden Daten an
              YouTube/Google übertragen. Falls Sie bei YouTube eingeloggt sind, wird der Besuch
              Ihrem Konto zugeordnet. Sie können dies durch Logout vor dem Besuch verhindern.
              Datenschutzbestimmungen:{" "}
              <a href="https://www.google.de/intl/de/policies/privacy/" className="text-accent hover:underline">
                google.de/intl/de/policies/privacy
              </a>
              .
            </p>
          </section>

          <section id="rechte">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Rechte der betroffenen Person</h2>
            <p className="mt-3">Sie haben gegenüber uns folgende Rechte nach DS-GVO:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1.5">
              <li><strong>Recht auf Bestätigung</strong> (Art. 15 DS-GVO)</li>
              <li><strong>Recht auf Auskunft</strong> über gespeicherte Daten (Art. 15 DS-GVO)</li>
              <li><strong>Recht auf Berichtigung</strong> unrichtiger Daten (Art. 16 DS-GVO)</li>
              <li><strong>Recht auf Löschung</strong> („Recht auf Vergessen werden", Art. 17 DS-GVO)</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DS-GVO)</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DS-GVO)</li>
              <li><strong>Recht auf Widerspruch</strong> gegen die Verarbeitung (Art. 21 DS-GVO)</li>
              <li><strong>Recht auf Widerruf</strong> einer erteilten Einwilligung (Art. 7 III DS-GVO)</li>
              <li><strong>Beschwerderecht</strong> bei einer Aufsichtsbehörde (Art. 77 DS-GVO)</li>
            </ul>
            <p className="mt-3">
              Zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an{" "}
              <a href="mailto:info@zentralverband-goldschmiede.de" className="text-accent hover:underline">
                info@zentralverband-goldschmiede.de
              </a>
              .
            </p>
          </section>

          <section id="automatisiert">
            <h2 className="font-display text-2xl sm:text-3xl scroll-mt-24">Automatisierte Entscheidungsfindung</h2>
            <p className="mt-3">
              Als verantwortungsbewusster Verband verzichten wir auf eine automatische
              Entscheidungsfindung oder ein Profiling.
            </p>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-6">
            Stand dieser Datenschutzerklärung: Mai 2026
          </p>
        </article>
      </section>
    </>
  );
}
