'use client'

import { useState } from 'react'
import StudentForm from './StudentForm'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { RiDeleteBinFill } from "react-icons/ri";

const StudentEdit = ({ setStudents, studentData, setStudentData, setIsEditing, isEditing }) => {
  const router = useRouter()
  const [openDeletBox, setOpenDeleteBox] = useState(false)

  const [deleteInfo, setDeleteInfo] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const confirmDeleteInfo=()=>{
    return studentData.matricNo === deleteInfo
  }

  const handleStudentDelete = async ()=>{
    console.log("check ", studentData.matricNo === deleteInfo)
    console.log("entering delete function")
    if (confirmDeleteInfo() === false){
      console.log('wron input')
      console.log("delete info: ", deleteInfo, "and matric: ", studentData.matricNo)
      toast.error("incorrect input")
      return
    }
    try{
      console.log("entering the delete api...")
      setIsDeleting(true)
      const res  = await fetch("/api/student/deleteAStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({_id: studentData._id})
      })
      const isDeleted = await res.json()
      if(isDeleted.success === false){
        toast.error(isDeleted.error)
      }
      else{
        setStudents(prevStudents=>prevStudents.filter((student)=>(student._id !== studentData._id)))
        toast.success(isDeleted.message)
      }
      setIsEditing(false)
    }catch(err){
      console.group("Internal Server Error in student delete route: ", err)
      toast.error("Internal Server Error: try again!")
      setIsEditing(false)
    }finally{
      setIsDeleting(false)
    }
  }



  return (
    <div className='max-w-[450px] max-h-[900px] bg-slate-900 py-12 px-5 overflow-auto'>
      <p className='text-center font-bold text-2xl mb-5'>Update Student Information</p>
      <StudentForm isEditing={isEditing} setStudents={setStudents} studentData={studentData} setStudentData={setStudentData} setIsEditing={setIsEditing} />
      <div className='mt-10'>
        {!openDeletBox && <button className='flex items-center gap-2 text-rose-800 font-semibold' onClick={()=>setOpenDeleteBox(true)}>Delete Student Info <RiDeleteBinFill size={20}/></button>}
        {openDeletBox && <div>
          <label>
            <p>NB: This action will delete the student entire data. To continue, type the student matric number, {studentData.matricNo} in the box below</p>
            <input name='deleteInfo' value={deleteInfo} onChange={(e)=>setDeleteInfo(e.target.value)}  type='text' className='text-slate-800 px-2 p-1 rounded-md' />
          </label>
          <div className='space-x-2 mt-3'>
          <button  onClick={handleStudentDelete} className='bg-rose-900 py-1 px-2 hover:bg-rose-700' >{isDeleting ? `Deleting...` : `Delete Student`}</button>
          <button className='border border-rose-900 py-1 px-2 hover:bg-rose-700' onClick={()=>setOpenDeleteBox(false)}>Cancel</button>
          </div>
          
        </div>}
      </div>
    </div>
  )
}

export default StudentEdit