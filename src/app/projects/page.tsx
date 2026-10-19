"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaApple, FaGithub, FaGooglePlay } from "react-icons/fa";
import { BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import PageHeader, { SectionLabel } from "@/src/components/ui/page-header";
import NextPage from "@/src/components/shared/NextPage";
import { projects } from "@/src/lib/projects";

type Project = (typeof projects)[number];

const filters = ["All", "Mobile", "Web", "UI/UX"] as const;

const isStoreLink = (url: string) => /(apps\.apple|play\.google)\.com/.test(url);

function StoreIcon({ url }: { url: string }) {
  if (url.includes("apps.apple.com")) return <FaApple />;
  if (url.includes("play.google.com")) return <FaGooglePlay />;
  return <BsArrowUpRight />;
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter((p) => filter === "All" || p.category === filter);
  const shipped = visible.filter((p) => isStoreLink(p.liveUrl));
  const other = visible.filter((p) => !isStoreLink(p.liveUrl));

  return (
    <section className="container mx-auto px-5 sm:px-8 pt-20 pb-40">
      <PageHeader
        index="03"
        eyebrow="PROJECTS"
        title="Selected work"
        intro="Apps I have shipped to the App Store and Google Play come first. Client code is private, so each one links to its store listing and a short case study."
      />

      {/* filters */}
      <div className="hero-rise mt-10 inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1" style={{ "--d": "0.18s" } as React.CSSProperties}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-4 sm:px-5 py-2 text-sm font-medium transition-colors ${
              filter === f ? "text-[#050507]" : "text-silver hover:text-background"
            }`}
          >
            {filter === f && (
              <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-cyan" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      {shipped.length > 0 && (
        <div className="mt-16">
          <SectionLabel count={shipped.length}>SHIPPED TO THE STORES</SectionLabel>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {shipped.map((p, i) => (
              <ShippedCard key={p.id} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      )}

      {other.length > 0 && (
        <div className="mt-20">
          <SectionLabel count={other.length}>{filter === "UI/UX" ? "DESIGN WORK" : "MORE WORK"}</SectionLabel>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {other.map((p) => (
              <WorkCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}

      <NextPage />
    </section>
  );
}

function ShippedCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25">
      <Link href={`/projects/${p.id}`} className="block overflow-hidden">
        <img
          src={p.img}
          alt={p.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-white/30">{String(index).padStart(2, "0")}</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-background">{p.title.split(" - ")[0]}</h2>
            <p className="text-sm text-silver">{p.title.split(" - ")[1]}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            {[p.liveUrl, p.playUrl].filter((u): u is string => !!u).map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} on ${url.includes("apps.apple.com") ? "the App Store" : "Google Play"}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-background transition hover:border-cyan hover:text-cyan"
              >
                <StoreIcon url={url} />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-silver line-clamp-3">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.skills.map((s) => (
            <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-background/80">{s}</span>
          ))}
        </div>
        <Link href={`/projects/${p.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
          Case study <BsArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

function WorkCard({ project: p }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25">
      <Link href={`/projects/${p.id}`} className="block overflow-hidden">
        <img
          src={p.img}
          alt={p.title}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white/30">{p.category.toUpperCase()}</p>
        <h3 className="mt-1 text-lg font-semibold text-background">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-silver line-clamp-2">{p.desc}</p>
        <div className="mt-auto flex items-center gap-4 pt-5 text-sm">
          <Link href={`/projects/${p.id}`} className="inline-flex items-center gap-1.5 font-semibold text-background hover:text-cyan">
            Details <BsArrowRight />
          </Link>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-silver hover:text-cyan">
              Live <BsArrowUpRight />
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-silver hover:text-cyan">
              <FaGithub /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
