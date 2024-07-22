export const dynamic = "force-dynamic"

import React from "react";
import Test from "@/components/dashboards/test/Test";

// get student info
async function getAStudent(matricNo) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/student/getAStudent?matricNo=${matricNo}`,
    { next: { tags: ["students"] } }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch data");
  }

  const student = await res.json();
  if (student.success === false) {
    console.log(student.error);
  }

  console.log(student.message)
  return student.data;
}

// get exam question
async function getExamData(code) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/getExamData?code=${code}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const examData = await res.json()
  if (examData.error) {
    console.log(examData.error)
  }

  return examData.data
}

const Page = async ({params}) => {
  console.log("first param: ", params.courseCode, "second param: ", params.username, "third param: ", params.matricNo)
  const code = params.courseCode

  let data;
  try {
    const [examData, student] = await Promise.all([
      getExamData(code),
      getAStudent(params.matricNo),
    ]);

    data = { student, examData }
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
