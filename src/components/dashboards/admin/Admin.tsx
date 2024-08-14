"use client";

import { useState, useEffect } from "react";
import ManageExam from "./ManageExam";
import RegisterCourseAndLecturer from "./RegisterCourseAndLecturer";
import ViewResult from "./ViewResult";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ActionCommand, useAppContext } from "@/appContext/appState";
import Image from "next/image";
import ManageStudent from "./ManageStudent";
import { IStaff } from "@/components/types/types";
import { SignOut } from "@/components/ui/SignOut";
import { BsMenuUp } from "react-icons/bs";

import menuBg from '../../../../public/image/admin_menu_ani.png'
import styles from './admin.module.css'

const menuVariants = [
  { menu: `course_and_staff`, name: `Course and Staff` },
  { menu: `exam_management`, name: `Exam Management` },
  { menu: `student_management`, name: `Student Management` },
  { menu: `result`, name: `Result` },
];

const Admin = ({ data }) => {
  const searchParams = useSearchParams();
  const selectedMenu = searchParams.get("menu");
  const { currentUserId, dispatch} = useAppContext();

  const [user, setUser] = useState<IStaff>();  

  useEffect(() => {
    console.log("passing data to the states...");
    console.log("data being passed: ", data.staffs, data.courses, data.students)
    dispatch({ type: ActionCommand.SET_STAFFS, payload: data.staffs });
    dispatch({ type: ActionCommand.SET_COURSES, payload: data.courses });
    dispatch({ type: ActionCommand.SET_STUDENTS, payload: data.students });
    console.log("done passing data to the states...");
    const userInfo = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {};
    console.log("user?: ", userInfo);

    setUser(userInfo);
  }, [currentUserId, data.courses, data.staffs, data.students, dispatch]);


  return (
    <div className="h-screen bg-slate-900 text-white flex">
      {/* left pane */}
      <div className="w-2/12 flex flex-col bg-slate-950 h-full p-5 lg:p-2 justify-between border-r-2 overflow-auto">
        <div>
          {/* profile section */}
          <div className="p-2 flex flex-col mb-10 lg:mb-4">
            {/* Staff Display Picture */}
            <div className="h-[90px] w-[90px] rounded-full bg-slate-400 mb-5 overflow-hidden flex justify-center items-center ">
              <Image
                src={`/image/studentDP.jpg`}
                alt="studentDP"
                width={200}
                height={200}
                priority
              />
            </div>
            <p className="bg-slate-800 px-2 text-center rounded-md">Administrator</p>
            <p className="font-bold">{`${user?.title} ${user?.firstname[0]}.${user?.middlename[0]}. ${user?.lastname}`}</p>
            <p className="text-sm text-slate-400">{user?.email}</p>
            <p className="text-sm text-slate-400">{`Dept: ${user?.dept}`}</p>
            <p className="text-sm text-slate-400">{`${user?.staffID}`}</p>
          </div>
          <hr />
          {/* Navigation section */}
          <div className="flex flex-col mt-10 lg:mt-4 gap-3">
            <span className="flex gap-2 items-center text-slate-400 justify-center">
              <p className="text-center font-bold">Menu Navigation</p>
              <BsMenuUp size={30} />
            </span>
            {menuVariants.map(({ menu, name }, i) => (
              <Link
                key={i}
                href={`?${new URLSearchParams({
                  menu,
                })}`}
                className={`text-center bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white ${
                  selectedMenu == menu ? `ring-2 ring-rose-800` : ``
                } `}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="border-2 border-slate-900 rounded-md px-2 py-1 shadow-md">
            Settings
          </button>
          {/* logout button */}
          <SignOut />
        </div>
      </div>

      {/* Right Pane */}
      <div className="text-white w-10/12 py-5 px-10 overflow-auto">
        {/* Set Questions Component */}
        {selectedMenu == `course_and_staff` && (
          <div className="">
            <RegisterCourseAndLecturer data={data} user={user} />
          </div>
        )}
        {/* Manage Exam */}
        {selectedMenu == `exam_management` && (
          <div>
            <ManageExam data={data} />
          </div>
        )}
        {/* manage Students */}
        {selectedMenu == `student_management` && (
          <div>
            <ManageStudent data={data} />
          </div>
        )}
        {/* Result subpage */}
        {selectedMenu == `result` && (
          <div>
            <ViewResult userInfo={user} data={data} />
          </div>
        )}
        {/* At initial page load when no menu has been selected */}
        {selectedMenu != `course_and_staff` &&
          selectedMenu != `exam_management` &&
          selectedMenu != `student_management` &&
          selectedMenu != `result` && (
            <div className="relative h-full">
              <p>Start by choosing any of your menu button</p>
              {/* <Image alt="" src={menuBg} className={` ${styles.moveImg}`} /> */}
            </div>
          )}
      </div>
    </div>
  );
};

export default Admin;
