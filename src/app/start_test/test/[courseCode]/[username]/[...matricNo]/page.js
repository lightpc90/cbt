export const dynamic = "force-dynamic"

import React from "react";
import Test from "@/components/dashboards/test/Test";

const student = {_id: '13245', firstname: "Gideon", lastname: "Abbey", dept: "Robotics and Mechatronics", studentID: "2017/RTM/0923"}

// get exam question
async function getExamData(code) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/getExamData?code=${code}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const examData = await res.json()
  if (examData.error) {
    console.log("error fetching examData", examData.error)
  }

  return examData.data
}

const Page = async ({params}) => {
  console.log("first param: ", params.courseCode, "second param: ", params.username, "third param: ", params.matricNo)
  const code = params.courseCode

   // get the student data
   const studentData = student
  let data;
  try {
    const _examData = await getExamData(code);
    console.log("exam data: ", _examData)
    data = { studentData, _examData }
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
