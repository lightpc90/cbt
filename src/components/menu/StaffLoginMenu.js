'use client'

import {useState} from 'react'
import { FaAlignJustify, FaAlignRight, FaArrowCircleRight } from "react-icons/fa";
import Link from 'next/link';

const StaffLoginMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
        {!isOpen && <div onClick={()=>setIsOpen(prev=>(!prev))}><FaAlignJustify size={35} className={`hover:text-rose-800`}/></div>}
        {isOpen && <div onClick={()=>setIsOpen(prev=>(!prev))}><FaAlignRight size={35} className={`hover:text-rose-800`}/> </div>}
        {isOpen && <div className='bg-slate-950 h-[170px] w-[180px] absolute right-5 pt-10 px-3 gap-3 flex flex-col rounded-lg shadow-md'>
            <Link href={`/login/examiner`} className='flex items-center gap-1 font-semibold hover:text-rose-800'>Staff Login <FaArrowCircleRight size={20}/> </Link>
            <hr className='my-2 border border-slate-500'/>
            <Link href={`/login/admin`} className='flex items-center gap-1 font-semibold ring ring-rose-500 p-1 rounded-md hover:ring-rose-200 hover:text-slate-500'>Admin Login <FaArrowCircleRight size={20}/></Link>
            </div>}
        
    </div>
  )
}

export default StaffLoginMenu