import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Zentralverband der Deutschen Gold- & Silberschmiede e.V." },
      { name: "description", content: "Impressum, Anbieterkennzeichnung und Haftungsausschluss des Zentralverbandes der Deutschen Gold- und Silberschmiede e.V." },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <section className="container-prose py-12 sm:py-16 grid gap-10 lg:gap-12 lg:grid-cols-3">
        <aside className="lg:col-span-1 space-y-4 text-foreground/85">
          <div>
            <p className="font-semibold">Zentralverband der Deutschen Goldschmiede<br />und Silberschmiede e.V.</p>
            <address className="not-italic leading-relaxed mt-2">
              Altmarkt 17<br />
              03046 Cottbus
            </address>
          </div>
          <div className="text-sm leading-relaxed">
            <p>Tel.: <a href="tel:+4935529065035" className="text-accent hover:underline">0355 / 29065035</a></p>
            <p>Fax: 0355 / 790 307</p>
            <p>
              E-Mail:{" "}
              <a href="mailto:info@zentralverband-goldschmiede.de" className="text-accent hover:underline break-all">
                info@zentralverband-goldschmiede.de
              </a>
            </p>
            <p>
              Web:{" "}
              <a href="https://www.zentralverband-goldschmiede.de" className="text-accent hover:underline break-all">
                www.zentralverband-goldschmiede.de
              </a>
            </p>
          </div>
          <div className="text-sm text-muted-foreground border-t border-border pt-4">
            <p>Registergericht: Amtsgericht Cottbus VR 5706 CB</p>
            <p>Umsatzsteueridentifikationsnummer: 66/273/00250</p>
          </div>
        </aside>

        <div className="lg:col-span-2 space-y-8 text-foreground/85 leading-relaxed text-pretty">
          <div>
            <h2 className="font-display text-xl sm:text-2xl">Verantwortlich nach § 6 Abs. 2 MDStV</h2>
            <address className="not-italic mt-3">
              Zentralverband der Deutschen Goldschmiede und Silberschmiede e.V.<br />
              Altmarkt 17, 03046 Cottbus
            </address>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl">Haftungsausschluss (Disclaimer)</h2>
            <h3 className="font-semibold mt-4">Haftung für Inhalte</h3>
            <p className="mt-2">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
              werden wir diese Inhalte umgehend entfernen.
            </p>

            <h3 className="font-semibold mt-6">Haftung für Links</h3>
            <p className="mt-2">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
              der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
              verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
              entfernen.
            </p>

            <h3 className="font-semibold mt-6">Urheberrecht</h3>
            <p className="mt-2">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
              und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
              dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit
              die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
              werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>

            <h3 className="font-semibold mt-6">Datenschutz</h3>
            <p className="mt-2">
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten
              möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name,
              Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
              auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an
              Dritte weitergegeben.
            </p>
            <p className="mt-2">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
              Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der
              Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>
            <p className="mt-2">
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch
              Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und
              Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der
              Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten
              Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
