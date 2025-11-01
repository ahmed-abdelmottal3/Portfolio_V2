import CircularCTA from '@/components/shared/CircularCTA';
import Header from '@/components/ui/header';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { MagicCard } from '@/components/ui/magic-card';
import { SpinningText } from '@/components/ui/spinning-text';
import Link from 'next/link';
import { title } from 'process';
import { BsArrowRight } from 'react-icons/bs';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaSass, FaFigma,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPostman, SiFirebase, SiAdobeillustrator, SiAdobephotoshop } from "react-icons/si";

const skills = [
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

const experiences = [{
  role: "Frontend Developer",
  company: "Information Technology Institute (ITI)",
  desc: "Participating in an intensive 5-month scholarship program provided by the Ministry of Communications through ITI, focusing on advanced front-end technologies, cross-platform mobile development, and real-world software engineering practices.",
  date: "July-2025"
}
]

export default function page() {
  return (
    <section className='container mx-auto pt-10 px-4'>
      <Header title="About me" />

      {/* info */}
      <Info />

      {/* experience & education */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-10 items-start max-w-7xl mx-auto px-4 mt-12'>
        <Experience />
        <Education />
      </section>

      {/* CTA section */}
      <CircularCTA title='my projects • my projects • my projects •'
      from='From Pixels'
      to='Tp Products' />

    </section>
  )
}

function Info() {
  return (
    <section className='flex flex-col md:flex-row flex-wrap gap-5 md:gap-10 w-full'>
      {/* img + btn */}
      <div className='w-full md:w-1/3 flex flex-col items-center gap-4'>
        <div className='border border-background/20 rounded-2xl shadow-xl shadow-background/10 overflow-hidden w-60 md:w-72'>
          <img src="/me.jpg" alt="me" className='rounded-2xl w-full h-auto object-cover' />
        </div>
        <div>
          <InteractiveHoverButton>My CV</InteractiveHoverButton>
        </div>
      </div>

      {/* desc*/}
      <div className='flex-1 flex flex-col items-start justify-start'>
        <h2 className=' text-2xl font-semibold mb-4'><span className='font-great-vibes font-light'>Hi there,</span> I'm Ahmed Abd El-mottalie</h2>
        <p className='text-base leading-relaxed max-w-2xl mb-6'>
          I’m a passionate and detail-oriented web developer with a strong focus on creating clean, modern, and user-friendly websites.
          I enjoy turning creative ideas into functional digital experiences, blending design with performance.
          Always eager to learn and adapt to new technologies, I aim to deliver high-quality solutions that make an impact.
        </p>

        {/* skills */}
        <section>

          <h2 className='text-2xl font-semibold pb-4'>Tools & Technologies I use</h2>
          <div className='flex flex-wrap gap-4'>
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`group relative flex items-center justify-center size-14 
      border border-primary/30 rounded-2xl bg-linear-to-br ${skill.color}
      shadow-lg hover:shadow-xl hover:scale-105 hover:border-primary/50
      transition-all duration-300 cursor-pointer backdrop-blur-sm
      hover:-translate-y-1`}
              >
                <span className='text-2xl group-hover:scale-110 transition-transform duration-300'>
                  {skill.icon}
                </span>

                {/* tooltip */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 
        group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300
        bg-background text-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-xl 
        border border-white/10 whitespace-nowrap pointer-events-none">
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <div>
      <Header title="Experience" />
      {experiences.map((exp, index) => (
        <MagicCard className="p-4 mb-4" key={index}>
          <div className="flex items-center gap-4">
            <div>
              <div className='flex justify-between items-center'>
                <div>
                  <h2 className="font-semibold text-lg text-blue-500">
                    {exp.role}
                  </h2>
                  <h5 className="text-sm text-muted-foreground">
                    {exp.company}
                  </h5>
                </div>
                <h6 className='text-sm text-background/40'>{exp.date}</h6>
              </div>
              <p className='pt-4 text-background/60 font-light'>{exp.desc}</p>
            </div>
          </div>
        </MagicCard>
      ))}
    </div>
  )
}

function Education() {
  return (
    <div>
      <Header title="Education" />
      <MagicCard className="p-4 mb-4 h-fit">
        <div className="flex items-center gap-4">
          <div>
            <div className='flex justify-between items-center'>
            <div>
            <h2 className="font-semibold text-lg text-blue-500">
              Bachelor’s Degree, Sc
            </h2>
            <h5 className="text-sm text-muted-foreground">
              KFS University
            </h5>
            </div>
            <h6 className='text-sm text-background/40'>2020 - 2024</h6>
            </div>
            <p className='pt-4 text-background/60 font-light'>Bachelor's degree in Computer Science from Kafr El-Sheikh University, focusing on software development and web technologies.</p>
          </div>
        </div>
      </MagicCard>
    </div>
  )
}