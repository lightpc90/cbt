'use client'

import React from 'react'

const ManageExam = ({data}) => {
  const staffsData = data.staffs.data
  const coursesData = data.courses.data
  const published = coursesData.filter((course) => (course.published === true))

  const getStaffs = (courseCode) => {
    const courseStaffs = staffsData.filter((staff) => (staff.courses.includes(courseCode)))
    return courseStaffs
  }

  return (
    <div className=''>
      <p>Manage Examination</p>
      <div className='flex gap-2'>
        {/* Published Questions container */}
        <div className='bg-slate-700 h-[600px] w-[70%] rounded-md overflow-auto'>
          <p className='bg-rose-500 p-1'>Questions</p>
          <div className='h-[80%] overflow-auto flex flex-wrap p-2'>
          {published?.length > 0 ? published?.map((courseData, i) => (
            <div key={i} className='h-[80%] overflow-auto flex flex-wrap p-2'>
              <div className='bg-slate-800 p-1 ring-2 ring-rose-500'>
                <p>{courseData.code}</p>
                <div>{getStaffs(courseData?.code) ? getStaffs(courseData?.code)?.map((staff, i) => (
                  <p key={i}>{`${staff?.title} ${staff.firstname} ${staff?.lastname}`}</p>
                )): `No Staffs Found`}</div>
                <hr className='my-2' />
                <button className='bg-rose-500 hover:bg-slate-500 px-1'>Upload to Exam Portal</button>
              </div>
            </div>)) : `No Published Questions`}
          </div>
        </div>

        {/* live question container */}
        <div className='bg-slate-700 h-[600px] w-[30%] rounded-md overflow-auto'>
          <p className='bg-green-500 p-1'>Uploaded/Live Exams</p>
          {/* list of Questions */}
          <div className='h-[80%] overflow-auto flex flex-wrap p-2'>
            {/* get published questions */}
          {published?.length > 0 ? published?.map((courseData, i) => (
            <div key={i} className='h-[80%] overflow-auto flex flex-wrap p-2'>
              {/* get published questions that are live at portal */}
              {courseData.live && <div className='bg-slate-800 p-1 ring-2 ring-rose-500'>
                <p>{courseData.code}</p>
                <div>{getStaffs(courseData?.code) ? getStaffs(courseData?.code)?.map((staff, i) => (
                  <p key={i}>{`${staff?.title} ${staff.firstname} ${staff?.lastname}`}</p>
                )): `No Staffs Found`}</div>
                <hr className='my-2' />
                <button className='bg-rose-500 hover:bg-slate-500 px-1'>Pull Down</button>
              </div>}
              
            </div>)) : `No Ongoing Exams`}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ManageExam