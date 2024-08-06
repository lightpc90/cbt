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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { iStaff } from "@/components/InitialData/initialData";

const menuVariants = [
  { menu: `course_and_staff`, name: `Course and Staff` },
  { menu: `exam_management`, name: `Exam Management` },
  { menu: `student_management`, name: `Student Management` },
  { menu: `result`, name: `Result` },
];

const Admin = ({ data }) => {
  const searchParams = useSearchParams();
  const selectedMenu = searchParams.get("menu");
  const { currentUserId, setUserData, dispatch } = useAppContext();

  const router = useRouter();

  const [user, setUser] = useState<IStaff>();  

  useEffect(() => {
    console.log("passing data to the states...");
    dispatch({ type: ActionCommand.SET_STAFFS, payload: data.staffs });
    dispatch({ type: ActionCommand.SET_COURSES, payload: data.courses });
    dispatch({ type: ActionCommand.SET_STUDENTS, payload: data.students });
    console.log("done passing data to the states...");
    const userInfo = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {};
    console.log("user?: ", userInfo);

    setUser(userInfo);
  }, [currentUserId]);

  const signOut = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (!response.ok) {
      return;
    }
    const loggedOut = await response.json();
    if (loggedOut.success) {
      router.push("/");
      toast.success(loggedOut.message);
    }
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("userData");
    setUserData(iStaff);
  };

  return (
    <div className="h-screen bg-slate-900 text-white flex">
      {/* left pane */}
      <div className="w-2/12 flex flex-col bg-slate-950 h-full p-5 justify-between border-r-2">
        <div>
          {/* profile section */}
          <div className="p-2 flex flex-col  mb-10">
            {/* Staff Display Picture */}
            <div className="h-[90px] w-[90px] rounded-full bg-slate-400 mb-5 overflow-auto flex justify-center items-center ">
              <Image
                src={`/image/studentDP.jpg`}
                alt="studentDP"
                width={200}
                height={200}
              />
            </div>
            <p>Administrator</p>
            <p>{`${user?.title} ${user?.firstname} ${user?.lastname}`}</p>
            <p>{`${user?.dept}`}</p>
            <p>{user?.staffID}</p>
          </div>
          <hr />
          {/* Navigation section */}
          <div className="flex flex-col mt-10 gap-3">
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
          <button
            onClick={signOut}
            className="bg-slate-700 py-1 rounded-md hover:ring-2 hover:ring-white"
          >
            Logout
          </button>
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
            <div>
              <p>Start by choosing any of your menu button</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Admin;
