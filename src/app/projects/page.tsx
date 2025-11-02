"use client"
import Header from "@/src/components/ui/header";
import { MdViewList } from 'react-icons/md';
import { HiViewGrid } from 'react-icons/hi';
import { useState } from "react";
import { MagicCard } from "@/src/components/ui/magic-card";
import { ShinyButton } from "@/src/components/ui/shiny-button";
import { FaEye, FaGithub } from "react-icons/fa";
import Link from "next/link";
import CircularCTA from "@/src/components/shared/CircularCTA";
import { projects } from "@/src/lib/projects";
export default function Page() {
    const [view, setView] = useState("grid");



    return (
        <section className='container mx-auto pt-10 px-4'>
            <Header title="Projects" />
            <p className="max-w-lg text-background/40 font-light">
                Explore my mini-projects showcasing my skills in web development and design.
                Each project reflects my passion for coding and creativity.
            </p>

            {/* view toggle */}
            <div className="hidden sm:flex w-fit m-auto mt-5 gap-3 items-center justify-center bg-background/20 rounded-full py-1 px-2">
                <div
                    onClick={() => setView("grid")}
                    className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${view === "grid" ? "bg-blue-500/30 text-blue-400" : "hover:bg-background/40"
                        }`}
                >
                    <HiViewGrid size={22} />
                </div>
                <div
                    onClick={() => setView("list")}
                    className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${view === "list" ? "bg-blue-500/30 text-blue-400" : "hover:bg-background/40"
                        }`}
                >
                    <MdViewList size={22} />
                </div>
            </div>

            {/* projects section */}
            <div
                className={`mt-10 w-full transition-all duration-500 ${view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                    : "flex flex-col gap-4"
                    }`}
            >
                {projects.map((proj, i) => (
                    <MagicCard
                        key={i}
                        className={`transition-all duration-500 group ${view === "list" ? "flex flex-col sm:flex-row items-center gap-4 p-4" : "flex flex-col p-1"
                            }`}
                    >
                        {/* img */}
                        <Link href={`/projects/${proj.id}`} className="relative z-10 group">
                            <div
                                className={`${view === "list"
                                    ? "w-96 h-auto shrink-0 overflow-hidden rounded-xl"
                                    : "w-full h-auto overflow-hidden rounded-tl-xl rounded-tr-xl"
                                    } relative`}
                            >
                                <img
                                    src={proj.img}
                                    alt={proj.title}
                                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                                />

                                {/* overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                    <span className="text-white text-lg font-semibold tracking-wide flex items-center gap-2">
                                        View Details
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                        {/* data */}
                        <div
                            className={`relative z-10 transition-all duration-300 ${view === "list"
                                ? "flex-1 flex flex-col justify-center"
                                : "p-5 flex flex-col justify-between h-auto"
                                }`}
                        >
                            {/* title */}
                            <Link href={`/projects/${proj.id}`}>
                                <h3 className="relative text-lg w-fit font-semibold text-white transition-colors duration-300 group-hover:text-blue-400 pb-1 cursor-pointer">
                                    {proj.title}
                                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </h3>
                            </Link>

                            {/* desc */}
                            <p className="text-sm text-gray-400 leading-relaxed mt-1">
                                {proj.desc.slice(0, 100) + "..."}
                            </p>

                            {/* skills */}
                            <div className='flex flex-wrap gap-2 mt-4'>
                                {proj.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* buttons */}
                            <div className="flex flex-wrap gap-3 mt-4">
                                <Link href={`/projects/${proj.id}`} className="flex-1">
                                    <button className="w-full flex items-center justify-center gap-2 bg-foreground text-white px-6 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-foreground/90 hover:scale-105 hover:shadow-lg active:bg-foreground/80 active:scale-95 active:shadow-md">
                                        <FaEye className="text-white" />
                                        Demo
                                    </button>
                                </Link>
                                <a
                                    href={proj.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1"
                                >
                                    <ShinyButton
                                        icon={<FaGithub className="text-foreground" />}
                                        className="w-full bg-background"
                                    >
                                        Code
                                    </ShinyButton>
                                </a>
                            </div>
                        </div>
                    </MagicCard>
                ))}
            </div>
            <div>
                <CircularCTA title='Get in touch • Get in touch • Get in touch •'
                    from='Crafted With Care'
                    to='Lets Craft Yours'
                    href="/contact" />
            </div>
        </section>
    );
}