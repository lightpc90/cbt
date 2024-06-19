import React from 'react'

const Confirmation = ({noOfUnansweredQuestions, setConfirmationIsOpen, setSubmitLoading, handleAnswersSubmit}) => {
    const handleCancelButton = ()=>{
        setSubmitLoading(false)
        setConfirmationIsOpen(false)
    }
  return (
    <div className='p-5 bg-white rounded-md shadow-md text-slate-900 h-[70%] flex flex-col justify-center items-center'>
        <p>You have NOT ANSWERED all your questions, {noOfUnansweredQuestions} yet to be answered!</p>
        <p>Do you want to SUBMIT regardless?</p>
        <div className='flex flex-wrap gap-2 items-center mt-5'>
            <button className='bg-rose-800 py-1 px-2 text-white' onClick={handleAnswersSubmit}>Yes, Submit!</button>
            <button className='bg-slate-800 py-1 px-2 text-white' onClick={handleCancelButton}>No, go back to answer all</button>
        </div>
    </div>
  )
}

export default Confirmation