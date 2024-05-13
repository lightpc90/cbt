'use client'

import React, { useState } from 'react'
import { Courses } from '@/data/courses'
import { useAppContext } from '@/appContext/appState'
import CourseLayout from './CourseLayout'
import StaffLayout from './StaffLayout'

const RegisterCourseAndLecturer = () => {

  const { coursesData, setCoursesData, staffsData, setStaffsData } = useAppContext()

  const initialCourseData = { title: '', code: '', dept: '', level: '' }
  const initialStaffData = { firstname: '', middlename: '', lastname: '', email: '', staffSchoolID: '', tempPwd: '', courses: [] }

  const [loadingCourse, setLoadingCourse] = useState(false)
  const [loadingStaff, setLoadingStaff] = useState(false)
  const [courseData, setCourseData] = useState(initialCourseData)
  const [staffData, setStaffData] = useState(initialStaffData)




  // function to register course
  const handleCourseRegistration = async () => {
    console.log("couseData sent to api: ", courseData)
    setLoadingCourse(true)
    // call course creation API
    const res = await fetch("/api/course/createACourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData)
    })
    const _res = await res.json()
    if (_res?.error) {
      console.log("error: ", _res.error)
    }
    else if (_res?.success) {
      console.log("message: ", _res.message)
      // add the new course to the list of courses in app state
      setCoursesData([...coursesData, _res.data])
    }
    else {
      console.log("failes to make api call")
    }
    setLoadingCourse(false)
    setCourseData(initialCourseData)
  }

  let tempPwd;

  // temp pasword generating funtion
  const genTempPassword = (data) => {
    // function to randomly pick a letter from a name
    function pickRandomLetter(name) {
      // Check if the name is not empty
      if (name.length === 0) {
        console.log("name is empty")
        return "Name is empty";
      }
      // Generate a random index within the range of the string length
      const randomIndex = Math.floor(Math.random() * name.length);
      // Return the letter at the random index
      return name[randomIndex];
    }
    // generate random numbers
    function generateSixDigits() {
      // Generate a random number between 100000 (inclusive) and 999999 (inclusive)
      const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      return randomNumber;
    }

    const tempPassword = `${pickRandomLetter(data.firstname)}${pickRandomLetter(data.lastname)}-${generateSixDigits()}`
    console.log("generated password: ", tempPassword)
    tempPwd = tempPassword
  }

  // function to register lecturer
  const handleStaffRegistration = async () => {
    // run a validation function here!

    // 
    setLoadingStaff(true)

    // function to generate temporary password
    genTempPassword(staffData)
   
    // call course creation API
    const res = await fetch("/api/staff/createAStaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...staffData, tempPwd: tempPwd})
    })
    const _res = await res.json()
    if (_res?.error) {
      console.log("error: ", _res.error)
    }
    else if (_res?.success && _res?.message) {
      console.log("message: ", _res.message)
      // add the new staff to the list of staffs in app state
      // setStaffsData([...staffsData, _res.data])
      setStaffsData((prevData)=>{return [...prevData, _res.data]})
    }
    else {
      console.log("failes to make api call")
    }
    setLoadingStaff(false)
    setStaffData(initialStaffData)
  }

  const bindCoursesToStaff=(course)=>{
    // if code is included in the staff already, remove it
    const existingCourses = staffData.courses
    console.log("staff courses: ", existingCourses)
    if(existingCourses.includes(course.code)){
      const indexToRemove = existingCourses.indexOf(course.code)
      if(indexToRemove !== -1){existingCourses.splice(indexToRemove, 1)}
      // setStaffData({...staffData, courses: [existingCourses]})
      setStaffData(prevData=>{return{...prevData, courses: existingCourses }})
    }
    else{
      // setStaffData({...staffData, courses: [...existingCourses, course.code]})
      setStaffData(prevData=>{return{...prevData, courses: [...existingCourses, course.code] }})
    }
    console.log("updated staff courses: ", staffData)
    
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
            <button onClick={handleCourseRegistration} className='bg-rose-800 text-white rounded-md hover:bg-slate-700'>{loadingCourse ? `Loading...` : `Register Course`}</button>
          </div>
        </div>
        <hr className='m-8' />
        {/* Lecturer Registration Container */}
        <div className='my-5'>
          <p className='text-gray-500'>Register a Lecturer</p>
          <div className='flex flex-col gap-2'>
            <input value={staffData.firstname} onChange={e => setStaffData({ ...staffData, firstname: e.target.value })} type='text' name='firstname' placeholder='First Name' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={staffData.middlename} onChange={e => setStaffData({ ...staffData, middlename: e.target.value })} type='text' name='middlename' placeholder='Middle Name' className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={staffData.lastname} onChange={e => setStaffData({ ...staffData, lastname: e.target.value })} type='text' name='lastname' placeholder='Last Name' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={staffData.email} onChange={e => setStaffData({ ...staffData, email: e.target.value })} type='email' name='email' placeholder='Email' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            <input value={staffData.staffSchoolID} onChange={e => setStaffData({ ...staffData, staffSchoolID: e.target.value })} type='text' name='staffSchoolID' placeholder='School Staff ID' required className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit' />
            {/* courses button container */}
            <p className='text-sm'>Bind Lecturer to his course(s) by choosing from the list of registered Courses below</p>
            <div className='flex flex-wrap gap-2 my-4'>
              {/* map department here */}
              {coursesData.map((course, i) => (
                <button onClick={()=>bindCoursesToStaff(course)} className={`ring-2 ring-blue-800 ${staffData.courses.includes(course.code) ? `bg-green-900 text-white`: ``} p-1 text-sm rounded-md hover:bg-rose-800 hover:text-white`} key={i}>{course.code}</button>
              ))}
            </div>

            <button onClick={handleStaffRegistration} className='bg-rose-700 text-white rounded-md hover:bg-slate-800 '>{loadingStaff ? `Loading...`:`Register Lecturer`}</button>
          </div>
        </div>

      </div>



      {/* Courses and lectures view container */}
      <div className='w-6/12 bg-slate-500 h-[700px] py-2'>

        <p className='bg-rose-800 p-1 text-sm'>Registered Courses</p>
        {/* View Registered Courses container */}
        <div className='bg-white h-[20%] overflow-auto text-black flex gap-2 p-1'>

          {/* list of courses */}
         {coursesData.map((course, i)=>(
          <CourseLayout key={i} course={course} />
         ))}
        </div>
        {/* View Registered Lecturer Container */}
        <p className='bg-rose-800 p-1 text-sm mt-5'>Registered Lecturer</p>
        <div className=' bg-white h-[65%] overflow-auto text-black p-2 gap-3'>
          {/* list of lecturers */}
        {staffsData.map((staff, i)=>(
          <StaffLayout key={i} staff={staff}/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default RegisterCourseAndLecturer