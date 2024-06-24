'use client'

import {useState} from 'react'
import { HiChevronRight, HiChevronDown } from "react-icons/hi";

const Depts = ["Computer Science", "Mathematics Education", "Biology Education", "Physics", "English" ]
const Genders = ["Male", "Female"]

const ManageStudent = ({ data }) => {
    const staffsData = data?.staffs.data
    const coursesData = data?.courses.data
    const studentsData = data?.students.data

    const [opened, setOpened] = useState(false)
    const [checkedCourses, setCheckedCourses] = useState({})
    //   const published = coursesData.filter((course) => (course.published === true))

    //   const getStaffs = (courseCode) => {
    //     const courseStaffs = staffsData.filter((staff) => (staff.courses.includes(courseCode)))
    //     return courseStaffs
    //   }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedCourses((prevState) => ({
            ...prevState, [name]: checked
        }))
    }

    return (
        <div className=''>
            <p className='text-2xl font-bold my-2'>Manage Students</p>
            <div className='flex gap-2'>
                <div className='bg-slate-700 h-[600px] w-[30%] rounded-md overflow-auto'>
                    <p className='bg-green-500 p-1 text-lg font-bold text-center'>Add Student</p>
                    <div className='h-[80%] overflow-auto flex flex-col p-2'>
                        <form className='space-y-2'>
                            <input type='text' name='firstName' id='firstName' required placeholder='First Name'
                            className='py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-green-500' />
                            <input type='text' name='middleName' id='middleName' required placeholder='Middle Name'
                            className='py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-green-500' />
                            <input type='text' name='lastName' id='lastName' required placeholder='Last Name'
                            className='py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-green-500' />
                            <input type='text' name='matricNo' id='matricNo' required placeholder='Matric No'
                            className='py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-green-500' />
                            <select className='block py-1 px-2 w-[80%] text-slate-900 rounded-md hover:bg-green-500'>
                                <option  value=''>Select Department</option>
                                {Depts.map((dept, i)=>(
                                    <option value={dept} key={i} >{dept}</option>
                                ))}
                            </select>
                            <button onClick={()=>{setOpened(prev=>(!prev))}} className='block py-1 px-2 text-slate-900 rounded-md bg-white hover:bg-green-500'>
                                <p className='flex gap-2'>Assign Course {opened ? <HiChevronDown size={30}/> : <HiChevronRight size={30}/>}  </p>
                            </button>
                            {opened && <div className='flex flex-wrap gap-2 text-lg font-semibold bg-rose-500'>
                                { coursesData.length > 0 ? coursesData.map((course, i)=>(
                                    <label key={i} className='hover:bg-green-500 p-1'>
                                        {course.code}
                                        <input type='checkbox' name={course.code} 
                                        checked={checkedCourses[course.code]}
                                        onChange={handleCheckboxChange} />
                                    </label>
                                )) : 'No registered course!'}
                                </div>}
                            <select className='text-slate-900 py-1 px-2 rounded-md hover:bg-green-500' required>
                                <option value='' >Gender</option>
                                {Genders.map((gender, i)=>(
                                    <option value={gender} key={i} >{gender}</option>
                                ))}
                            </select>
                            <label className=' text-slate-300 block' >
                                <p>Student Display Picture</p>
                            <input type="file" className='hover:bg-green-500'/>
                            </label>
                            <button className='bg-green-800 py-1 px-2 rounded-md hover:bg-green-500'>Register Student</button>
                        </form>
                    </div>
                </div>

                {/* All Published Questions container */}
                <div className='bg-slate-700 h-[800px] w-[70%] rounded-md overflow-auto'>
                    <p className='bg-rose-500 p-1 font-bold text-center text-lg'>Students</p>
                    <div className='h-[80%] overflow-auto flex flex-col p-2'>
                        {/* list of Students */}
                        {studentsData?.map((student, i) => (
                            <div key={i}>
                                <p>{`${student.firstname} ${student.middlename} ${student.lastname}`}</p>
                                <p>{`${student.matricNo}`}</p>
                                <p>{`${student.matricNo}`}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ManageStudent