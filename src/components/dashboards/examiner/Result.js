'use client'

import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/appContext/appState'

const Result = () => {
    const { coursesData, userData } = useAppContext()

    const [activeCode, setActiveCode] = useState({})
    const [selectedCourse, setSelectedCourse] = useState({})




    useEffect(() => {
        if (coursesData) {
            const getCourse = () => {
                const _courseSelected = coursesData.find((course) => (course.code == activeCode))
                setSelectedCourse(_courseSelected)
            }
            getCourse()
        }
    }, [activeCode, coursesData])

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
                        {userData.admin ?
                            // the user is an admin
                            coursesData?.length > 0 ?
                                // the user is an admin and courses are registered
                                coursesData.map((course, i) => (
                                    <button key={i} onClick={() => handleActiveCode(course.code)}
                                        className={`ring-2 ring-white p-1 rounded-md text-sm shadow-md hover:ring-yellow-500 ${course.code === activeCode ? `bg-slate-800` : ``} `}>{course.code}</button>
                                )) :
                                // The user is an admin but no course is registered
                                `No Registered course` :
                            // if the user is not an admin
                            userData?.courses?.length > 0 ?
                                // the user is not an admin and he has course(s) registered under him
                                userData?.courses?.map((code, i) => (
                                    <button onClick={() => handleActiveCode(code)} key={i}
                                        className={`ring-2 ring-white p-1 rounded-md text-sm shadow-md hover:ring-yellow-500 ${code === activeCode ? `bg-slate-800` : ``} `}>{code}</button>
                                )) :
                                // the user is not an admin and has no course registered under him
                                `No Course Registered`}
                    </div>
                    {/*  Students and their Results */}
                    <div className='p-2 text-sm h-[750px] overflow-auto gap-2 flex flex-col'>
                        {/* Dynamic result shows here */}
                        {selectedCourse?.results?.length > 0 ? selectedCourse.results.map((result) => (
                            <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md'>
                                <p>{result?.studentId}</p>
                                <div className='flex gap-3'>
                                    <p>{result?.score}</p>
                                    <p>{`100Dummy`}</p>
                                </div>
                            </div>)
                        ) : <p className='text-slate-900 font-semibold'>No Results Yet</p>}

                        {/* dummy data to model result view */}
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md'>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        {/* duplicate */}
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md'>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md'>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md'>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md'>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                        <div className='flex justify-between bg-slate-900 p-1 rounded-md shadow-md '>
                            <p>Gideon Folahan</p>
                            <div className='flex gap-3'>
                                <p>70/70</p>
                                <p>100%</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Info of the selected course */}
                <div className='h-[300px] overflow-auto bg-slate-300 rounded-md w-3/12 p-2 text-slate-800'>
                    <p className='text-rose-800 font-semibold'>Course Basic Info</p>
                    <div className='flex flex-col mt-5 gap-1'>
                        <p>Course Title: {selectedCourse?.title}</p>
                        <p>Course Code: {selectedCourse?.code}</p>
                        <hr className='my-2 border-1 border-slate-500' />
                        <p>No of Lecturer: {selectedCourse?.staff?.length}</p>
                        <p>No of Students: {selectedCourse?.student?.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result