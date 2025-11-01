import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import React from 'react'
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaSass, FaFigma, 
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPostman, SiFirebase, SiAdobeillustrator, SiAdobephotoshop } from "react-icons/si";
export default function page() {
  return (
    <section className='container mx-auto pt-10 px-4'>
      <div className='relative text-3xl font-semibold w-fit'>
        About me <span className='w-2 h-2 bg-blue-500 absolute bottom-2 -right-4 rounded-full'></span>
      </div>

      <section className='flex flex-col md:flex-row flex-wrap gap-5 md:gap-10 w-full pt-8'>
        {/* الصورة + الزر */}
        <div className='w-full md:w-1/3 flex flex-col items-center gap-4'>
          <div className='border border-background/20 rounded-2xl shadow-xl shadow-background/10 overflow-hidden w-60 md:w-72'>
            <img src="/me.jpg" alt="me" className='rounded-2xl w-full h-auto object-cover' />
          </div>
          <div>
            <InteractiveHoverButton>My CV</InteractiveHoverButton>
          </div>
        </div>

        {/* النص */}
        <div className='flex-1 flex flex-col items-start justify-start'>
          <h2 className='text-2xl font-semibold mb-4'>Hi there, I'm Ahmed Abd El-mottalie</h2>
          <p className='text-base leading-relaxed max-w-2xl mb-6'>
            I’m a passionate and detail-oriented web developer with a strong focus on creating clean, modern, and user-friendly websites.
            I enjoy turning creative ideas into functional digital experiences, blending design with performance.
            Always eager to learn and adapt to new technologies, I aim to deliver high-quality solutions that make an impact.
          </p>

          {/* Skills Section */}
          <section>

            <h2 className='text-2xl font-semibold pb-4'>Tools & Technologies I use</h2>
            <div className='flex flex-wrap gap-4'>
              {[
 { name: "HTML", icon: <FaHtml5 className='text-orange-500' />, color: "from-orange-500/20 to-orange-600/10" },
  { name: "CSS", icon: <FaCss3Alt className='text-blue-500' />, color: "from-blue-500/20 to-blue-600/10" },
  { name: "JavaScript", icon: <FaJs className='text-yellow-400' />, color: "from-yellow-400/20 to-yellow-500/10" },
  { name: "TypeScript", icon: <SiTypescript className='text-blue-600' />, color: "from-blue-600/20 to-blue-700/10" },
  { name: "React", icon: <FaReact className='text-cyan-400' />, color: "from-cyan-400/20 to-cyan-500/10" },
  { name: "Next.js", icon: <SiNextdotjs className='text-gray-200' />, color: "from-gray-200/20 to-gray-300/10" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className='text-sky-400' />, color: "from-sky-400/20 to-sky-500/10" },
  { name: "Bootstrap", icon: <FaBootstrap className='text-purple-500' />, color: "from-purple-500/20 to-purple-600/10" },
  { name: "Sass", icon: <FaSass className='text-pink-400' />, color: "from-pink-400/20 to-pink-500/10" },
  { name: "Figma", icon: <FaFigma className='text-pink-500' />, color: "from-pink-500/20 to-pink-600/10" },
  { name: "Postman", icon: <SiPostman className='text-orange-400' />, color: "from-orange-400/20 to-orange-500/10" },
  { name: "Firebase", icon: <SiFirebase className='text-amber-400' />, color: "from-amber-400/20 to-amber-500/10" },
  { name: "Illustrator", icon: <SiAdobeillustrator className='text-orange-600' />, color: "from-orange-600/20 to-orange-700/10" },
  { name: "Photoshop", icon: <SiAdobephotoshop className='text-blue-400' />, color: "from-blue-400/20 to-blue-500/10" },              ].map((skill) => (
                <span
                  key={skill.name}
                  className={`group relative flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold 
      border border-primary/30 rounded-2xl bg-gradient-to-br ${skill.color}
      shadow-lg hover:shadow-xl hover:scale-105 hover:border-primary/50
      transition-all duration-300 cursor-pointer backdrop-blur-sm
      hover:-translate-y-1`}
                >
                  <span className='text-lg group-hover:scale-110 transition-transform duration-300'>
                    {skill.icon}
                  </span>
                  <span className='group-hover:text-white transition-colors duration-300'>
                    {skill.name}
                  </span>
                </span>
              ))}
            </div>
          </section>
        </div>
      </section>
    </section>
  )
}
