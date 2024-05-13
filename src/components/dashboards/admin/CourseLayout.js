import React from 'react'

const CourseLayout = ({course}) => {
  return (

    <div className='bg-slate-800 flex flex-col px-2 text-white gap-1'>
      <p>{course.code}</p>
      <button className='text-sm ring-1 ring-rose-800 px-1 rounded-md'>Edit</button>
    </div>

  )
}

export default CourseLayout