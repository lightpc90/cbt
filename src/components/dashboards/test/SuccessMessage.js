'use client'

import React from 'react'
import { useAppContext } from '@/appContext/appState'
import { IoCheckmarkCircle } from "react-icons/io5";

const SuccessMessage = ({setSuccessIsOpen}) => {
    const {signOut} = useAppContext()
  return (
    <div className='p-5 bg-white rounded-md shadow-md text-slate-900 h-[50%] flex flex-col justify-center items-center'>
        <IoCheckmarkCircle size={30} className='text-green-800' />
        <p className='text-green-800 text-2xl font-bold'>Submmitted Successfully!</p>
        <p className='text-slate-800 font-bold'>You can now logout and leave the exam hall.</p>
        <button className='bg-rose-800 py-1 px-2 text-white hover:bg-rose-700 my-4' onClick={signOut}>Logout</button>
        <button onClick={()=>setSuccessIsOpen(false)} >Close</button>
    </div>
  )
}

export default SuccessMessage