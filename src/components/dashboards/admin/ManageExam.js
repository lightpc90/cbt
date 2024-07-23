'use client'

import React from 'react'
import { useAppContext } from '@/appContext/appState'
import toast from 'react-hot-toast'

import { MdDateRange } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { updatedList } from '@/UtilityFunctions/updatedList';

const ManageExam = ({data}) => {
  const {staffs, setCourses} = useAppContext()
  const staffsData = data.staffs
  const coursesData = data.courses
  const published = coursesData.filter((course) => (course.published === true))

  const getStaffs = (courseCode) => {
    const courseStaffs = staffsData.filter((staff) => (staff.courses.includes(courseCode)))
    return courseStaffs
  }

  const uploadOrPullDownExamQuestion=async(_id, option)=>{
    const res = await fetch('/api/course/updateACourse', {
      method: 'POST',
      body: JSON.stringify({_id, update:{live: option}})
    })

    if(!res.ok){
      toast.error("Failed! Try again")
      return
    }
    const uploaded = await res.json()
    if(uploaded.success === false){
      toast.error(uploaded.error)
    }
    else if(uploaded.success === true ){
      setCourses((prev) => updatedList(prev, uploaded.data));
      toast.success(uploaded.message)

    }

  }

  return (
    <div className="">
      <p className="text-2xl font-bold mb-3">Manage Examination Portal</p>
      <div className="flex gap-2">
        {/* Published Questions container */}
        <div className="bg-slate-700 h-[600px] w-[70%] rounded-md overflow-auto">
          <p className="bg-rose-500 p-1">Questions</p>
          <div className="h-[80%] overflow-auto flex flex-wrap p-2">
            {published?.length > 0
              ? published?.map(
                  (courseData, i) =>
                    courseData.live === false && (
                      <div
                        key={i}
                        className="h-[80%] overflow-auto flex flex-wrap p-2"
                      >
                        <div className="bg-slate-800 p-3 ring-2 ring-rose-500 rounded-md shadow-md">
                          <div className="flex flex-wrap gap-2">
                            <p className="font-bold">Course:</p>
                            <p className="text-slate-300">{courseData.code}</p>
                          </div>
                          <p className="font-bold mt-2">Course Lecturers</p>
                          <div>
                            {getStaffs(courseData?.code)
                              ? getStaffs(courseData?.code)?.map((staff, i) => (
                                  <p
                                    key={i}
                                  >{`${staff?.title} ${staff.firstname} ${staff?.lastname}`}</p>
                                ))
                              : `No Staffs Found`}
                          </div>
                          <hr className="my-2" />
                          <div className="mb-3">
                            <span className="flex flex-wrap gap-2">
                              <p className="text-slate-500">
                                <MdDateRange size={25} />
                              </p>

                              {
                                courseData.question.params.dateAndTime.split(
                                  "T"
                                )[0]
                              }
                            </span>
                            <span className="flex flex-wrap gap-2">
                              <p className="text-slate-500">
                                <IoTimeSharp size={25} />
                              </p>
                              {
                                courseData.question.params.dateAndTime.split(
                                  "T"
                                )[1]
                              }
                            </span>
                            <span className="flex flex-wrap gap-2">
                              <p className="text-slate-500">Exam Duration:</p>
                              <p>
                                {courseData.question.params.testMinDuration}mins
                              </p>
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              uploadOrPullDownExamQuestion(courseData._id, true)
                            }
                            className="bg-rose-500 hover:bg-slate-500 px-1"
                          >
                            Upload to Exam Portal
                          </button>
                        </div>
                      </div>
                    )
                )
              : `No Published Questions`}
          </div>
        </div>

        {/* live question container */}
        <div className="bg-slate-700 h-[600px] w-[30%] rounded-md overflow-auto">
          <p className="bg-green-500 p-1">Uploaded/Live Exams</p>
          {/* list of Questions */}
          <div className="h-[80%] overflow-auto flex flex-wrap p-2">
            {/* get published questions */}
            {published?.length > 0
              ? published?.map((courseData, i) => (
                  <div
                    key={i}
                    className="h-[80%] overflow-auto flex flex-wrap p-2"
                  >
                    {/* get published questions that are live at portal */}
                    {courseData.live && (
                      <div className="bg-slate-800 p-3 ring-2 ring-green-500 rounded-md shadow-md">
                        <div className="flex flex-wrap gap-2">
                          <p className="font-bold">Course:</p>
                          <p className="text-slate-300">{courseData.code}</p>
                        </div>
                        <p className="font-bold mt-2">Course Lecturers</p>
                        <div className="text-slate-300">
                          {getStaffs(courseData?.code)
                            ? getStaffs(courseData?.code)?.map((staff, i) => (
                                <p
                                  key={i}
                                >{`${staff?.title} ${staff.firstname} ${staff?.lastname}`}</p>
                              ))
                            : `No Staffs Found`}
                        </div>
                        <hr className="my-2" />
                        <div className="mb-3">
                          <span className="flex flex-wrap gap-2">
                            <p className="text-slate-500">
                              <MdDateRange size={25} />
                            </p>

                            {
                              courseData.question.params.dateAndTime.split(
                                "T"
                              )[0]
                            }
                          </span>
                          <span className="flex flex-wrap gap-2">
                            <p className="text-slate-500">
                              <IoTimeSharp size={25} />
                            </p>
                            {
                              courseData.question.params.dateAndTime.split(
                                "T"
                              )[1]
                            }
                          </span>
                          <span className="flex flex-wrap gap-2">
                            <p className="text-slate-500">Exam Duration:</p>
                            <p>
                              {courseData.question.params.testMinDuration}mins
                            </p>
                          </span>
                        </div>
                        <button
                          onClick={() => uploadOrPullDownExamQuestion(courseData._id, false)}
                          className="bg-rose-500 hover:bg-slate-500 px-1 flex"
                        >
                          Pull Down
                        </button>
                      </div>
                    )}
                  </div>
                ))
              : `No Ongoing Exams`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageExam