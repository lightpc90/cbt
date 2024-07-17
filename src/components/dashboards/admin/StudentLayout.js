'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image';
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import StudentEdit from './StudentEdit';
import { useAppContext } from '@/appContext/appState';
import toast from 'react-hot-toast';

const StudentLayout = ({ student, num }) => {
    console.log("student at layout: ", student, 'key: ', num)

    const [isEditing, setIsEditing] = useState(false);

    const { courses } = useAppContext()
    const [loading, setLoading] = useState(false)

    const [opened, setOpened] = useState(false)
    const [checkedCourses, setCheckedCourses] = useState({})

    const studentDPUrl = student?.imageUrl ? `/uploads/students/${student.imageUrl}` :
        `/image/default_dp.png`

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedCourses((prevState) => ({
            ...prevState, [name]: checked
        }))
    }

    const handleUpdateCourses = async () => {
        const updatedCourses = Object.keys(checkedCourses).filter((course)=>(
            checkedCourses[course]
        ))
        setLoading(true)
        const res = await fetch('/api/student/updateStudentCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: student._id, courses: updatedCourses })
        })
        if (!res.ok) {
            console.log("server failed")
            setLoading(false)
            return
        }
        const update = await res.json()
        if (!update.success) {
            console.log(update.error)
            toast.error(update.error)
        }
        console.log(update.success)
        toast.success(update.message)
        // let updatedCheck = {}
        // update.data.courses.map((course)=>(
        //     updatedCheck[course] = true
        // ))
        // setCheckedCourses(updatedCheck)
        setLoading(false)
        setOpened(false)
    }

    useEffect(() => {
        // get initial checked courses
        const initialCheckedCourses = courses.reduce((acc, course) => {
            acc[course.code] = course.students.includes(student._id);
            return acc
        }, {})
        setCheckedCourses(initialCheckedCourses)
    }, [student, courses])

    const close = () => {
        setOpened(false)
    }


    return (
        <div className='flex items-center justify-between bg-slate-900 hover:bg-slate-800 px-2 shadow-md py-1'>
            {isEditing &&
                <div className='absolute right-0 top-0 w-full h-full flex justify-center items-center bg-slate-700 opacity-[99%]  z-40'>
                    <StudentEdit student={student} key={num} num={num} setIsEditing={setIsEditing} isEditing={isEditing} />
                </div>}
            <div className='flex gap-2 items-center'>
                <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
                    <Image src={studentDPUrl} width={500} height={500} alt='student_dp' />
                </div>
                <p>{`${student.firstname} ${student.middlename.slice(0, 1)}. ${student.lastname}`}</p>
                <p>-</p>
                <p>{`${student.matricNo}`}</p>
                <p>-</p>
                <p>{`${student.dept}`}</p>
            </div>

            {/* course assignment and  edit section */}
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
                        {courses.length > 0 && <button onClick={handleUpdateCourses} disabled={loading} className='bg-white px-2 py-1 text-rose-800 hover:shadow-md hover:bg-slate-200'>{loading ? `Updating...` : `Update`}</button>}

                    </div>}
                </div>
                {/*Edit section  */}
                <button onClick={() => setIsEditing(true)} className='flex items-center gap-2 border px-2 py-1 rounded-md  hover:bg-slate-300  hover:text-slate-900'>Edit <FaEdit size={20} /></button>
            </div>
        </div>
    )
}

export default StudentLayout