import Link from 'next/link'
import { SpinningText } from '../ui/spinning-text'
import { BsArrowRight } from 'react-icons/bs'

export default function CircularCTA({ title, from, to, href }: { title: string; from: string; to: string; href: string; }) {
  return (
    <section className='overflow-hidden py-25'>
      <div className='flex items-center justify-center gap-17 sm:gap-20'>
        <h2 className='font-great-vibes font-light text-xl sm:text-2xl text-background/50'>{from}</h2>
        <Link href={href} className='relative flex items-center justify-center cursor-pointer group'>
          <div className='absolute w-20 h-20 rounded-full border-2 border-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:border-blue-500'></div>
          <SpinningText
            radius={6}
            className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"
          >
            {title}
          </SpinningText>
          <BsArrowRight
            size={30}
            className='absolute transition-transform duration-500 group-hover:-rotate-45 text-blue-500'
          />
        </Link>
        <h2 className='font-great-vibes font-light text-xl sm:text-2xl text-background/50'>{to}</h2>
      </div>
    </section>
  )
}
