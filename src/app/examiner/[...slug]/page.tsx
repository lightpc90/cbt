export const dynamic = "force-dynamic"

import React, { Suspense } from "react";
import Examiner from "@/components/dashboards/examiner/Examiner";



async function getAllStaffs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/staff/fetchAllStaffs`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log('Failed to fetch data')
  }

  const staffs = await res.json()
  if (staffs.success === false) {
    console.log(staffs.error)
  }

  return staffs.data
}

async function getAllCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/fetchAllCourses`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log('Failed to fetch data')
  }

  const courses = await res.json()
  if (courses.success === false) {
    console.log(courses.error)
  }

  return courses.data
}

async function getAllStudents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/fetchAllStudents`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log('Failed to fetch data')
  }

  const students = await res.json()
  if (students.success === false) {
    console.log(students.error)
  }

  return students.data
}


const Page = async() => {
  let data ={};
  try {
    const [staffs, courses, students] = await Promise.all([getAllStaffs(), getAllCourses(), getAllStudents()]);
    console.log("staffs: ", staffs, ">> courses: ", courses, "& students: ", students )
    data = { staffs, courses, students }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Examiner data={data} />
      </Suspense>
    </>
  );
};

export default Page;
