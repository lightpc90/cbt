import React from 'react'

const CourseManagement = () => {
  return (
    <div>
        <p>Course Management</p>
        <div className='h-[150px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>My Course(s)</p>
        </div>
        <div className='h-[150px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>Draft Questions</p>
        </div>
        <div className='h-[150px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto'>
            <p className='bg-rose-800 p-1 text-white'>Published Questions</p>
        </div>
    </div>
  )
}

export default CourseManagement