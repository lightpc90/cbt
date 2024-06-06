import React from "react";
import Test from "@/components/dashboards/test/Test";

async function getAllStaffs() {
  const res = await fetch('http://localhost:3000/api/staff/fetchAllStaffs')

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
  const res = await fetch('http://localhost:3000/api/course/fetchAllCourses')

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

const Page = async () => {
  let data;
  try {
    const [staffs, courses] = await Promise.all([getAllStaffs(), getAllCourses()]);
    console.log("staffs: ", staffs, "& courses: ", courses)
    data = { staffs, courses }
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <Test data={data} />
    </div>
  );
};

export default Page;
