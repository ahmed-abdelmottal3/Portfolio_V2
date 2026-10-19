import CircularCTA from "@/src/components/shared/CircularCTA";
import Header from "@/src/components/ui/header";
import { InteractiveHoverButton } from "@/src/components/ui/interactive-hover-button";
import { MagicCard } from "@/src/components/ui/magic-card";
import { skills } from "@/src/lib/skills";
import Link from "next/link";

const experiences = [{
  role: "React Native Developer",
  company: "Triple Solutions",
  desc: "Building and releasing production React Native apps with Expo and TypeScript: ThrowBack, Asema, Earno and PureSite, live on the App Store and Google Play. Payments and in-app purchases (RevenueCat, Moyasar, Tabby, Tamara, Paymob), real-time features over Pusher, push notifications, biometrics, logistics integrations and OTA updates, all bilingual and RTL-first.",
  date: "Jun 2026 - Present"
},
{
  role: "React Native Developer",
  company: "Afaq Production",
  desc: "Architected and published the Sanaiee app to Google Play, owning the Expo build and release pipeline. Refactored legacy screens into a reusable, fully typed component library, and built the companion Next.js web platform with responsive, SEO-optimized pages.",
  date: "Dec 2025 - Jun 2026"
},
{
  role: "Frontend & React Native Developer",
  company: "Freelance",
  desc: "Delivered apps and web platforms for clients in Kuwait, Saudi Arabia and Egypt: an RTL-first Expo marketplace with Arabic PDF invoices, an Arabic study planner with AI-generated study material and Paymob paywalls, and a bilingual Next.js 15 B2B storefront.",
  date: "2025 - Present"
},
{
  role: "Front-End & Cross-Platform Developer Intern",
  company: "Information Technology Institute (ITI)",
  desc: "Six-month intensive program in React Native and modern front-end development. Built Tadweer, a role-based recycling platform with schema-driven forms and secure authentication.",
  date: "Jul 2025 - Dec 2025"
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
        from='From Figma'
        to='To the stores'
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
          <InteractiveHoverButton>
            <Link
              target="_blank"
              href="/Ahmed-Abdelmottalie-CV.pdf">
              My CV
            </Link>
          </InteractiveHoverButton>
        </div>
      </div>

      {/* desc*/}
      <div className='flex-1 flex flex-col items-start justify-start'>
        <h2 className=' text-2xl font-semibold mb-4'>I'm Ahmed Abdelmottalie</h2>
        <p className='text-base leading-relaxed text-background/60 max-w-2xl mb-6'>
          I build React Native apps with Expo and TypeScript, currently at Triple Solutions in Cairo.
          Five of them are live on the App Store and Google Play, most of them Arabic-first, with payments,
          subscriptions and real-time features built in. I own the full release path, from EAS builds and store
          submissions to over-the-air updates, and I build the matching web front ends in React and Next.js.
        </p>

        {/* skills */}
        <section>

          <h2 className='text-2xl font-semibold pb-4'>Tools & Technologies I use</h2>
          <div className='flex flex-wrap gap-4 max-w-2xl'>
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
                  <h2 className="font-semibold text-lg text-cyan">
                    {exp.role}
                  </h2>
                  <h5 className="text-sm text-background/60">
                    {exp.company}
                  </h5>
                </div>
                <h6 className='text-sm text-background/40'>{exp.date}</h6>
              </div>
              <p className='text-background/80 font-light leading-relaxed'>{exp.desc}</p>
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
                <h2 className="font-semibold text-lg text-cyan">
                  Bachelor's Degree, Sc
                </h2>
                <h5 className="text-sm text-background/60">
                  KFS University
                </h5>
              </div>
              <h6 className='text-sm text-background/40'>2020 - 2024</h6>
            </div>
            <p className='text-background/80 font-light leading-relaxed'>Bachelor’s degree in Science (Zoology Department) from Kafr El-Sheikh University.</p>
          </div>
        </div>
      </MagicCard>
    </div>
  )
}