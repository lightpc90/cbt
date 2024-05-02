import React from 'react'
import { Courses } from '@/data/courses'

const RegisterCourseAndLecturer = () => {
  return (
    <div className='flex justify-around'>
      {/* Registration Container */}
      <div className='w-4/12 h-[7npm 00px] px-5 overflow-auto text-rose-500 bg-slate-900'>
        <div className='my-6'>
          <p className='text-gray-500'>Register a Course</p>
          <div className='flex flex-col gap-2 '>
            <input type='text' name='courseTitle' placeholder='Course Title' required className='p-1 rounded-md border-b-2 border-b-rose-800 bg-inherit' />
            <input type='text' name='courseCode' placeholder='Course Code' required className='p-1 rounded-md border-b-2 border-b-rose-800 bg-inherit' />
            <button className='bg-slate-700 rounded-md hover:bg-rose-800 hover:text-white'>Register Course</button>
          </div>
        </div>
        <hr className='m-12' />
        {/* Lecturer Registration Container */}
        <div className='my-5'>
          <p className='text-gray-500'>Register a Lecturer</p>
          <div className='flex flex-col gap-2'>
            <input type='text' name='fName' placeholder='First Name' required className='p-1 rounded-md border-b-2 border-b-rose-800 bg-inherit' />
            <input type='text' name='mName' placeholder='Middle Name' className='p-1 rounded-md border-b-2 border-b-rose-800 bg-inherit' />
            <input type='text' name='lName' placeholder='Last Name' required className='p-1 rounded-md border-b-2 border-b-rose-800 bg-inherit' />
            <input type='email' name='lEmail' placeholder='Email' required className='p-1 rounded-md border-b-2 border-b-rose-800 bg-inherit' />
            <input type='text' name='lId' placeholder='Lecturer ID' required className='p-1 rounded-md border-b-2 border-b-rose-800 bg-inherit' />
            {/* courses button container */}
            <p className='text-sm'>Bind Lecturer to his course(s) by choosing from the list of registered Courses below</p>
            <div className='flex flex-wrap gap-2 my-4'>
              {/* map department here */}
              {Courses.map((course, i) => (
                <button className={`ring-2 ring-rose-800 p-1 text-sm rounded-md hover:bg-rose-800 hover:text-white`} key={i}>{course}</button>
              ))}
            </div>

            <button className='bg-slate-700 rounded-md hover:bg-rose-800 hover:text-white'>Register Lecturer</button>
          </div>
        </div>

      </div>



      {/* Courses and lectures view container */}
      <div className='w-6/12 bg-slate-500 h-[700px] py-2'>
        
        <p className='bg-rose-800 p-1 text-sm'>Registered Courses</p>
        {/* View Registered Courses container */}
        <div className='bg-white h-[20%] overflow-auto text-black flex gap-2 p-1'>

          {/* list of courses */}
          <div className='bg-slate-800 flex flex-col px-2 text-white gap-1'>
            <p>Gns101</p>
            <button className='text-sm ring-1 ring-rose-800 px-1 rounded-md'>Delete</button>
          </div>
        </div>
        {/* View Registered Lecturer Container */}
        <p className='bg-rose-800 p-1 text-sm mt-5'>Registered Lecturer</p>
        <div className='bg-white h-[65%] overflow-auto text-black flex flex-wrap gap-2 p-2'>
          {/* list of lecturers */}
          <div className='bg-slate-800 flex-inline flex-col px-2 text-white gap-1'>
            <p>Mr. J. Thomson</p>
            <p>Gns101</p>
            <button className='text-sm ring-1 ring-rose-800 px-1 rounded-md'>Delete</button>
          </div>

          <div className='bg-slate-800 flex-inline flex-col px-2 text-white gap-1'>
            <p>Mr. J. Thomson</p>
            <p>Gns101</p>
            <button className='text-sm ring-1 ring-rose-800 px-1 rounded-md'>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterCourseAndLecturer