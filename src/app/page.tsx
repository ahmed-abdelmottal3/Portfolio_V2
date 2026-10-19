import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { BsArrowRight, BsDownload } from "react-icons/bs";
import ParticlePortrait from "../components/ui/particle-portrait";

const stats = [
  { value: "5", label: "apps live on the stores" },
  { value: "iOS + Android", label: "from one codebase" },
  { value: "AR / EN", label: "RTL-first by default" },
];

const stack = ["React Native", "Expo", "TypeScript", "React Query", "Zustand", "Next.js"];

export default function Home() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-5 sm:px-8 pt-16 pb-36 lg:pt-0 lg:pb-0 min-h-screen grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
        {/* copy */}
        <div className="relative z-10 order-2 lg:order-1">
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan mb-5">
            REACT NATIVE DEVELOPER · CAIRO
          </p>

          <h1 className="text-silver-gradient font-extrabold tracking-tight leading-[0.95] text-[clamp(44px,7vw,96px)]">
            Ahmed
            <br />
            Abdelmottalie
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-silver">
            I build production iOS and Android apps with Expo and TypeScript at Triple Solutions.
            Five are live on the App Store and Google Play, most of them Arabic-first with
            payments and subscriptions built in.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-[#050507] transition hover:brightness-110"
            >
              View projects
              <BsArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="/Ahmed-Abdelmottalie-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-background transition hover:border-white/40"
            >
              <BsDownload />
              Download CV
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-silver transition hover:text-background"
            >
              Get in touch
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 max-w-xl border-t border-white/10 pt-6 gap-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-lg sm:text-2xl font-bold text-background">{s.value}</dt>
                <dd className="mt-1 text-xs sm:text-sm text-silver">{s.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 inline-flex items-center gap-2 text-xs text-silver">
              <FaApple /> <FaGooglePlay /> Shipping with
            </span>
            {stack.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-background/80">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* portrait */}
        <div className="relative order-1 lg:order-2 h-[46vh] sm:h-[55vh] lg:h-[78vh]">
          <ParticlePortrait delay={0.1} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
}
