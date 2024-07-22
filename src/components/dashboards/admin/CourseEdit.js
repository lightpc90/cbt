'use client'

import {useState} from "react";
import CourseForm from "./CourseForm";
import { RiDeleteBinFill } from "react-icons/ri";
import { useAppContext } from "@/appContext/appState";

const CourseEdit = ({course, show, setShow}) => {
  const {setCourse} = useAppContext()
  const [openDeletBox, setOpenDeleteBox] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState("");

  const [isDeleting, setIsDeleting] = useState(false)

   const confirmDeleteInfo = () => {
     return course.code === deleteInfo;
   };

   const handleCourseDeletion = async() => {
    console.log("entering delete function");
    if (confirmDeleteInfo() === false) {
      console.log("wrong input");
      console.log("delete info: ", deleteInfo, "and course code: ", course.code);
      toast.error("incorrect input");
      return;
    }
    try {
      console.log("entering the delete api...");
      setIsDeleting(true);
      const res = await fetch("/api/student/deleteACourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: course._id }),
      });
      const isDeleted = await res.json();
      if (isDeleted.success === false) {
        toast.error(isDeleted.error);
      } else {
        setCourse((prev) =>
          prev.filter((existingCourse) => existingCourse._id !== course._id)
        );
        toast.success(isDeleted.message);
      }
    } catch (err) {
      console.log("Internal Server Error: ", err);
      toast.error("Internal Server Error: try again!");
    } finally {
      setIsDeleting(false);
      //   re-route
    }
   };

  return (
    <div className="absolute left-0 right-0 top-0 z-30 bg-slate-900 opacity-[99%] h-full w-full  flex flex-col justify-center items-center">
      <div className="bg-slate-200 h-[80%] w-[30%] overflow-auto text-slate-900 p-10">
        <p className="text-2xl font-bold text-center p-2">Edit Course</p>
        <CourseForm course={course} setShow={setShow} show={show} />

        {!openDeletBox && (
          <button
            className="flex items-center gap-2 text-rose-800 font-semibold"
            onClick={() => setOpenDeleteBox(true)}
          >
            Delete Course Info <RiDeleteBinFill size={20} />
          </button>
        )}
        {openDeletBox && (
          <div>
            <label>
              <p>
                NB: This action will delete the course entire data. To continue,
                type the course code, {course.code} in the box below and click
                delete
              </p>
              <input
                name="deleteInfo"
                value={deleteInfo}
                onChange={(e) => setDeleteInfo(e.target.value)}
                type="text"
                className="text-slate-800 px-2 p-1 rounded-md"
              />
            </label>
            <div className="space-x-2 mt-3">
              <button
                onClick={handleCourseDeletion}
                className="bg-rose-900 py-1 px-2 hover:bg-rose-700"
              >
                {isDeleting ? `Deleting...` : `Delete Staff`}
              </button>
              <button
                className="border border-rose-900 py-1 px-2 hover:bg-rose-700"
                onClick={() => setOpenDeleteBox(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseEdit;
