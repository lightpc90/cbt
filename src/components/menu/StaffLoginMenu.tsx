'use client'

import {useState} from 'react'
import { FaAlignJustify, FaAlignRight } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoIosLogIn } from "react-icons/io";
import Link from 'next/link';

const StaffLoginMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      {!isOpen && (
        <div onClick={() => setIsOpen((prev) => !prev)}>
          <FaAlignJustify size={35} className={`hover:text-rose-800`} />
        </div>
      )}
      {isOpen && (
        <div onClick={() => setIsOpen((prev) => !prev)}>
          <FaAlignRight size={35} className={`hover:text-rose-800`} />{" "}
        </div>
      )}
      {isOpen && (
        <div className="bg-slate-950 h-[200px] w-[180px] absolute right-5 pt-10 px-3 gap-3 flex flex-col rounded-lg shadow-md">
          <Link
            href={`/`}
            className="flex items-center gap-1 font-semibold hover:text-rose-800"
          >
            Home <AiFillHome size={20} />{" "}
          </Link>
          <Link
            href={`/login/examiner`}
            className="flex items-center gap-1 font-semibold hover:text-rose-800"
          >
            Staff Login <IoIosLogIn size={20} />{" "}
          </Link>
          <hr className="my-2 border border-slate-500" />
          <Link
            href={`/login/admin`}
            className="flex items-center gap-1 font-semibold ring-1 ring-rose-300 p-1 rounded-md hover:ring-rose-200 hover:text-slate-500"
          >
            Admin Login <IoIosLogIn size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default StaffLoginMenu