'use client'

import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/appContext/appState'
import Link from 'next/link'

const CourseManagement = () => {
  const {userData, coursesData} = useAppContext()
  console.log("user data in course managment: ", userData)

  const [drafts, setDrafts] = useState([])
  const [published, setPublished] = useState([])

  // find course selected from the list of courses list using course code
  const getCourse=(courseCode)=>{
    const _courseSelected = coursesData?.find((course)=>(course.code == courseCode))
    return _courseSelected
  }

  const getDraftQuestions=()=>{
    const _drafts = coursesData.filter((course)=>(userData.courses.includes(course.code) && course.published === false))
    if(_drafts.length > 0){
      setDrafts(_drafts) 
    }
  }

  const getPublishedQuestions=()=>{
    const _published = coursesData.filter((course)=>(userData.courses.includes(course.code) && course.published === true))
    if(_published.length > 0){
      setPublished(_published)
    }
  }

  useEffect(()=>{
    if(coursesData){
      getCourse()
    }

    if(drafts.length > 1){
      getDraftQuestions()
    }

    if(published.length > 1){
      getPublishedQuestions()
    }

  },[])
  

  return (
    <div>
        <p>Course Management</p>
        <div className='h-[250px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>My Course(s)</p>
            <div className='p-2 flex gap-2'>
              {userData?.courses?.length > 0 ? userData?.courses?.map((code, i)=>(
                <div key={i} className='bg-slate-900 text-white p-1 h-[150px] w-[100px] rounded-md overflow-auto '>
                  <p>{code}</p>
                  <p className='text-rose-400'>{getCourse(code).title}</p>
                </div>
              )) : `No Course(s) Registered Yet`}
            </div>
        </div>
        <div className='h-[250px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>Draft Questions</p>
            <div className='px-2'>
            {drafts.length > 0 ? drafts.map((draft, i)=>(
            <div key={i}>
             <p>{`${draft.code} Question`}</p>
             <p>{draft.title}</p>
             <p>{`${draft.question.questions.length} questions`}</p>
             <p>{`Duration: ${draft.params.testHourDuration} : ${draft.params.testMinDuration}`}</p>
             <p>{`Exam Date and Time: ${draft.params.dateAndTime}`}</p>
             <div>
              <Link href={`/`}>view</Link>
              <button>Publish</button>
             </div>
            </div>)) : `No Draft Questions`}
            </div>
        </div>
        <div className='h-[250px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>Published Questions</p>
            <div className='px-2'>
            {drafts.length > 0 ? drafts.map((draft, i)=>(
            <div key={i}>
             <p>{`${draft.code} Question`}</p>
             <p>{draft.title}</p>
             <div>
              <Link href={`/`}>View</Link>
              <button>Pulldown</button>
             </div>
            </div>)) : `No Published Questions`}
            </div>
        </div>
    </div>
  )
}

export default CourseManagement