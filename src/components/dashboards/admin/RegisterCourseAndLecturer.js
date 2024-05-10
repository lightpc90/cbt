'use client'

import React, { useState } from 'react'
import { Courses } from '@/data/courses'
import { useAppContext } from '@/appContext/appState'

const RegisterCourseAndLecturer = () => {

  const {coursesData, setCoursesData, staffsData, setStaffsData} = useAppContext()
  
  const initialCourseData = { title: '', code: '', dept: '', level: '' }
  const initialStaffData = {firstname: '', middlename: '', lastname: '', email: '', staffSchoolID: '', courses: []}

  const [loading, setLoading] = useState(false)
  const [courseData, setCourseData] = useState(initialCourseData)
  const [staffData, setStaffData] = useState(initialStaffData)

 


  // function to register course
  const handleCourseRegistration = async () => {
    console.log("couseData sent to api: ", courseData)
    setLoading(true)
    // call course creation API
    const res = await fetch("/api/course/createACourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData)
    })
    const _res = await res.json()
    if(_res?.error){
      console.log("error: ", _res.error)
    }
    else if(_res?.success){
      console.log("message: ", _res.message)
      // add the new course to the list of courses in app state
      setCoursesData([...coursesData, _res.data])
    }
    else{
      console.log("failes to make api call")
    }
    setLoading(false)
    setCourseData(initialCourseData)
  }

  // function to register lecturer
  const handleStaffRegistration = async () => {
    console.log("couseData sent to api: ", staffData)
    setLoading(true)
    // call course creation API
    const res = await fetch("/api/staff/createAStaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staffData)
    })
    const _res = await res.json()
    if(_res?.error){
      console.log("error: ", _res.error)
    }
    else if(_res?.success && _res?.message){
      console.log("message: ", _res.message)
      // add the new staff to the list of staffs in app state
      setStaffsData([...staffsData, _res.data])
    }
    else{
      console.log("failes to make api call")
    }
    setLoading(false)
    setCourseData(initialStaffData)
  }

  return (
    <div className='flex justify-around'>
      {/* Registration Container */}
      <div className='w-4/12 h-[7npm 00px] px-5 overflow-auto text-rose-500 bg-slate-900'>
        <div className='my-6'>
          <p className='text-gray-500'>Register a Course</p>
          <div className='flex flex-col gap-2 '>
            <input value={courseData.title} onChange={(e) => setCourseData({ ...courseData, title: e.target.value })} type='text' name='courseTitle' placeholder='Course Title' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={courseData.code} onChange={(e) => setCourseData({ ...courseData, code: e.target.value })} type='text' name='courseCode' placeholder='Course Code' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={courseData.dept} onChange={(e) => setCourseData({ ...courseData, dept: e.target.value })} type='text' name='courseDept' placeholder='Dept' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={courseData.level} onChange={(e) => setCourseData({ ...courseData, level: e.target.value })} type='text' name='courseLevel' placeholder='Level' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <button onClick={handleCourseRegistration} className='bg-rose-800 text-white rounded-md hover:bg-slate-700'>{loading ? `Loading...`: `Register Course`}</button>
          </div>
        </div>
        <hr className='m-8' />
        {/* Lecturer Registration Container */}
        <div className='my-5'>
          <p className='text-gray-500'>Register a Lecturer</p>
          <div className='flex flex-col gap-2'>
            <input value={staffData.firstname} onChange={e=>setStaffData({...staffData, firstname: e.target.value})} type='text' name='firstname' placeholder='First Name' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={staffData.middlename} onChange={e=>setStaffData({...staffData, middlename: e.target.value})} type='text' name='middlename' placeholder='Middle Name' className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={staffData.lastname} onChange={e=>setStaffData({...staffData, lastname: e.target.value})} type='text' name='lastname' placeholder='Last Name' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={staffData.email} onChange={e=>setStaffData({...staffData, email: e.target.value})} type='email' name='email' placeholder='Email' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={staffData.staffSchoolID} onChange={e=>setStaffData({...staffData, staffSchoolID: e.target.value})} type='text' name='staffSchoolID' placeholder='School Staff ID' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            {/* courses button container */}
            <p className='text-sm'>Bind Lecturer to his course(s) by choosing from the list of registered Courses below</p>
            <div className='flex flex-wrap gap-2 my-4'>
              {/* map department here */}
              {Courses.map((course, i) => (
                <button className={`ring-2 ring-blue-800 p-1 text-sm rounded-md hover:bg-rose-800 hover:text-white`} key={i}>{course}</button>
              ))}
            </div>

            <button onClick={handleStaffRegistration} className='bg-rose-700 text-white rounded-md hover:bg-slate-800 '>Register Lecturer</button>
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