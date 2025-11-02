import CircularCTA from "@/src/components/shared/CircularCTA";
import Header from "@/src/components/ui/header";
import { InteractiveHoverButton } from "@/src/components/ui/interactive-hover-button";
import { MagicCard } from "@/src/components/ui/magic-card";
import { skills } from "@/src/lib/skills";

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
        to='To Products'
        href='/projects' />

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
          I'm a passionate and detail-oriented web developer with a strong focus on creating clean, modern, and user-friendly websites.
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
        <MagicCard className="p-6 mb-4" key={index}>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-full">
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4'>
                <div>
                  <h2 className="font-semibold text-lg text-blue-400">
                    {exp.role}
                  </h2>
                  <h5 className="text-sm text-gray-400">
                    {exp.company}
                  </h5>
                </div>
                <h6 className='text-sm text-gray-500'>{exp.date}</h6>
              </div>
              <p className='text-gray-400 font-light leading-relaxed'>{exp.desc}</p>
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
      <MagicCard className="p-6 mb-4 h-fit">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-full">
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4'>
              <div>
                <h2 className="font-semibold text-lg text-blue-400">
                  Bachelor's Degree, Sc
                </h2>
                <h5 className="text-sm text-gray-400">
                  KFS University
                </h5>
              </div>
              <h6 className='text-sm text-gray-500'>2020 - 2024</h6>
            </div>
            <p className='text-gray-400 font-light leading-relaxed'>Bachelor's degree in Computer Science from Kafr El-Sheikh University, focusing on software development and web technologies.</p>
          </div>
        </div>
      </MagicCard>
    </div>
  )
}