'use client'

import { useEffect, useState } from "react";
import QuestionsComponent from "./QuestionsComponent";
import CourseManagement from "./CourseManagement";
import Result from "./Result";
import { useAppContext } from "@/appContext/appState";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const menuVariants = [
  { menu: `set_test_questions`, name: `Set Test Questions` },
  { menu: `manage_courses`, name: `Manage Courses` },
  { menu: `results`, name: `Results` },
]

// data arg comes from examiner page, server fetching 
const Examiner = ({ data }) => {
  const searchParams = useSearchParams()
  const { currentUserId, signOut, setCourses, setStaffs, setStudents } =
    useAppContext();

  const [menu, setMenu] = useState({ 'questionSet': false, 'courseManagement': false, 'result': false })
  const [user, setUser] = useState({})

  const selectedMenu = searchParams.get('menu')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCourses(data.courses)
    setStaffs(data.staffs)
    setStudents(data.students)
    const userInfo = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem('userData')) : ''
    console.log("userInfo: ", userInfo)

    setUser(userInfo)
  }, [currentUserId])



  // const handleMenuChange = (menubutton) => {
  //   menu[menubutton] = true
  //   for (const key in menu) {
  //     if (key != menubutton) {
  //       menu[key] = false
  //     }
  //   }
  //   setMenu({ ...menu })
  // }


  return (
    <div className="h-screen bg-slate-900 text-white flex">
      {/* left pane */}
      <div className="w-2/12 flex flex-col bg-slate-950 h-full p-5 justify-between border-r-2">
        <div>
          {/* profile section */}
          <div className="p-2 flex flex-col  mb-10">
            <div className="h-[90px] w-[90px] rounded-full bg-slate-400 mb-5 overflow-hidden  ">
              <Image src={`/image/staffDP.jpg`}
                width={500}
                height={500}
                alt="staff dp"
              />
            </div>
            <p>Staff/Lecturer</p>
            <p>{`${user?.title} ${user?.firstname} ${user?.lastname}`}</p>
            <p>{`Dept: ${user?.dept}`}</p>
            <p>{`${user?.staffID}`}</p>
          </div>
          <hr />
          {/* Navigation section */}
          <div className="flex flex-col mt-10 gap-3 ">
            <p className="text-center">Menu Navigation</p>
            {menuVariants.map(({menu, name}, i) => (
              <Link key={i} href={`?${new URLSearchParams({
                menu
              })}`}  className={`text-center bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white ${selectedMenu === menu ? `ring-2 ring-rose-800` : ``} `}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        {/* logout button */}
        <button onClick={signOut} className="bg-slate-700 py-1 rounded-md hover:ring-2 hover:ring-white">
          Logout
        </button>
      </div>
      {/* Right Pane */}
      <div className="text-white w-10/12 py-5 px-10 overflow-auto">
        {/* Set Questions Component */}
        {selectedMenu === `set_test_questions` && <div className="">
          <p className="text-4xl font-bold my-5">Set Test Questions</p>
          <QuestionsComponent userInfo={user} data={data} />
        </div>}
        {/* Course management subpage */}
        {selectedMenu === `manage_courses` && <div>
          <CourseManagement userInfo={user} data={data} />
        </div>}
        {/* Result subpage */}
        {selectedMenu === `results` && <div>
          <Result userInfo={user} data={data} />
        </div>}
        {/* At initial page load when no menu has been selected */}
        {selectedMenu !== `set_test_questions` && selectedMenu !== `manage_courses` && selectedMenu !== `results` && <div>
          <p>Start by choosing any of your menu button</p>
        </div>}
      </div>
    </div>
  );
};

export default Examiner;
