'use client'

import { useEffect, useState } from 'react'
import { useAppContext } from '@/appContext/appState'
import ResultLayout from './ResultLayout'

const Result = ({ userInfo, data }) => {
    const {courses} = useAppContext()


    const [activeCode, setActiveCode] = useState('')
    const [selectedCourse, setSelectedCourse] = useState({})

    // NOTE: I WANT TO SIMPLIFY THIS CODE AND REMOVE THE EFFECT HERE!
    useEffect(() => {
        if (courses) {
            const getCourse = () => {
                const _courseSelected = courses.find((course) => (course.code == activeCode))
                setSelectedCourse(_courseSelected)
            }
            getCourse()
        }
    }, [activeCode, courses])

    const handleActiveCode = (code) => {
        setActiveCode(() => { return code })
    }


    return (

        <div>
            <p>Results</p>
            <div className='flex gap-5'>
                {/* List of Courses, */}
                <div className='h-[800px] overflow-auto bg-slate-300 rounded-md w-8/12'>
                    <div className='bg-rose-800 h-[50px] overflow-auto flex items-center p-2 gap-2'>
                        {userInfo?.admin ?
                            // the user is an admin
                            courses?.length > 0 ?
                                // the user is an admin and courses are registered
                                courses.map((course, i) => (
                                    <button key={i} onClick={() => handleActiveCode(course.code)}
                                        className={`ring-2 ring-white p-1 rounded-md text-sm shadow-md hover:ring-yellow-500 ${course.code === activeCode ? `bg-slate-800` : ``} `}>{course.code}</button>
                                )) :
                                // The user is an admin but no course is registered
                                `No Registered course` :
                            // if the user is not an admin
                            userInfo?.courses?.length > 0 ?
                                // the user is not an admin and he has course(s) registered under him
                                userInfo?.courses?.map((code, i) => (
                                    <button onClick={() => handleActiveCode(code)} key={i}
                                        className={`ring-2 ring-white p-1 rounded-md text-sm shadow-md hover:ring-yellow-500 ${code === activeCode ? `bg-slate-800` : ``} `}>{code}</button>
                                )) :
                                // the user is not an admin and has no course registered under him
                                `No Course Registered`}
                    </div>




                    {/*  Students and their Results */}
                    <div className='p-2 text-sm h-[750px] overflow-auto gap-2 flex flex-col'>
                        {/* Dynamic result shows here */}
                        {selectedCourse?.results ? Object.entries(selectedCourse.results).map(([id, result], i) => (
                            <ResultLayout key={i} id={id} result={result} selectedCourse={selectedCourse} />
                        )) : <p className='text-slate-800 font-bold text-center'>No Result For the Selected Course</p>}

                    </div>
                </div>
                {/* Info of the selected course */}
                <div className='h-[300px] overflow-auto bg-slate-300 rounded-md w-3/12 p-2 text-slate-800'>
                    <p className='text-rose-800 font-semibold'>Course Basic Info</p>
                    <div className='flex flex-col mt-5 gap-1'>
                        <p>Course Title: {selectedCourse?.title}</p>
                        <p>Course Code: {selectedCourse?.code}</p>
                        <hr className='my-2 border-1 border-slate-500' />
                        {/*  */}
                        <p>No of Lecturer: {selectedCourse?.staffs?.length > 0 ? selectedCourse?.staffs?.length : ""}</p>
                        <p>No of Students: {selectedCourse?.students?.length > 0 ? selectedCourse?.students?.length : "None Registered yet"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result