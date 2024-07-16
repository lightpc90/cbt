'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

const CourseLayout = ({course}) => {
  const searchParams = useSearchParams()
  const menu = searchParams.get('menu')
  const qstaff = searchParams.get('qstaff')
  const qcourse = searchParams.get('qcourse')
  return (

    <div className='bg-slate-800 flex flex-col px-2 text-white gap-1'>
      <p>{course.code}</p>
      <button className='text-sm ring-1 ring-rose-800 px-1 rounded-md'>Edit</button>
    </div>

  )
}

export default CourseLayout