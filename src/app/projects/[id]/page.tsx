"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { FaApple, FaGithub, FaGooglePlay } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import { SectionLabel } from "@/src/components/ui/page-header";
import Reveal from "@/src/components/ui/reveal";
import { projectsData } from "@/src/lib/projectsData";
import { projects } from "@/src/lib/projects";

const isStoreLink = (url: string) => /(apps\.apple|play\.google)\.com/.test(url);
const isPhoneShot = (src: string) => /\/shot\d+\.jpg$/.test(src);

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find((p) => p.id === id);
  if (!project) notFound();

  const store = isStoreLink(project.liveUrl);
  const [name, tagline] = project.title.split(" - ");
  const phoneShots = project.images.filter(isPhoneShot);
  const otherShots = project.images.filter((src) => !isPhoneShot(src) && src !== project.img);

  // Next project follows the order of the Projects page.
  const order = projects.map((p) => p.id);
  const at = order.indexOf(project.id);
  const nextId = order[(at + 1) % order.length];
  const next = projectsData.find((p) => p.id === nextId) ?? projectsData[0];

  return (
    <section className="container mx-auto px-5 sm:px-8 pt-16 pb-40">
      <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-silver transition hover:text-cyan">
        <BsArrowLeft /> ALL PROJECTS
      </Link>

      {/* heading */}
      <header className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="hero-rise font-mono text-xs tracking-[0.3em] text-cyan" style={{ "--d": "0s" } as React.CSSProperties}>
            {project.category.toUpperCase()} / {project.date}
          </p>
          <h1 className="hero-rise mt-4 text-silver-gradient font-extrabold tracking-tight leading-[1] text-[clamp(40px,6vw,76px)]" style={{ "--d": "0.06s" } as React.CSSProperties}>
            {name}
          </h1>
          {tagline && (
            <p className="hero-rise mt-3 text-lg sm:text-xl text-silver" style={{ "--d": "0.12s" } as React.CSSProperties}>
              {tagline}
            </p>
          )}
        </div>
        <div className="hero-rise flex flex-wrap gap-3" style={{ "--d": "0.18s" } as React.CSSProperties}>
          {[project.liveUrl, project.playUrl].filter((u): u is string => !!u).map((url, i) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                i === 0 ? "bg-cyan text-[#050507] hover:brightness-110" : "border border-white/15 text-background hover:border-white/40"
              }`}
            >
              {url.includes("apps.apple.com") ? <FaApple /> : url.includes("play.google.com") ? <FaGooglePlay /> : <BsArrowUpRight />}
              {url.includes("apps.apple.com") ? "App Store" : url.includes("play.google.com") ? "Google Play" : "Live site"}
            </a>
          ))}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-background transition hover:border-white/40"
            >
              <FaGithub /> Source
            </a>
          )}
        </div>
      </header>

      {/* cover */}
      <div className="hero-rise mt-12 overflow-hidden rounded-2xl border border-white/10" style={{ "--d": "0.24s" } as React.CSSProperties}>
        <img src={project.img} alt={project.title} className="w-full object-cover" />
      </div>

      {/* phone screenshots */}
      {phoneShots.length > 0 && (
        <div className="mt-6 -mx-5 sm:mx-0 flex gap-5 overflow-x-auto px-5 sm:px-0 pb-2 [scrollbar-width:none]">
          {phoneShots.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="w-[200px] sm:w-[230px] shrink-0 rounded-[28px] border-[5px] border-[#1c2230] bg-black"
            />
          ))}
        </div>
      )}

      {/* other screenshots */}
      {otherShots.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {otherShots.map((src) => (
            <img key={src} src={src} alt="" className="w-full rounded-2xl border border-white/10 object-cover object-top aspect-[16/10]" />
          ))}
        </div>
      )}

      {/* body */}
      <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_320px]">
        <div className="space-y-16">
          <section>
            <SectionLabel>OVERVIEW</SectionLabel>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-background/85">{project.longDesc}</p>
          </section>

          <section>
            <SectionLabel count={project.features.length}>WHAT IT DOES</SectionLabel>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-silver">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionLabel count={project.challenges.length}>{store ? "ENGINEERING NOTES" : "CHALLENGES"}</SectionLabel>
            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {project.challenges.map((c, i) => (
                <Reveal key={c.title} shape="line-top" className="grid gap-2 py-6 sm:grid-cols-[60px_1fr]">
                  <span className="font-mono text-sm text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-semibold text-background">{c.title}</h3>
                    <p className="mt-2 leading-relaxed text-silver">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        {/* sidebar */}
        <aside className="lg:sticky lg:top-10 h-fit space-y-10">
          <div>
            <SectionLabel>STACK</SectionLabel>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.skills.map((s) => (
                <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-background/80">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>DETAILS</SectionLabel>
            <dl className="mt-5 divide-y divide-white/10 text-sm">
              <div className="flex justify-between py-3"><dt className="text-silver">Type</dt><dd className="text-background">{project.category}</dd></div>
              <div className="flex justify-between py-3"><dt className="text-silver">Date</dt><dd className="text-background">{project.date}</dd></div>
              <div className="flex justify-between py-3">
                <dt className="text-silver">Status</dt>
                <dd className="flex items-center gap-2 text-background">
                  {project.liveUrl && <span className="h-1.5 w-1.5 rounded-full bg-cyan" />}
                  {store ? "Live on the stores" : project.liveUrl ? "Live" : "Case study"}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {/* next project */}
      <Reveal shape="line-top" className="mt-28">
      <Link href={`/projects/${next.id}`} className="group flex items-end justify-between gap-6 border-t border-white/10 pt-8">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-silver">NEXT PROJECT</p>
          <p className="mt-3 text-silver-gradient font-extrabold tracking-tight text-[clamp(32px,5vw,64px)] leading-none">
            {next.title.split(" - ")[0]}
          </p>
        </div>
        <span className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 text-background transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-[#050507]">
          <BsArrowRight size={22} className="transition-transform group-hover:-rotate-45" />
        </span>
      </Link>
      </Reveal>
    </section>
  );
}
