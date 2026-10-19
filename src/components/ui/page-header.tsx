import Reveal from "./reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
};

// Page heading in the same voice as the splash: mono eyebrow, silver title.
export default function PageHeader({ index, eyebrow, title, intro }: Props) {
  return (
    <header className="max-w-3xl">
      <p className="hero-rise font-mono text-xs tracking-[0.3em] text-cyan" style={{ "--d": "0s" } as React.CSSProperties}>
        {index} / {eyebrow}
      </p>
      <h1
        className="hero-rise mt-4 text-silver-gradient font-extrabold tracking-tight leading-[1] text-[clamp(40px,6vw,76px)]"
        style={{ "--d": "0.06s" } as React.CSSProperties}
      >
        {title}
      </h1>
      {intro && (
        <p className="hero-rise mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-silver" style={{ "--d": "0.12s" } as React.CSSProperties}>
          {intro}
        </p>
      )}
    </header>
  );
}

// Small mono label used above sections inside a page.
export function SectionLabel({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <Reveal shape="line-middle" className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] text-silver">
      <span>{children}</span>
      {count !== undefined && <span className="text-white/25">{String(count).padStart(2, "0")}</span>}
      <span className="h-px flex-1 bg-white/10" />
    </Reveal>
  );
}
