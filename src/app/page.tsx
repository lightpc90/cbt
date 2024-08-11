
import Link from "next/link";
import StaffLoginMenu from "@/components/menu/StaffLoginMenu";
import StudentTestLoginForm from "@/components/Forms/StudentTestLoginForm";
import { IoSchool } from "react-icons/io5";
import { BiSolidDoorOpen } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

import { LuLogIn } from "react-icons/lu";

import backgroundImage from '../../public/image/formulaeBG.png'


export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center gap-[30px] bg-slate-800 text-white relative">
      <Image
        src={backgroundImage}
        alt="background image"
        className="absolute h-full w-full top-0 left-0 right-0 cover opacity-20 blur-sm "
      />
      <Navbar />
      {/* Exam porta login */}
      <div className="flex gap-3 items-center bg-white p-10 shadow-md rounded-md border-2 border-blue z-10">
        <div className="text-slate-950 text-2xl font-semibold">
          <IoSchool size={30} className="text-center w-full" />
          <p>Exam Portal</p>
          <span className="flex items-center gap-2">
            <p className="text-slate-400 text-sm">Student Login</p>
            <LuLogIn size={20} />
          </span>
        </div>
        {/* vertical divider */}
        <div className="border-2 border-r-slate-800 h-full"></div>
        {/* left side */}
        <div>
          <StudentTestLoginForm />
        </div>
      </div>
    </main>
  );
}
