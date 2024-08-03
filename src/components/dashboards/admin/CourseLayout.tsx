'use client'

import {useState} from 'react'
import CourseEdit from './CourseEdit'

const CourseLayout = ({course}) => {
  const [show, setShow] = useState(false)
  return (
    <div className="bg-slate-800 flex flex-col justify-center items-center ring-2 ring-rose-800 rounded-md shadow-md px-2 text-white gap-1 ">
      {show && <CourseEdit course={course} setShow={setShow} show={show} />}
      <p className='font-bold'>{course.code}</p>
      <button
        onClick={() => setShow(true)}
        className="text-sm ring-1 ring-rose-800 px-1 rounded-md "
      >
        Edit
      </button>
    </div>
  );
}

export default CourseLayout