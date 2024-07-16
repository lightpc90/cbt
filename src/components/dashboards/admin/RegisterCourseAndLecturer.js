'use client'

import React, { useState } from 'react'
import CourseLayout from './CourseLayout'
import StaffLayout from './StaffLayout'
import StaffForm from './StaffForm'
import toast from 'react-hot-toast'
import { useAppContext } from '@/appContext/appState'
import CourseForm from './CourseForm'



const RegisterCourseAndLecturer = ({ data }) => {
  const {courses, staffs} = useAppContext()
  // const courses = data.courses
  // const staffs = data.staffs

  // UPDATE EXAMNINERS
  const handleExaminerUpdate = () => {

  }

  return (
    <div className='flex justify-around'>
      {/* Registration Container */}
      <div className='w-4/12 h-[7npm 00px] px-5 overflow-auto text-rose-500 bg-slate-900'>
        <CourseForm />
        <hr className='m-8' />
        {/* Lecturer Registration Container */}
        <div className='my-5'>
          <p className='text-gray-500'>Register a Lecturer</p>
          <div className='flex flex-col gap-2'>
            <StaffForm />
            
          </div>
        </div>

      </div>



      {/* Courses and lectures view container */}
      <div className='w-6/12 bg-slate-500 h-[700px] py-2'>

        <p className='bg-rose-800 p-1 text-sm'>Registered Courses</p>
        {/* View Registered Courses container */}
        <div className='bg-white h-[20%] overflow-auto text-black flex gap-2 p-1'>

          {/* list of courses */}
          {courses.map((course, i) => (
            <CourseLayout key={i} course={course} />
          ))}
        </div>
        {/* View Registered Lecturer Container */}
        <p className='bg-rose-800 p-1 text-sm mt-5'>Registered Lecturer</p>
        <div className=' bg-white h-[65%] overflow-auto text-black p-2 gap-3'>
          {/* list of lecturers */}
          {staffs.map((staff, i) => (
            <StaffLayout key={i} staff={staff} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RegisterCourseAndLecturer