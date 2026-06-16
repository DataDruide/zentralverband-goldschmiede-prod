import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/der-zv")({
  head: () => ({
    meta: [
      { title: "Der ZV — Zentralverband der Deutschen Gold- & Silberschmiede e.V." },
      {
        name: "description",
        content:
          "Der Zentralverband ist der Dachverband für das Goldschmiede- und Silberschmiedehandwerk in Deutschland.",
      },
    ],
  }),
  component: DerZVPage,
});

function DerZVPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über uns"
        title="Der ZV"
        intro="Ist der Dachverband für das Goldschmiede- und Silberschmiedehandwerk."
      />
      <section className="container-prose py-12 sm:py-16 grid gap-8 lg:gap-12 lg:grid-cols-3">
        <aside className="lg:col-span-1">
          <div className="rounded-sm border border-border bg-card p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-lg sm:text-xl">Struktur</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li>· Zentralverband</li>
              <li>· Landesinnungsverband</li>
              <li>· Innung</li>
            </ul>
          </div>
        </aside>

        <div className="lg:col-span-2 space-y-5 text-foreground/85 leading-relaxed text-pretty">
          <p>
            <strong>Der Zentralverband</strong> hat einen gewählten Vorstand, der verpflichtet
            ist, die Belange der Kollegen zu vertreten und die Aufgaben, die die
            Mitgliederversammlung beschließt, durchzuführen und Rechenschaft darüber abzulegen.
            Als einziger Fachverband vertritt der Zentralverband die Interessen aller
            Goldschmiede und Silberschmiede.
          </p>
          <p>
            <strong>Der Landesinnungsverband</strong> ist der Zusammenschluss der einzelnen
            Innungen eines Bundeslandes. Vertreter des Landesinnungsverbandes ist der
            Landesinnungsmeister/in.
          </p>
          <p>
            <strong>Die Innung</strong> ist ein Zusammenschluss selbstständiger Handwerker
            gleicher oder ähnlicher Gewerke, um ihre gemeinsamen Interessen zu fördern.
            Vorsitzender einer Innung ist der Obermeister/in. Die Mitgliedschaft in der Innung
            ist freiwillig – im Gegensatz zur Mitgliedschaft in der Handwerkskammer. Innungen
            sind die Nachfolger der Zünfte.
          </p>
          <p>
            Über die »Verbandsnachrichten« in der GZ und auch über diese Internetseite versucht
            der Zentralverband, die Kollegenschaft zu informieren und branchenmäßig zu betreuen.
            Anfragen von allen Kollegen werden bearbeitet und schwierige rechtliche Fragen
            beantwortet.
          </p>
          <p>
            Um eine Meinungsvielfalt zu erfahren und vertreten zu können, braucht der
            Zentralverband die Mitarbeit aller Goldschmiede. Wenn es auch schwierig ist, die
            Arbeit transparent zu machen, seien Sie gewiss, dass wir uns auch in Ihrem
            Interesse eine Menge Gedanken um unser Handwerk machen, um die gemeinsamen
            Interessen optimal zu vertreten.
          </p>
        </div>
      </section>
    </>
  );
}
