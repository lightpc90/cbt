'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image';
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import StudentEdit from './StudentEdit';
import { useAppContext } from '@/appContext/appState';

const StudentLayout = ({student, isEditing, setIsEditing}) => {

    const {courses, setStudents} = useAppContext()

    const [opened, setOpened] = useState(false)
    const [checkedCourses, setCheckedCourses] = useState({})

    const [studentData, setStudentData]= useState(student)

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedCourses((prevState) => ({
            ...prevState, [name]: checked
        }))
    }

    useEffect(()=>{
          // get initial checked courses
          const initialCheckedCourses = courses.reduce((acc, course) => {
            acc[course.code] = course.students.includes(studentData._id);
            return acc
        }, {})
        setCheckedCourses(initialCheckedCourses)
    }, [studentData, courses])

    const close=()=>{
        if(opened){
            setOpened(false)
        }
    }


  return (
    <div onClick={close}  className='flex items-center justify-between bg-slate-900 hover:bg-slate-800 px-2 shadow-md py-1'>
        {isEditing && 
      <div className='absolute right-0 top-0 w-full h-full flex justify-center items-center bg-slate-700 opacity-[99%]  z-40'>
      <StudentEdit setStudents={setStudents} studentData={studentData} setStudentData={setStudentData} setIsEditing={setIsEditing} isEditing={isEditing} />
      </div>}
    <div className='flex gap-2 items-center'>
        <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
            <Image src={`/uploads/students/${studentData.imageUrl}`} width={500} height={500} alt='student_dp' />
        </div>
        <p>{`${studentData.firstname} ${studentData.middlename.slice(0, 1)}. ${studentData.lastname}`}</p>
        <p>-</p>
        <p>{`${studentData.matricNo}`}</p>
        <p>-</p>
        <p>{`${studentData.dept}`}</p>
    </div>

    {/* course assignment and edit section */}
    <div className='flex gap-2 items-center'>
        {/* assign course to student */}
        <div className='relative'>
            <button onClick={() => { setOpened(prev => (!prev)) }} className='block py-1 px-2 text-slate-900 rounded-md bg-white hover:bg-rose-800 hover:text-white hover:border '>
                <p className='flex gap-1 items-center'>Assign Course {opened ? <HiChevronDown size={25} /> : <HiChevronRight size={25} />}  </p>
            </button>
            {opened && <div className='flex flex-col gap-2 text-lg font-semibold bg-rose-500 absolute right-0 w-full z-20 '>
                {courses.length > 0 ? courses.map((course, i) => (
                    <div key={i} className=''>
                        <label className='hover:bg-green-500 p-1 space-x-2 '>
                            {course.code}
                            <input type='checkbox' name={course.code}
                                checked={checkedCourses[course.code]}
                                onChange={handleCheckboxChange} />
                        </label>
                        
                    </div>
                )) : 'No registered course!'}
                {courses.length > 0 && <button className='bg-white px-2 py-1 text-rose-800 hover:shadow-md hover:bg-slate-200'>Update</button>}
                
            </div>}
        </div>
        {/*Edit section  */}
        <button onClick={()=>setIsEditing(true)} className='flex items-center gap-2 border px-2 py-1 rounded-md  hover:bg-slate-300  hover:text-slate-900'>Edit <FaEdit size={20}/></button>
    </div>
</div>
  )
}

export default StudentLayout