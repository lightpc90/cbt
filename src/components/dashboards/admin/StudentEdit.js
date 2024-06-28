import { useState } from 'react'
import StudentForm from './StudentForm'

const StudentEdit = ({ setStudents, studentData, setStudentData, setIsEditing }) => {
  const [openDeletBox, setOpenDeleteBox] = useState(false)

  const handleStudentDelete = async ()=>{}

  return (
    <div className='max-w-[450px] max-h-[900px] bg-slate-900 py-12 px-5 overflow-auto'>
      <p className='text-center font-bold text-2xl mb-5'>Update Student Information</p>
      <StudentForm updating={true} setStudents={setStudents} studentData={studentData} setStudentData={setStudentData} setIsEditing={setIsEditing} />
      <div className='mt-10'>
        {!openDeletBox && <button onClick={()=>setOpenDeleteBox(true)}>Delete Student Info</button>}
        {openDeletBox && <div>
          <label>
            <p>This action will delete the student entire data. To continue, type the student matric number, {studentData.matricNo} in the box below</p>
            <input type='text' className='text-slate-800 px-2 p-1 rounded-md' />
          </label>
          <div className='space-x-2 mt-3'>
          <button className='bg-rose-900 py-1 px-2 hover:bg-rose-700' onClick={handleStudentDelete}>Delete Student</button>
          <button className='border border-rose-900 py-1 px-2 hover:bg-rose-700' onClick={()=>setOpenDeleteBox(false)}>Cancel</button>
          </div>
          
        </div>}
      </div>
    </div>
  )
}

export default StudentEdit