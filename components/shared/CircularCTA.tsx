import Link from 'next/link'
import React from 'react'
import { SpinningText } from '../ui/spinning-text'
import { BsArrowRight } from 'react-icons/bs'

export default function CircularCTA({title, from, to}:{title:string; from:string; to:string;}) {
  return (
          <section className='overflow-hidden py-15'>
        <div className='flex items-center justify-center gap-20'>
          <h2 className='font-great-vibes font-light text-2xl text-background/50'>{from}</h2>
          <Link href='/projects' className='relative flex items-center justify-center cursor-pointer group'>
            <div className='absolute w-20 h-20 rounded-full border-2 border-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:border-blue-500'></div>
            <SpinningText radius={6} className='opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
              {title}
            </SpinningText>
            <BsArrowRight
              size={30}
              className='absolute transition-transform duration-500 group-hover:-rotate-45 text-blue-500'
            />
          </Link>
          <h2 className='font-great-vibes font-light text-2xl text-background/50'>{to}</h2>
        </div>
      </section>
  )
}
