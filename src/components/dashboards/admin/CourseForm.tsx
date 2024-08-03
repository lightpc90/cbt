"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ActionCommand, useAppContext } from "@/appContext/appState";
import toast from "react-hot-toast";
import { ICourse } from '../../interfaces/interfaces';

type FormUpdateProps = {course?:ICourse; setShow?:Dispatch<SetStateAction<boolean>>; show?:boolean}


const CourseForm = ({ course, setShow, show=false }:FormUpdateProps) => {
  const { dispatch } = useAppContext();

  // form data initialization
  const initialCourseData = { title: "", code: "", dept: "", level: "" };
  const updateInitialCourse = {
    title: course?.title,
    code: course?.code,
    dept: course?.dept,
    level: course?.level,
  };
  // loading state
  const [registering, setRegistering] = useState(false);
  const [updating, setUpdating] = useState(false);
  //   form data
  const [courseData, setCourseData] = useState(show? updateInitialCourse : initialCourseData);

  // const updatedList=(prev, newData)=>{
  //   return prev.map((eachExistingCourse)=>(
  //     eachExistingCourse._id === newData._id ? newData : eachExistingCourse
  //   ))
  // }

  // function to register course
  const handleCourseRegistration = async () => {
    console.log("couseData sent to api: ", courseData);
    setRegistering(true);
    // call course creation API
    const res = await fetch("/api/course/createACourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });
    if (!res.ok) {
      console.log("failed to make api call");
      toast.error("failed to make api call");
      setRegistering(false);
      return;
    }
    const _res = await res.json();

    if (_res?.error) {
      console.log("error: ", _res.error);
      toast.error(_res.error);
    } else if (_res?.success) {
      console.log("message: ", _res.message);
      // add the new course to the list of courses in app state
      dispatch({type: ActionCommand.SET_COURSES, payload: _res.data})
      toast.success(_res.message);
    }
    setCourseData(initialCourseData);
    setRegistering(false);
  };

  // FUNCTIONS USED IN EDITING MODE
  // course update function
  const handleCourseUpdate=async()=>{
    // call course creation API
    setUpdating(true)
    const res = await fetch("/api/course/updateACourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id: course._id, update: courseData}),
    });
    if (!res.ok) {
      console.log("failed to make api call");
      toast.error("failed to make api call");
      setUpdating(false);
      return;
    }
    const _res = await res.json();

    if (_res?.success === false) {
      console.log("error: ", _res.error);
      toast.error(_res.error);
    } else if (_res?.success === true) {
      console.log("message: ", _res.message);
      // add the new course to the list of courses in app state
      dispatch({type: ActionCommand.UPDATE_COURSES, payload: _res.data})
      toast.success(_res.message);
      setShow(false)
    }
    setUpdating(false)
  }

  return (
    <div>
      <div className="my-6">
        <div className="flex flex-col gap-2 ">
          <label htmlFor="courseTitle" className="text-sm">
            Course Title
          </label>
          <input
            value={courseData.title}
            onChange={(e) =>
              setCourseData({ ...courseData, title: e.target.value })
            }
            type="text"
            name="courseTitle"
            placeholder="Introduction to Calculus"
            required
            className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
          />
          <label htmlFor="courseCode" className="text-sm">
            Course Code
          </label>
          <input
            value={courseData.code}
            onChange={(e) =>
              setCourseData({ ...courseData, code: e.target.value })
            }
            type="text"
            name="courseCode"
            placeholder="MTS101"
            required
            className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
          />
          <label htmlFor="courseDept" className="text-sm">
            Department
          </label>
          <input
            value={courseData.dept}
            onChange={(e) =>
              setCourseData({ ...courseData, dept: e.target.value })
            }
            type="text"
            name="courseDept"
            placeholder="Mathematics"
            required
            className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
          />
          <label htmlFor="courseDept" className="text-sm">
            Level
          </label>
          <input
            value={courseData.level}
            onChange={(e) =>
              setCourseData({ ...courseData, level: e.target.value })
            }
            type="text"
            name="courseLevel"
            placeholder="100"
            required
            className="p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit"
          />
          {show ? (
            //   button for course update
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCourseUpdate}
                className="bg-rose-800 text-white rounded-md hover:bg-slate-700 py-1 px-2"
              >
                {updating ? `Updating...` : `Update Course`}
              </button>
              <button
                onClick={() => setShow(false)}
                className="bg-rose-800 text-white rounded-md hover:bg-slate-700 py-1 px-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            //   button for course registration
            <button
              onClick={handleCourseRegistration}
              className="bg-rose-800 text-white rounded-md hover:bg-slate-700"
            >
              {registering ? `Registering...` : `Register Course`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
