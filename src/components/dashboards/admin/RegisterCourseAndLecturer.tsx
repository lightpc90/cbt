"use client";

import CourseLayout from "./CourseLayout";
import StaffLayout from "./StaffLayout";
import StaffForm from "./StaffForm";
import { useAppContext } from "@/appContext/appState";
import CourseForm from "./CourseForm";
import { ICourse, IStaff } from "@/components/interfaces/interfaces";
import { useState } from "react";

const RegisterCourseAndLecturer = ({ data, user }) => {
  const { state } = useAppContext();
  // const courses = data.courses
  // const staffs = data.staffs

  enum FormShow {
    COURSE_CREATION_FORM = "COURSE_CREATION_FORM",
    STAFF_CREATION_FORM = "STAFF_CREATION_FORM",
  }

  const [showForm, setShowform] = useState(FormShow.COURSE_CREATION_FORM);

  return (
    <div className="flex justify-around">
      {/* Registration Container */}
      <div className="w-5/12 h-[850px] px-5 overflow-auto text-rose-500 bg-slate-900">
        <p
          onClick={() => setShowform(FormShow.COURSE_CREATION_FORM)}
          className="text-lg text-white ring-1 inline-flex my-1 py-2 px-5 rounded-md hover:bg-slate-800 cursor-pointer"
        >
          Register a Course
        </p>
        {showForm === "COURSE_CREATION_FORM" && <CourseForm />}
        <hr className="mx-8 my-3 opacity-20" />
        {/* Lecturer Registration Container */}
        <div className="">
          <p
            onClick={() => setShowform(FormShow.STAFF_CREATION_FORM)}
            className="text-lg text-white mb-2 ring-1 inline-flex my-1 py-2 px-5 rounded-md hover:bg-slate-800 cursor-pointer"
          >
            Register a Lecturer
          </p>
          <div className="flex flex-col gap-2">
            {showForm === "STAFF_CREATION_FORM" && <StaffForm />}
          </div>
        </div>
      </div>

      {/* Courses and lectures view container */}
      <div className="w-6/12 bg-slate-500 h-[800px] py-2">
        <p className="bg-rose-800 p-1 text-sm">Registered Courses</p>
        {/* View Registered Courses container */}
        <div className="bg-white h-[20%] overflow-auto text-black flex gap-2 p-3">
          {/* list of courses */}
          {state.courses?.map((course: ICourse, i: number) => (
            <CourseLayout key={i} course={course} />
          ))}
        </div>
        {/* View Registered Lecturer Container */}
        <p className="bg-rose-800 p-1 text-sm mt-5">Registered Lecturer</p>
        <div className=" bg-white h-[68%] overflow-auto text-black p-2 gap-3">
          {/* list of lecturers */}
          {state.staffs?.map(
            (staff: IStaff, i: number) =>
              // do not render the current admin with the list of staffs
              user._id !== staff._id && (
                <StaffLayout key={i} staff={staff} user={user} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterCourseAndLecturer;
