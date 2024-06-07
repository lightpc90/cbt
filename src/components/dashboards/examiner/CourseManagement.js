'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const CourseManagement = ({userInfo, data}) => {
  const coursesData = data.courses.data


  const [drafts, setDrafts] = useState([])
  const [published, setPublished] = useState([])

  // find course selected from the list of courses list using course code
  const getCourse=(courseCode)=>{
    const _courseSelected = coursesData?.find((course)=>(course.code == courseCode))
    return _courseSelected
  }

  const getDraftQuestions=()=>{
    const _drafts = coursesData?.filter((course)=>(userInfo.courses.includes(course.code) && course.question?.questions.length > 0 && course.published === false))
    if(_drafts.length > 0){
      console.log("_drafts: ", _drafts)
      setDrafts(_drafts) 
    }
  }

  const getPublishedQuestions=()=>{
    const _published = coursesData?.filter((course)=>(userInfo.courses.includes(course.code) && course.question?.questions.length > 0 && course.published === true))
    if(_published.length > 0){
      setPublished(_published)
    }
  }

  useEffect(()=>{
    getCourse()
    getDraftQuestions()
    getPublishedQuestions()
  })
  

  return (
    <div>
        <p>Course Management</p>
        <div className='h-[250px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>My Course(s)</p>
            <div className='p-2 flex gap-2 overflow-auto'>
              {userInfo?.courses?.length > 0 ? userInfo?.courses?.map((code, i)=>(
                <div key={i} className='bg-slate-900 text-white p-1 h-[180px] w-[150px] rounded-md overflow-auto '>
                  <p>{code}</p>
                  <p className='text-rose-400'>{getCourse(code)?.title}</p>
                </div>
              )) : `No Course(s) Registered Yet`}
            </div>
        </div>
        <div className='h-[250px] bg-gray-300 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>Draft Questions</p>
            <div className='px-2 py-1 overflow-auto flex gap-2'>
            {drafts.length > 0 ? drafts.map((draft, i)=>(
            <div className='w-[200px] h-[210px] bg-slate-900 text-white p-2 overflow-auto rounded-md shadow-md' key={i}>
             <p>{`${draft.code} Question`}</p>
             <p className='text-rose-400 text-sm'>{draft.title}</p>
             <p className='text-sm'>{`${draft.question?.questions?.length} questions`}</p>
             <p className='text-sm'>{`Duration: ${draft.question?.params?.testHourDuration} : ${draft.question?.params?.testMinDuration}`}</p>
             <p className='text-rose-400 text-sm'>{`Exam Date and Time: ${draft.question?.params?.dateAndTime}`}</p>
             <hr className='my-2'/>
             <div className='space-x-2'>
              <Link className='border border-rose-400 p-1 hover:bg-rose-500' href={`/`}>View</Link>
              <button className='bg-rose-800 p-1 hover:bg-rose-500'>Publish</button>
             </div>
            </div>)) : `No Draft Questions`}
            </div>
        </div>
        <div className='h-[250px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>Published Questions</p>
            <div className='px-2 py-1 overflow-auto flex gap-2'>
            {published.length > 0 ? drafts.map((published, i)=>(
            <div className='w-[200px] h-[210px] bg-slate-900 text-white p-2 overflow-auto rounded-md shadow-md' key={i}>
             <p>{`${published.code} Question`}</p>
             <p>{published.title}</p>
             <p className='text-sm'>{`${published.question?.questions?.length} questions`}</p>
             <p className='text-sm'>{`Duration: ${published.question?.params?.testHourDuration} : ${published.question?.params?.testMinDuration}`}</p>
             <p className='text-rose-400 text-sm'>{`Exam Date and Time: ${published.question?.params?.dateAndTime}`}</p>
             <hr className='my-2'/>
             <div className='space-x-2'>
              <Link className='border border-rose-400 p-1 hover:bg-rose-500' href={`/`}>View</Link>
              <button className='bg-rose-800 p-1 hover:bg-rose-500'>Pulldown</button>
             </div>
            </div>)) : `No Published Questions`}
            </div>
        </div>
    </div>
  )
}

export default CourseManagement