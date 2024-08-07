"use client";

import { useState, useEffect } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import StaffEdit from "./StaffEdit";
import { ActionCommand, useAppContext } from "@/appContext/appState";

import toast from "react-hot-toast";
import { ICourse } from "@/components/types/types";
import Image from "next/image";

import StaffDP from '../../../../public/image/staffDP.jpg'

const StaffLayout = ({ staff, index }) => {
  const { state, dispatch } = useAppContext();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [tooltipsOpen, setTooltips] = useState(false)

  const firstnameInitial = staff.firstname[0];
  const middlenameInitial = staff.middlename[0];

  const [checkedCourses, setCheckedCourses] = useState({});
  const [allCodes, setAllCodes] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // extract all the course codes in the coursesData object into a list
    const allCourseCodes = state.courses?.map((course: ICourse) => course.code);
    setAllCodes(allCourseCodes);

    // get initial checked courses
    const initialCheckedCourses = allCourseCodes.reduce((acc, item) => {
      acc[item] = staff.courses.includes(item);
      return acc;
    }, {});
    setCheckedCourses(initialCheckedCourses);
  }, [state.courses, staff]);

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
      dispatch({ type: ActionCommand.UPDATE_STAFFS, payload: _res.data });
      console.log("message: ", _res.message);
      toast.success(_res.message);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="text-white w-full">
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
      <div className="flex w-full bg-slate-800 px-2 py-1 text-white items-center justify-between relative my-1 shadow-md ">
        {/* TOOLTIPS */}
        {tooltipsOpen && (
          <div
            className={`bg-white text-slate-800 border-l-4 border-rose-800 rounded-md absolute ${
              index < 5 ? `top-[40px]` : "bottom-[40px]"
            } z-30  shadow-lg px-2 py-5`}
          >
            <div className="flex gap-2">
              <span>{staff?.title}</span>
              <span>{staff?.firstname}</span>
              <span>{staff?.middlename}</span>
              <span className="font-bold">{staff?.lastname}</span>
            </div>
            <p className="text-sm text-slate-500">{staff?.email}</p>
            <p className="text-sm">{staff?.dept} Department</p>
            <p>{staff.tempPwd}</p>
            <p className="text-rose-300">{`| Logged in: ${staff.createdPwd}`}</p>
          </div>
        )}

        {/* staffs info */}
        <div
          className="flex gap-2 justify-center items-center"
          onMouseEnter={() => setTooltips(true)}
          onMouseLeave={() => setTooltips(false)}
        >
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <Image src={StaffDP} width={500} height={500} alt="staff_dp" />
          </div>
          <span>{staff?.title}</span>
          <span>
            {firstnameInitial}.{middlenameInitial}.
          </span>
          <span>{staff.lastname}</span>
        </div>

        {/* update and edit */}
        <div className="flex gap-2">
          {staff?.admin === false ? (
            <>
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
            </>
          ) : (
            //
            <div className="bg-rose-800 text-white py-1 px-5 text-sm rounded-md ring-1 ring-white mr-auto">
              admin
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
