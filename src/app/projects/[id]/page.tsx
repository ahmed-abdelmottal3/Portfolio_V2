"use client"
import { useState } from "react";
import { FaEye, FaGithub, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { MagicCard } from "@/src/components/ui/magic-card";
import { ShinyButton } from "@/src/components/ui/shiny-button";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { projectsData } from "@/src/lib/projectsData";
export default function ProjectDetails() {
    const params = useParams();
    const projectId = params.id as string;


    const project = projectsData.find(p => p.id === projectId);

    if (!project) {
        notFound();
    }

    const [selectedImage, setSelectedImage] = useState(project.img);

    return (
        <div className='container mx-auto pt-10 px-4 pb-20'>
            {/* Back Button */}
            <Link href="/projects">
                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 mb-8 group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Back to Projects</span>
                </button>
            </Link>

            {/* Hero Section */}
            <div className="mb-12">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            {project.title}
                        </h1>
                        <p className="text-xl text-blue-400 font-light">
                            {project.subtitle}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="flex items-center gap-2 bg-background/10 text-white px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-foreground/90 hover:scale-105 hover:shadow-lg active:scale-95">
                                <FaEye />
                                Live Demo
                            </button>
                        </a>
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ShinyButton
                                icon={<FaGithub className="text-foreground" />}
                                className="bg-background px-6 py-3"
                            >
                                View Code
                            </ShinyButton>
                        </a>
                    </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>{project.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>{project.date}</span>
                    </div>
                </div>
            </div>

            {/* Main Image */}
            <MagicCard className="mb-8 p-1">
                <div className="relative z-10 w-full h-[400px] md:h-[600px] rounded-2xl bg-black/5">
                    <div className="w-full h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <img
                            src={selectedImage}
                            alt={project.title}
                            className="w-full h-auto object-contain rounded-2xl"
                        />
                    </div>

                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-b-xl animate-pulse" />

                    <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 animate-bounce text-2xl select-none">
                        ↓
                    </div>
                </div>
            </MagicCard>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    {/* Overview */}
                    <MagicCard className="p-6">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Project Overview
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                {project.desc}
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                {project.longDesc}
                            </p>
                        </div>
                    </MagicCard>

                    {/* Key Features */}
                    <MagicCard className="p-6">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Key Features
                            </h2>
                            <div className="space-y-3">
                                {project.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"></div>
                                        <p className="text-gray-400 leading-relaxed">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MagicCard>

                    {/* Challenges & Solutions */}
                    <MagicCard className="p-6">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Challenges & Solutions
                            </h2>
                            <div className="space-y-6">
                                {project.challenges.map((challenge, index) => (
                                    <div key={index} className="border-l-2 border-blue-400 pl-4">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {challenge.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {challenge.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MagicCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Technologies */}
                    <MagicCard className="p-6">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-2 text-sm font-medium rounded-full bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-blue-400 transition-all duration-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </MagicCard>

                    {/* Project Links */}
                    <MagicCard className="p-6">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Project Links
                            </h3>
                            <div className="space-y-3">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <span className="text-gray-300">Live Website</span>
                                    <FaExternalLinkAlt className="text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <span className="text-gray-300">Source Code</span>
                                    <FaGithub className="text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>
                    </MagicCard>

                    {/* Project Info */}
                    <MagicCard className="p-6">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Project Info
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Category</p>
                                    <p className="text-gray-300">{project.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Completed</p>
                                    <p className="text-gray-300">{project.date}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Status</p>
                                    <span className="inline-flex items-center gap-2 text-green-400">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Live & Maintained
                                    </span>
                                </div>
                            </div>
                        </div>
                    </MagicCard>
                </div>
            </div>

            {/* CTA Section */}
            <MagicCard className="p-8 text-center">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Interested in Similar Work?
                    </h2>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                        I'm available for freelance projects and collaborations. Let's create something amazing together!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact">
                            <button className="flex items-center gap-2 bg-foreground text-white px-8 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-foreground/90 hover:scale-105 hover:shadow-lg">
                                Get in Touch
                            </button>
                        </Link>
                        <Link href="/projects">
                            <ShinyButton className="bg-background px-8 py-3">
                                View More Projects
                            </ShinyButton>
                        </Link>
                    </div>
                </div>
            </MagicCard>
        </div>
    );
}