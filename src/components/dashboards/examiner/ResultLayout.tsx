'use client'

import React from 'react'
import { GiStamper } from "react-icons/gi";
import { useAppContext } from '@/appContext/appState';
import { IStudent } from '@/components/interfaces/interfaces';

const ResultLayout = ({ id, result, selectedCourse }) => {
    const { state} = useAppContext()
    // get the name of the student from the studentsData list using the student id
    const studentInfo = state.students?.find((student: IStudent)=>(student._id == id))

    // get the number of questions in the exam
    const noOfQuestions = selectedCourse?.question?.questions?.length

    return (
        <div className='flex justify-evenly bg-slate-900 text-white p-1 rounded-md shadow-md overflow-auto'>
            <p>{`Name: ${studentInfo?.firstname} ${studentInfo?.middlename} ${studentInfo?.lastname}`}</p>
            <p>MatricNo: {studentInfo?.matricNo}</p>
            <p>Score: {`${result?.score}/${noOfQuestions}`}</p>
        </div>
    )
}

export default ResultLayout