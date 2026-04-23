"use client";
import Header from "@/src/components/ui/header";
import { MdViewList } from "react-icons/md";
import { HiViewGrid } from "react-icons/hi";
import { useState } from "react";
import { MagicCard } from "@/src/components/ui/magic-card";
import { ShinyButton } from "@/src/components/ui/shiny-button";
import { FaEye, FaGithub } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";
import CircularCTA from "@/src/components/shared/CircularCTA";
import { projects } from "@/src/lib/projects";

export default function Page() {
  const [view, setView] = useState("grid");
  const [category, setCategory] = useState("All");

  const filteredProjects = projects.filter((proj) =>
    category === "All" ? true : proj.category === category,
  );

  return (
    <section className="container mx-auto pt-10 px-4">
      <Header title="Projects" />
      <p className="max-w-lg text-background/60 font-light">
        Explore my mini-projects showcasing my skills in web development and
        design. Each project reflects my passion for coding and creativity.
      </p>

      {/* view toggle */}
      <div className="hidden sm:flex w-fit m-auto mt-5 gap-3 items-center justify-center bg-background/10 rounded-full py-0.5 px-2">
        <div
          onClick={() => setView("grid")}
          className={`p-1 rounded-full cursor-pointer transition-all duration-300 ${
            view === "grid"
              ? "bg-blue-500/30 text-blue-400"
              : "hover:bg-background/40"
          }`}
        >
          <HiViewGrid size={22} />
        </div>
        <div
          onClick={() => setView("list")}
          className={`p-1 rounded-full cursor-pointer transition-all duration-300 ${
            view === "list"
              ? "bg-blue-500/30 text-blue-400"
              : "hover:bg-background/40"
          }`}
        >
          <MdViewList size={22} />
        </div>
      </div>

      {/* category filter */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {["All", "Web", "Mobile", "UI/UX"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              category === cat
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                : "bg-background/10 text-background/60 hover:bg-background/20 hover:text-background"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* projects section */}
      {view === "grid" ? (
        <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((proj, i) => (
            <MagicCard key={i} className="group flex flex-col p-1">
              {/* img */}
              <Link
                href={`/projects/${proj.id}`}
                className="relative z-10 group"
              >
                <div className="w-full h-auto overflow-hidden rounded-tl-xl rounded-tr-xl relative">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold tracking-wide flex items-center gap-2">
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
              {/* data */}
              <div className="relative z-10 p-5 flex flex-col justify-between h-auto">
                <Link href={`/projects/${proj.id}`}>
                  <h3 className="relative text-lg w-fit font-semibold text-background transition-colors duration-300 group-hover:text-blue-400 pb-1 cursor-pointer">
                    {proj.title}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </h3>
                </Link>
                <p className="text-sm text-background/40 leading-relaxed mt-1">
                  {proj.desc.slice(0, 100) + "..."}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {proj.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-background/10 text-background backdrop-blur-sm border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center flex-wrap gap-3 mt-4 w-full">
                  {proj.liveUrl && (
                    <a 
                      href={proj.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 min-w-[120px]"
                    >
                      <button className="w-full px-6 flex items-center justify-center gap-2 bg-foreground text-background py-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-foreground/90 hover:scale-105 hover:shadow-lg active:scale-95">
                        <FaEye className="text-background" />
                        Demo
                      </button>
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px]"
                    >
                      <ShinyButton
                        icon={<FaGithub className="text-foreground" />}
                        className="w-full px-6 bg-background"
                      >
                        Code
                      </ShinyButton>
                    </a>
                  )}
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      ) : (
        /* ── LIST VIEW ── */
        <div className="mt-10 w-full flex flex-col">
          {/* header row */}
          <div className="hidden sm:grid grid-cols-[3rem_1fr_9rem_10rem] gap-6 px-6 pb-3 border-b border-background/10">
            <span className="text-xs font-semibold text-background/30 uppercase tracking-widest">
              #
            </span>
            <span className="text-xs font-semibold text-background/30 uppercase tracking-widest">
              Project
            </span>
            <span className="text-xs font-semibold text-background/30 uppercase tracking-widest">
              Category
            </span>
            <span className="text-xs font-semibold text-background/30 uppercase tracking-widest text-right">
              Links
            </span>
          </div>

          {filteredProjects.map((proj, i) => (
            <MagicCard
              key={i}
              className="group relative overflow-visible border-b border-background/10 last:border-b-0 rounded-none first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-[3rem_1fr_9rem_10rem] gap-4 sm:gap-6 items-center px-4 sm:px-6 py-5 relative z-10">
                {/* index */}
                <span className="hidden sm:block text-4xl font-black text-background/8 group-hover:text-blue-500/20 transition-colors duration-500 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* main info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* thumbnail */}
                  <Link
                    href={`/projects/${proj.id}`}
                    className="shrink-0 relative overflow-hidden rounded-xl w-full sm:w-28 h-20 block"
                  >
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <BsArrowUpRight className="text-white" size={16} />
                    </div>
                  </Link>

                  {/* text */}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <Link href={`/projects/${proj.id}`}>
                      <h3 className="relative w-fit text-base font-semibold text-background group-hover:text-blue-400 transition-colors duration-300 pb-0.5 cursor-pointer">
                        {proj.title}
                        <span className="absolute left-0 bottom-0 h-px w-full bg-blue-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
                      </h3>
                    </Link>
                    <p className="text-xs text-background/40 leading-relaxed line-clamp-2 max-w-sm">
                      {proj.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {proj.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-background/10 text-background/70 border border-white/10 backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* category badge */}
                <div className="hidden sm:flex justify-start">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-wide uppercase">
                    {proj.category}
                  </span>
                </div>

                {/* action buttons */}
                <div className="flex items-center gap-2 sm:justify-end">
                  {proj.liveUrl && (
                    <a 
                      href={proj.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-foreground text-background transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-foreground/10 active:scale-95 cursor-pointer whitespace-nowrap">
                        <FaEye size={11} />
                        Demo
                      </button>
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-background/10 text-background border border-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-background/20 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap">
                        <FaGithub size={11} />
                        Code
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      )}

      <div>
        <CircularCTA
          title="Get in touch • Get in touch • Get in touch •"
          from="Crafted With Care"
          to="Lets Craft Yours"
          href="/contact"
        />
      </div>
    </section>
  );
}
