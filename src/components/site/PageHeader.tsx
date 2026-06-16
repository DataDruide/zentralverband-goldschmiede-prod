interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="container-prose py-12 sm:py-16 md:py-24">
        {eyebrow && (
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground max-w-3xl leading-[1.1] text-balance">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
