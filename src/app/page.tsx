
import Link from "next/link";
import StaffLoginMenu from "@/components/menu/StaffLoginMenu";
import StudentTestLoginForm from "@/components/Forms/StudentTestLoginForm";
import { IoSchool } from "react-icons/io5";
import { BiSolidDoorOpen } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";


export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center gap-[30px] bg-slate-800 text-white">
      <div className="h-20 bg-slate-950 text-white w-full flex justify-between items-center shadow-md px-5 ">
        <h1 className="font-bold text-2xl">CBT SYSTEM</h1>
        <StaffLoginMenu />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold ">Folahan Institute of Technology, Wakanda</p>
        <p className="text-gray-400">Center of Excellence</p>
      </div>

      {/* Exam porta login */}
      <div className="flex gap-3 items-center bg-white p-10 shadow-md rounded-md border-2 border-blue ">
        <div className="text-slate-950 text-2xl font-semibold">
          <IoSchool size={50}/>
          <p>Exam Portal</p>
          <p>Student Login</p>
          <FaLongArrowAltRight size={50}/>
        </div>
        {/* vertical divider */}
        <div className="border-2 border-r-slate-800 h-full"></div>
        {/* left side */}
        <div>
          <StudentTestLoginForm/>
        </div>

      </div>
    </main>
  );
}
