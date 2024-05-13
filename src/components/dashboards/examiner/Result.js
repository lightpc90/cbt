'use client'

import React, { useState } from 'react'
import { useAppContext } from '@/appContext/appState'

const Result = () => {
    const {coursesData} = useAppContext()

    const [activeCourse, setActiveCourse] = useState({})

    const handleActiveCourse=(course)=>{
        setActiveCourse(()=>{return course})
    }
    return (
        
        <div>
            <p>Results</p>
            <div className='flex gap-5'>
                {/* List of Courses, */}
            <div className='h-[800px] overflow-auto bg-slate-300 rounded-md w-8/12'>
                <div className='bg-rose-800 h-[50px] overflow-auto flex items-center p-2 gap-2'>
                   {coursesData.map((course, i)=>(
                     <button onClick={()=>handleActiveCourse(course)} key={i} className={`ring-2 ring-white p-1 rounded-md text-sm shadow-md hover:ring-yellow-500 ${course.code === activeCourse.code ? `bg-slate-800`: ``} `}>{course.code}</button>
                   ))}
                </div>
                {/*  Students and their Results */}
                <div className='p-2 text-sm h-[750px] overflow-auto gap-2 flex flex-col'>
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
                    <p>Course Title: {activeCourse?.title}</p>
                    <p>Course Code: {activeCourse?.code}</p>
                    <hr className='my-2 border-1 border-slate-500'/>
                    <p>No of Lecturer: {activeCourse?.staff?.length}</p>
                    <p>No of Students: {activeCourse?.student?.length}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Result