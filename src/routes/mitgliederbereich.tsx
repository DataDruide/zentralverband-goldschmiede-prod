import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/site/Button";
import { AssistantChat } from "@/components/site/AssistantChat";
import { PunzenCard } from "@/components/site/PunzenCard";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/mitgliederbereich")({
  head: () => ({ meta: [{ title: "Mitgliederbereich" }, { name: "robots", content: "noindex" }] }),
  component: MitgliederPage,
});

function MitgliederPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <section className="container-prose py-20 text-center text-muted-foreground">Lädt…</section>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Willkommen"
        title="Mitgliederbereich"
        intro={`Angemeldet als ${user.email}`}
      />
      <section className="container-prose py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AssistantChat />
          </div>
          <div className="lg:col-span-2 space-y-5">
            <div className="card-jewel p-6">
              <p className="chip chip-emerald">Profil</p>
              <h3 className="mt-3 font-display text-xl">Ihre Daten</h3>
              <p className="mt-2 text-sm text-muted-foreground break-all">E-Mail: {user.email}</p>
            </div>
            {user.email && <PunzenCard email={user.email} />}
            <div className="card-jewel p-6">
              <p className="chip chip-ember">Downloads</p>
              <h3 className="mt-3 font-display text-xl">Materialien</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vorlagen, Rundschreiben und Formulare für Mitglieder.
              </p>
            </div>
            <div className="card-jewel p-6">
              <p className="chip chip-plum">Veranstaltungen</p>
              <h3 className="mt-3 font-display text-xl">Termine</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Frühjahrstagung, Innungs-Events und Fortbildungen.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button variant="outline" onClick={() => signOut().then(() => navigate({ to: "/" }))}>
            Abmelden
          </Button>
        </div>
      </section>
    </>
  );
}
