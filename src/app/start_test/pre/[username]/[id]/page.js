export const dynamic = "force-dynamic"

import React from 'react'
import Link from 'next/link'

// get list of live exams
async function getLiveCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/fetchLiveCourses`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log('Failed to fetch data')
  }

  const courses = await res.json()
  if (courses.error) {
    console.log("error", courses.error)
  }

  return courses.data
}

const page = async ({ params }) => {

  // use student model id to get the student data
  const studentId = params.id

  const liveCourses = await getLiveCourses()

  console.log("liveCourses: ", liveCourses)

  // get the student data
  const studentData = { _id: '123', firstname: "Gideon", 
    lastname: "Abbey", dept: "Robotics and Mechatronics", 
    level: "100", studentID: "2017/RTM/0923", 
    result: [{ code: '', score: '', }] }

  // TEST DATA
  const liveCourse = liveCourses?.find(course => course.code === 'Gns101')

  // get the live tests data for the student and check if the student hasn't done the exam already
  const liveTestsForTheStudent = liveCourses.length > 0
    && liveCourses.filter(course => course.students.includes(studentData)
      && course.results.some(object => object.studentId === studentData) !== true)

  return (
    <div className='h-screen flex items-center justify-center'>
      {/* student data */}
      <div className='bg-slate-200 text-slate-900 flex flex-col justify-center text-lg p-2 h-[500px] w-[400px] overflow-auto rounded-md shadow-md '>
        <p className='text-center text-rose-800'>Welcome</p>
        <p className='font-bold'>Name: {`${studentData.firstname} ${studentData.lastname}`}</p>
        <p>Dept: {studentData.dept}</p>
        <p>Matric No: {studentData.reg}</p>
        <p>Level: {studentData.level}</p>

      </div >
      {/* list of live courses that the student is offering */}
      <div className='bg-rose-200 text-white  p-2 h-[500px] w-[400px] overflow-auto rounded-md shadow-md '>
        <p className='text-rose-700 mb-2 font-bold'>DO NOT START YOUR EXAM UNTIL YOU ARE TOLD TO DO SO!</p>
        <div className='bg-slate-900 p-3 rounded-md'>
          <p className='font-bold text-rose-500 text-lg'>{liveCourse?.code} Exam</p>
          <p>Session: {liveCourse.question.params.schoolSession}</p>
          <p>No of Questions: {liveCourse.question.questions.length} Questions</p>
          <p >Duration: 30mins</p>
          <p>Exam date: 03/07/2022 </p>
          <p className='mb-5'>Exam time: 14:00</p>
          <Link className=' bg-rose-800 p-2 rounded-md shadow-md hover:bg-rose-500'
            href={`/start_test/test/${liveCourse.code}/${studentData.firstname}_${studentData.lastname}/${studentData.studentID}`}>Start Exam</Link>
        </div>
      </div>
    </div>
  )
}

export default page