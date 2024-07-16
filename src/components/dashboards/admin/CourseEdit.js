import React from "react";
import CourseForm from "./CourseForm";

const CourseEdit = ({course, show, setShow}) => {
  return (
    <div className="absolute left-0 right-0 top-0 z-30 bg-slate-900 opacity-[99%] h-full w-full  flex justify-center items-center">
      <div className="bg-slate-200 h-[80%] w-[30%] overflow-auto text-slate-900 p-10">
        <p className="text-2xl font-bold text-center p-2">Edit Course</p>
        <CourseForm course={course} setShow={setShow} show={show} />
      </div>
    </div>
  );
};

export default CourseEdit;
