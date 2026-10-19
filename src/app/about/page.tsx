import Link from "next/link";
import { BsArrowRight, BsDownload } from "react-icons/bs";
import PageHeader, { SectionLabel } from "@/src/components/ui/page-header";
import NextPage from "@/src/components/shared/NextPage";

const experiences = [
  {
    role: "React Native Developer",
    company: "Triple Solutions",
    place: "Remote",
    date: "Jun 2026 – Present",
    desc: "Building and releasing production apps with Expo and TypeScript: ThrowBack, Asema, Earno and PureSite, live on the App Store and Google Play. Payments and in-app purchases (RevenueCat, Moyasar, Tabby, Tamara, Paymob), real-time features over Pusher, push notifications, biometrics, logistics integrations and OTA updates, all bilingual and RTL-first.",
  },
  {
    role: "React Native Developer",
    company: "Afaq Production",
    place: "Cairo",
    date: "Dec 2025 – Jun 2026",
    desc: "Architected and published the Sanaiee app to Google Play, owning the Expo build and release pipeline. Refactored legacy screens into a reusable, fully typed component library, and built the companion Next.js web platform.",
  },
  {
    role: "Frontend & React Native Developer",
    company: "Freelance",
    place: "Remote",
    date: "2025 – Present",
    desc: "Apps and web platforms for clients in Kuwait, Saudi Arabia and Egypt: an RTL-first Expo marketplace with Arabic PDF invoices, an Arabic study planner with AI-generated study material and Paymob paywalls, and a bilingual Next.js 15 B2B storefront.",
  },
  {
    role: "Front-End & Cross-Platform Developer Intern",
    company: "Information Technology Institute (ITI)",
    place: "Damanhour",
    date: "Jul 2025 – Dec 2025",
    desc: "Six-month intensive program in React Native and modern front-end development. Built Tadweer, a role-based recycling platform with schema-driven forms and secure authentication.",
  },
];

const stack = [
  { group: "Mobile", items: ["React Native", "Expo", "Expo Router", "React Navigation", "EAS Build", "In-App Purchases", "Android & iOS releases"] },
  { group: "Core & data", items: ["TypeScript", "JavaScript", "React", "TanStack Query", "Zustand", "Redux", "React Hook Form", "Zod", "REST APIs"] },
  { group: "Integrations", items: ["RevenueCat", "Pusher", "Google Maps", "Aramex", "RedBox", "Tabby", "Tamara", "Paymob", "Moyasar"] },
  { group: "UI & tooling", items: ["NativeWind", "Tailwind CSS", "Reanimated", "i18n / RTL", "Figma", "Git", "GitHub Actions", "Firebase"] },
  { group: "Web", items: ["Next.js", "Vite", "Responsive design", "SEO", "Playwright", "Vercel"] },
];

const facts = [
  { value: "5", label: "apps live on the stores" },
  { value: "3", label: "countries of clients" },
  { value: "AR / EN", label: "RTL-first by default" },
];

export default function AboutPage() {
  return (
    <section className="container mx-auto px-5 sm:px-8 pt-20 pb-40">
      <PageHeader index="02" eyebrow="ABOUT" title={<>React Native developer,<br />based in Cairo</>} />

      {/* intro */}
      <div className="mt-14 grid gap-12 lg:grid-cols-[340px_1fr] lg:items-start">
        <div className="hero-rise w-full max-w-[300px] lg:max-w-none overflow-hidden rounded-2xl border border-white/10" style={{ "--d": "0.12s" } as React.CSSProperties}>
          <img src="/me.jpg" alt="Ahmed Abdelmottalie" className="aspect-[4/5] w-full object-cover grayscale-[35%]" />
        </div>

        <div className="hero-rise max-w-2xl" style={{ "--d": "0.18s" } as React.CSSProperties}>
          <p className="text-lg sm:text-xl leading-relaxed text-background/90">
            I build React Native apps with Expo and TypeScript, currently at Triple Solutions. Five of them are live
            on the App Store and Google Play, most of them Arabic-first, with payments, subscriptions and real-time
            features built in.
          </p>
          <p className="mt-5 leading-relaxed text-silver">
            I own the full release path, from EAS builds and store submissions to over-the-air updates, and I build the
            matching web front ends in React and Next.js. Before Triple Solutions I shipped Sanaiee at Afaq Production
            and delivered freelance projects for clients in Kuwait, Saudi Arabia and Egypt.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xl sm:text-2xl font-bold text-background">{f.value}</dt>
                <dd className="mt-1 text-xs sm:text-sm text-silver">{f.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/Ahmed-Abdelmottalie-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-[#050507] transition hover:brightness-110"
            >
              <BsDownload /> Download CV
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-background transition hover:border-white/40"
            >
              Get in touch <BsArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* experience */}
      <section className="mt-28">
        <SectionLabel count={experiences.length}>EXPERIENCE</SectionLabel>
        <div className="mt-8 divide-y divide-white/10 border-b border-white/10">
          {experiences.map((e) => (
            <article key={e.company} className="grid gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10">
              <div className="font-mono text-xs tracking-wider text-silver">
                <p>{e.date}</p>
                <p className="mt-1 text-white/30">{e.place}</p>
              </div>
              <div className="max-w-3xl">
                <h3 className="text-lg sm:text-xl font-semibold text-background">{e.role}</h3>
                <p className="text-sm text-cyan">{e.company}</p>
                <p className="mt-3 leading-relaxed text-silver">{e.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* stack */}
      <section className="mt-24">
        <SectionLabel>STACK</SectionLabel>
        <div className="mt-8 divide-y divide-white/10 border-b border-white/10">
          {stack.map((s) => (
            <div key={s.group} className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-10">
              <p className="font-mono text-xs tracking-wider text-silver">{s.group.toUpperCase()}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-sm text-background/85">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* education */}
      <section className="mt-24">
        <SectionLabel>EDUCATION</SectionLabel>
        <div className="mt-8 grid gap-3 border-b border-white/10 pb-8 md:grid-cols-[220px_1fr] md:gap-10">
          <p className="font-mono text-xs tracking-wider text-silver">2020 – 2024</p>
          <div>
            <h3 className="text-lg font-semibold text-background">B.Sc. in Science, Zoology</h3>
            <p className="text-sm text-cyan">Kafr El-Sheikh University</p>
          </div>
        </div>
      </section>

      <NextPage />
    </section>
  );
}
