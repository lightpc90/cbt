'use client'

import React from 'react'
import { TbHandStop } from "react-icons/tb";

const Confirmation = ({noOfUnansweredQuestions, setConfirmationIsOpen, setSubmitLoading, submitLoading, handleAnswersSubmit }) => {
  // submit function
  const submit=async()=>{
    setSubmitLoading(true)
    await handleAnswersSubmit()
  }
    const handleCancelButton = ()=>{
        setSubmitLoading(false)
        setConfirmationIsOpen(false)
    }
  return (
    <div className='p-5 bg-white rounded-md shadow-md text-slate-900 h-[70%] flex flex-col justify-center items-center'>
        <TbHandStop size={30} />
        <p className='text-lg font-bold'>You have NOT ANSWERED all your questions, {noOfUnansweredQuestions} yet to be answered!</p>
        <p className='text-rose-800 font-bold'>Do you want to SUBMIT regardless?</p>
        <div className='flex flex-wrap gap-2 items-center mt-5'>
            <button className='bg-rose-800 py-1 px-2 text-white hover:bg-rose-700' disabled={submitLoading} onClick={submit}>{submitLoading ? `Submitting...` : `Yes, Submit!`}</button>
            <button className='bg-slate-800 py-1 px-2 text-white hover:bg-slate-700' onClick={handleCancelButton}>No, go back to answer all</button>
        </div>
    </div>
  )
}

export default Confirmation