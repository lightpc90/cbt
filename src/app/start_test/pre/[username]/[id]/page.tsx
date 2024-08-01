export const dynamic = "force-dynamic"

import React from 'react'
import Link from 'next/link'
import Logout from '@/components/logout/Logout'

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

const getAStudent = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/getAStudent?id=${id}`)

  if (!res.ok) {
    console.log('api failed')
  }

  const student = await res.json()
  if (student.success === false) {
    console.log(student.error)
  }
  return student.data
}

const page = async ({ params }) => {

  // use student model id to get the student data
  const studentId = params.id

  const [studentInfo, liveCourses] = await Promise.all([getAStudent(studentId), getLiveCourses()])

  console.log("logged in student: ", studentInfo, "& liveCourses: ", liveCourses)

  // get the live tests data for the student and check if the student hasn't done the exam already
  const liveTestsForTheStudent = liveCourses?.length > 0
    && liveCourses?.filter(course => studentInfo?.courses.includes(course.code)
    )

  return (
    <div className="h-screen flex items-center justify-center">
      {/* student data */}
      <div className="bg-slate-200 text-slate-900 flex flex-col justify-center text-lg p-2 h-[500px] w-[400px] overflow-auto rounded-md shadow-md ">
        <p className="text-center text-rose-800">Welcome</p>
        <p className="font-bold">
          Name: {`${studentInfo?.firstname} ${studentInfo.middlename} ${studentInfo?.lastname}`}
        </p>
        <p>Dept: {studentInfo?.dept}</p>
        <p>Matric No: {studentInfo?.matricNo}</p>
        {/* <p>Level: {studentInfo?.level}</p> */}
      </div>
      {/* list of live courses that the student is offering */}
      <div className="bg-rose-200 text-white  p-2 h-[500px] w-[400px] overflow-auto rounded-md shadow-md ">
        {liveTestsForTheStudent.length > 0 && (
          <p className="text-rose-700 mb-2 font-bold">
            DO NOT START YOUR EXAM UNTIL YOU ARE TOLD TO DO SO!
          </p>
        )}

        {liveTestsForTheStudent.length > 0 ? (
          liveTestsForTheStudent.map((liveCourse, i) => (
            <div key={i} className="bg-slate-900 p-3 rounded-md">
              <p className="font-bold text-rose-500 text-lg">
                {liveCourse?.code} Exam
              </p>
              <p>Session: {liveCourse.question.params.schoolSession}</p>
              <p>
                No of Questions: {liveCourse.question.questions.length}{" "}
                Questions
              </p>
              <p>Duration: {liveCourse.question.params.testMinDuration}Mins</p>
              <p>
                Exam date:{" "}
                {liveCourse.question.params.dateAndTime.split("T")[0]}{" "}
              </p>
              <p className="mb-5">
                Exam time:{" "}
                {liveCourse.question.params.dateAndTime.split("T")[1]}
              </p>
              <Link
                className=" bg-rose-800 p-2 rounded-md shadow-md hover:bg-rose-500"
                href={`/start_test/test/${liveCourse.code}/${studentInfo.firstname}_${studentInfo.lastname}/${studentInfo.matricNo}`}
              >
                Start Exam
              </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center h-full text-lg font-bold text-slate-800">
            <p className="">No Exam for you at the moment</p>
            <p></p>
            <Logout/>
          </div>
        )}
      </div>
    </div>
  );
}

export default page