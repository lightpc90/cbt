'use client'

import { useState, useEffect } from "react";
import ManageExam from "./ManageExam";
import RegisterCourseAndLecturer from "./RegisterCourseAndLecturer";
import Result from "./ViewResult";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/appContext/appState";
import { useRouter } from "next/navigation";

const Admin = () => {
  const [menu, setMenu] = useState({ 'registerCourseAndLecturer': false, 'manageExam': false, 'result': false })
  const router = useRouter()
  // const [searchParams, setSearchParams] = useSearchParams({registerCourseAndLecturer: 'false', manageExam: 'false', result: 'false'})
  const {getAccessToken, staffsData, currentUserId, setUserData, userData,} = useAppContext()

  useEffect(() => {
    const verify = getAccessToken()
    console.log("userData: ", userData)

    if (!verify || userData?.admin !== true) { 
      console.log("inside verify: ", verify, "user isAdmin: ", userData?.admin)
      router.push('/') }
    else {console.log("staffs data: ", staffsData)} 
    console.log("outside verify: ", verify, "user isAdmin: ", userData?.admin)
  })

  const handleMenuChange = (menubutton) => {

    menu[menubutton] = true
    for (const key in menu) {
      if (key != menubutton) {
        menu[key] = false
      }
    }
    setMenu({ ...menu })
  }
  return (
    <div className="h-screen bg-slate-900 text-white flex">
      {/* left pane */}
      <div className="w-2/12 flex flex-col bg-slate-950 h-full p-5 justify-between border-r-2">
        <div>
          {/* profile section */}
          <div className="p-2 flex flex-col  mb-10">
            <div className="h-[90px] w-[90px] rounded-full bg-slate-400 mb-5"></div>
            <p>{`${userData?.title} ${userData?.firstname} ${userData?.lastname}`}</p>
            <p>{`${userData?.dept}`}</p>
            <p>{userData?.staffID}</p>
          </div>
          <hr />
          {/* Navigation section */}
          <div className="flex flex-col mt-10 gap-3">
            <button onClick={() => handleMenuChange('registerCourseAndLecturer')} className={`bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white ${menu.registerCourseAndLecturer ? `ring-2 ring-rose-800` : ``} `}>
              Course & Lecturer
            </button>
            <button onClick={() => handleMenuChange('manageExam')} className={`bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white ${menu.manageExam ? `ring-2 ring-rose-800` : ``} `}>
              Manage Exam
            </button>
            <button onClick={() => handleMenuChange('result')} className={`bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white ${menu.result ? `ring-2 ring-rose-800` : ``} `}>
              Results
            </button>
          </div>
        </div>
        {/* logout button */}
        <button className="bg-slate-700 py-1 rounded-md hover:ring-2 hover:ring-white">
          Logout
        </button>
      </div>
      {/* Right Pane */}
      <div className="text-white w-10/12 py-5 px-10 overflow-auto">
        {/* Set Questions Component */}
        {menu.registerCourseAndLecturer && <div className="">
          <RegisterCourseAndLecturer />
        </div>}
        {/* Manage Exam */}
        {menu.manageExam && <div>
          <ManageExam/>
          </div>}
        {/* Result subpage */}
        {menu.result && <div>
          <Result />
        </div>}
      {/* At initial page load when no menu has been selected */}
      { !menu?.registerCourseAndLecturer && !menu?.result && !menu.manageExam && <div>
        <p>Start by choosing any of your menu button</p>
        </div>}
      </div>
    </div>
  );
};

export default Admin;
