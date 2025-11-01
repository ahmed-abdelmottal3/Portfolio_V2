import React from 'react'

export default function Header({title}:{title:string}) {
  return (
      <div className='relative text-3xl font-semibold w-fit mb-4'>
        {title}<span className=' w-2 h-2 bg-blue-500 absolute bottom-2 -right-4 rounded-full'></span>
      </div>  )
}
