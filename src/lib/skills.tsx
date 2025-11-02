import React from 'react';
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaSass, FaFigma,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPostman, SiFirebase, SiAdobeillustrator, SiAdobephotoshop } from "react-icons/si";

interface Skill {
    name: string;
    icon: React.ReactNode;
    color: string;
}

export const skills: Skill[] = [
    { name: "HTML", icon: <FaHtml5 className='text-orange-500' />, color: "from-orange-500/20 to-orange-600/10" },
    { name: "CSS", icon: <FaCss3Alt className='text-blue-500' />, color: "from-blue-500/20 to-blue-600/10" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className='text-sky-400' />, color: "from-sky-400/20 to-sky-500/10" },
    { name: "Bootstrap", icon: <FaBootstrap className='text-purple-500' />, color: "from-purple-500/20 to-purple-600/10" },
    { name: "Sass", icon: <FaSass className='text-pink-400' />, color: "from-pink-400/20 to-pink-500/10" },
    { name: "JavaScript", icon: <FaJs className='text-yellow-400' />, color: "from-yellow-400/20 to-yellow-500/10" },
    { name: "TypeScript", icon: <SiTypescript className='text-blue-600' />, color: "from-blue-600/20 to-blue-700/10" },
    { name: "React", icon: <FaReact className='text-cyan-400' />, color: "from-cyan-400/20 to-cyan-500/10" },
    { name: "Next.js", icon: <SiNextdotjs className='text-gray-200' />, color: "from-gray-200/20 to-gray-300/10" },
    { name: "Postman", icon: <SiPostman className='text-orange-400' />, color: "from-orange-400/20 to-orange-500/10" },
    { name: "Firebase", icon: <SiFirebase className='text-amber-400' />, color: "from-amber-400/20 to-amber-500/10" },
    { name: "Figma", icon: <FaFigma className='text-pink-500' />, color: "from-pink-500/20 to-pink-600/10" },
    { name: "Illustrator", icon: <SiAdobeillustrator className='text-orange-600' />, color: "from-orange-600/20 to-orange-700/10" },
    { name: "Photoshop", icon: <SiAdobephotoshop className='text-blue-400' />, color: "from-blue-400/20 to-blue-500/10" },
];
