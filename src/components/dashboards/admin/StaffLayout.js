"use client";

import { useState, useEffect } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import StaffEdit from "./StaffEdit";
import { useAppContext } from "@/appContext/appState";

import toast from "react-hot-toast";

const StaffLayout = ({ staff, user }) => {
  
  const { courses } = useAppContext();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const firstnameInitial = staff.firstname[0];

  const [checkedCourses, setCheckedCourses] = useState({});
  const [allCodes, setAllCodes] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // extract all the course codes in the coursesData object into a list
    const allCourseCodes = courses?.map((course) => course.code);
    setAllCodes(allCourseCodes);

    // get initial checked courses
    const initialCheckedCourses = allCourseCodes.reduce((acc, item) => {
      acc[item] = staff.courses.includes(item);
      return acc;
    }, {});
    setCheckedCourses(initialCheckedCourses);
  }, [courses, staff]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedCourses((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  
  

  const handleUpdateCourse = async () => {
    setLoading(true);
    const trueKeys = Object.keys(checkedCourses).filter(
      (key) => checkedCourses[key]
    );
    console.log("updated course codes: ", trueKeys);
    // call staff update api
    const res = await fetch("/api/staff/updateAStaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: staff._id, update: { courses: trueKeys } }),
    });
    if (res.ok === false) {
      console.log("failed to make api call");
      setLoading(false);
      toast.error("failed api call");
      return;
    }
    // handle return data
    const _res = await res.json();
    if (_res.success === false) {
      console.log("error: ", _res.error);
      toast.error(_res.error);
    } else if (_res.success === true) {
      console.log("message: ", _res.message);
      toast.success(_res.message);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="flex bg-slate-800 px-2 py-1 text-white justify-between my-1 ">
      {/* Editing component: it displays only when enabled */}
      {isEditing && (
        <div className="absolute right-0 top-0 w-full h-full flex justify-center items-center bg-slate-700 opacity-[99%]  z-40">
          <StaffEdit
            staff={staff}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      )}

      {/* when not editing */}
      <div className="flex gap-2">
        <p className="font-bold">{`${firstnameInitial}. ${staff.lastname}`}</p>
        <p className="text-rose-600">{staff.tempPwd}</p>
        <p className="text-rose-300">{`| Logged in: ${staff.createdPwd}`}</p>
      </div>
      <div className="flex gap-2 justify-center items-center">
        {/* Update course */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center text-sm ring-1 ring-rose-800 px-2 rounded-md"
          >
            Update Course
            <span>
              {!open ? (
                <HiChevronRight size={30} />
              ) : (
                <HiChevronDown size={30} />
              )}
            </span>
          </button>
          {open && (
            <div className="bg-rose-600 p-1 absolute right-0 w-full z-20">
              {allCodes.map((code, i) => (
                <div key={i} className="">
                  <label className="flex gap-1">
                    {code}
                    <input
                      type="checkbox"
                      name={code}
                      checked={checkedCourses[code]}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <hr />
                </div>
              ))}
              {allCodes.length > 0 && (
                <button
                  onClick={handleUpdateCourse}
                  className="bg-slate-800 p-1 mt-5"
                >
                  {loading ? `loading..` : `Update!`}
                </button>
              )}
            </div>
          )}
        </div>
        {/* edit button */}
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 border px-2 py-1 rounded-md  hover:bg-slate-300  hover:text-slate-900"
        >
          Edit <FaEdit size={20} />
        </button>
      </div>
    </div>
  );
};

export default StaffLayout;
