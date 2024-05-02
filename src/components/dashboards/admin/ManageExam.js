import React from 'react'

const ManageExam = () => {
  return (
    <div className='h-screen'>
      <p>Manage Examination</p>
      <div className='flex gap-2'>
        {/* All Questions container */}
      <div className='bg-slate-700 h-[600px] w-[75%] rounded-md overflow-auto'> 
      <p className='bg-rose-500 p-1'>Questions</p>
      {/* list of Questions */}
      <div className='h-[80%] overflow-auto flex flex-wrap p-2'>
        <div className='bg-slate-800 p-1 ring-2 ring-rose-500'>
          <p>Bio101</p>
          <p>Dr. T Johnson</p>
          <hr className='my-2'/>
          <button className='bg-rose-500 hover:bg-slate-500 px-1'>publish</button>
        </div>
      </div>
      </div>

      {/* published question container */}
      <div className='bg-slate-700 h-[300px] w-[10%] rounded-md overflow-auto'> 
      <p className='bg-green-500 p-1'>Live Question</p>
      {/* list of Questions */}
      <div className='h-[80%] overflow-auto flex flex-wrap p-2'>
        <div className='bg-slate-800 p-1 ring-2 ring-green-500'>
          <p>Bio101</p>
          <p>Dr. T Johnson</p>
          <hr className='my-2'/>
          <button className='bg-green-500 hover:bg-slate-500 px-1'>pull down</button>
        </div>
      </div>
      </div>
      </div>
      
    </div>
  )
}

export default ManageExam