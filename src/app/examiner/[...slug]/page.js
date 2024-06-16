export const dynamic = "force-dynamic"

import React from "react";
import Examiner from "@/components/dashboards/examiner/Examiner";



async function getAllStaffs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/staff/fetchAllStaffs`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const staffs = await res.json()
  if (staffs.error) {
    throw new Error(staffs.error)
  }

  return staffs
}

async function getAllCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/fetchAllCourses`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const courses = await res.json()
  if (courses.error) {
    throw new Error(courses.error)
  }

  return courses
}


const Page = async() => {
  let data;
  try {
    const [staffs, courses] = await Promise.all([getAllStaffs(), getAllCourses()]);
    console.log("staffs: ", staffs, "& courses: ", courses)
    data = { staffs, courses }
  } catch (error) {
    console.error(error);
  }

  return <Examiner data={data}/>;
};

export default Page;
