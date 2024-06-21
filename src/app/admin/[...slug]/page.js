export const dynamic = "force-dynamic"

import React from "react";
import Admin from "@/components/dashboards/admin/Admin";


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

  return staffs
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

  return courses
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

  return students
}

export default async function Page() {
  let data;
  try {
    const [staffs, courses, students] = await Promise.all([getAllStaffs(), getAllCourses(), getAllStudents()]);
    console.log("staffs: ", staffs, "& courses: ", courses, "& students ", students)
    data = { staffs, courses, students }
  } catch (error) {
    console.error(error);
  }

  return <div>
    <Admin data={data} />
  </div>;
} 