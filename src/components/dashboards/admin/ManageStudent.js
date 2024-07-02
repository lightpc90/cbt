'use client'

import StudentLayout from './StudentLayout';
import StudentForm from './StudentForm';
import { useState } from 'react';
import { useAppContext } from '@/appContext/appState';

import { BsFilterSquareFill, BsFilterSquare  } from "react-icons/bs";
import { RiFilterFill } from "react-icons/ri";



const ManageStudent = ({ data }) => {
    const {students} = useAppContext()

    // const [students, setStudents] = useState(studentsData?.length > 0 ? studentsData : [])
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className=''>
            <p className='text-2xl font-bold my-2'>Manage Students</p>
            <div className='flex gap-2'>
                <div className='bg-slate-700 h-[600px] w-[30%] rounded-md overflow-auto'>
                    <p className='bg-rose-900 p-1 text-lg font-bold text-center'>Add Student</p>
                    <StudentForm isEditing={isEditing} setIsEditing={setIsEditing}/>
                </div>
                {/* All Published Questions container */}
                <div className='bg-slate-700 h-[800px] w-[70%] rounded-md overflow-auto'>
                    
                    <p className='bg-rose-900 p-1 font-bold text-center text-lg'>Students</p>
                    <div className='flex p-2 space-x-2'>
                    <input type='text' placeholder='search student by name'
                        className='p-2 text-slate-900'
                        />
                        <button className='flex gap-1 items-center bg-slate-900 px-2 rounded-md'>Filter <RiFilterFill/></button>
                        
                    </div>
                    <div className='h-[85%] overflow-auto flex flex-col p-2 gap-2'>
                        {/* list of Students */}
                        {students?.map((student, i) => (
                            <StudentLayout key={i} student={student} isEditing={isEditing} setIsEditing={setIsEditing} />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ManageStudent