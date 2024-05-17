'use client'

import { useEffect, useState } from "react";
import QuestionsComponent from "./QuestionsComponent";
import CourseManagement from "./CourseManagement";
import Result from "./Result";
import { useAppContext } from "@/appContext/appState";
import { useRouter } from "next/navigation";

const Examiner = () => {
  const { getAccessToken, staffsData, currentUserId, setUserData, userData, } = useAppContext()

  const [menu, setMenu] = useState({ 'questionSet': false, 'courseManagement': false, 'result': false })

  // check if user is logged in
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = getAccessToken()
    if (!verify) { router.push('/') }
    console.log("staffs data: ", staffsData)
  }, [])


  
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
            <p>{`Dept: ${userData?.dept}`}</p>
            <p>{`${userData?.staffID}`}</p>
          </div>
          <hr />
          {/* Navigation section */}
          <div className="flex flex-col mt-10 gap-3 ">
            <p className="text-center">Menu Navigation</p>
            <button onClick={() => handleMenuChange('questionSet')} className={`bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white ${menu.questionSet ? `ring-2 ring-rose-800` : ``} `}>
              Set Test Questions
            </button>
            <button onClick={() => handleMenuChange('courseManagement')} className={`bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white ${menu.courseManagement ? `ring-2 ring-rose-800` : ``} `}>
              Manage Courses
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
        {menu.questionSet && <div className="">
          <p className="text-4xl font-bold my-5">Set Test Questions</p>
          <QuestionsComponent />
        </div>}
        {/* Course management subpage */}
        {menu.courseManagement && <div>
          <CourseManagement />
        </div>}
        {/* Result subpage */}
        {menu.result && <div>
          <Result />
        </div>}
        {/* At initial page load when no menu has been selected */}
        {!menu?.courseManagement && !menu?.questionSet && !menu?.result && <div>
          <p>Start by choosing any of your menu button</p>
        </div>}
      </div>
    </div>
  );
};

export default Examiner;
