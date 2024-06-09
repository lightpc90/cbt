"use client";

import { useState } from "react";
import QueOptsLayout from "@/components/pageLayouts/QueOptsLayout";
import CountdownTimer from "./TestCountDownTimer";
import Image from "next/image";
import { POST } from "@/app/api/auth/logout/route";


const Test = ({data}) => {
  const examData = data?._examData
  const studentData = data?.studentData

  const examQuestions = examData?.question.questions

  const [currentQueNumber, setCurrentQueNumber] = useState(0); // Current question number
  const [answers, setAnswers] = useState(typeof window !== 'undefined' ? localStorage.getItem("answers") && JSON.parse(localStorage.getItem("answers")) : {} )

  // funtion to handle answer submit
  const handleAnswersSubmit=async()=>{
    console.log("answers about to be submitted: ", answers)

    // run a function to check if any of the questions was not answered

    // run a funtion to calculate the student score

    

    const res = await fetch('/api/course/updateACourse', {
      method: POST,
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
  }


  // function to handle next button
  const handleNext = () => {
    if (1 + currentQueNumber < examQuestions.length) {
      setCurrentQueNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }
  };

  // function to handle previous button
  const handlePrevious = () => {
    if (currentQueNumber > 0) {
      setCurrentQueNumber((prevQuestionNumber) => prevQuestionNumber - 1);
    }
  };
  return (
    <div className="bg-gray-900 text-white h-screen flex">
      {/* left pane menu */}
      <div className="flex flex-col justify-between w-2/12 h-full border-r border-gray-500 p-2 overflow-auto">
        {/* Exam Info */}
        <div className="flex flex-col items-start my-10 gap-2 font-bold">
          <p className="bg-rose-800 p-2">Exam Details</p>
          <p>{`Course: ${examData.code}`}</p>
          <p>{`Course Title: ${examData.title}`}</p>
          <p>{`Session: ${examData.question.params.schoolSession}`}</p>
          <p>{`Exam Duration: ${examData.question.params.testHourDuration}hr ${examData.question.params.testMinDuration}min`}</p>
        </div>
        <button className="bt-10 bg-slate-800 p-1 rounded-md shadow-md font-semibold hover:bg-rose-800">
          Logout
        </button>
      </div>
      {/* right pane student profile */}
      <div className="flex flex-col w-10/12">
        <div className="flex justify-between px-5 py-3 items-center border-4 border-gray-500">
          {/* Insitution name and details */}
          <div>
            <p className="text-gray-500 font-bold">CBT SYSTEM</p>
            <p className="text-2xl font-bold">
              Folahan Institute of Technology, Wakanda
            </p>
          </div>
          {/* Student name and picture */}
          <div className="flex h-[70px] justify-end items-center gap-2 ">
            <div className="w-[70px] h-[70px] flex justify-center items-center bg-gray-500 rounded-full overflow-auto hover:ring-2 hover:ring-rose-700">
              <Image src={`/image/studentDP.jpg`} alt="studentDP" width={200} height={200} />
            </div>

            {/* studentdata here */}
            <div>
              <h3>{`${studentData?.firstname} ${studentData?.lastname}`}</h3>
              <p>{studentData?.dept}</p>
              <p>{studentData?.studentID}</p>
            </div>
          </div>
        </div>

        {/* Course, Time remaining, Questions and Options Sections */}
        {examQuestions?.length > 0 ? <div className="p-2">
          {/* Course title and Time remaining */}
          <div className="flex justify-between mb-10 font-bold px-4">
            <p className="text-2xl px-5">Course: {examData.code}</p>
            <div className="flex flex-col justify-center items-center gap-2">
              <CountdownTimer />
            </div>
          </div>
          {/* Questions and options */}
          <div className="flex w-full">
            <div className="w-9/12 mx-5">
              <QueOptsLayout
                currentQuestion={examQuestions[currentQueNumber]}
                currentQueNumber={currentQueNumber + 1}
                answers={answers}
                setAnswers={setAnswers}
              />
              {/* Previous and Next Button */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={handlePrevious}
                  className="bg-gray-500 py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-gray-950"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-500 py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-gray-950"
                >
                  Next
                </button>
              </div>
            </div>
            {/* Questions selection section */}
            <div className="flex flex-col justify-between p-2 bg-gray-700 w-3/12 h-[500px] overflow-auto rounded-md shadow-md ">
              {/* section holding  the question number selectors */}
              <div className="flex flex-wrap gap-2 h-[400px] p-2 overflow-auto bg-slate-900 rounded-lg">
                {examQuestions?.map(({ question }, i) => (
                  <button
                    onClick={() => {
                      setCurrentQueNumber(i);
                    }}
                    key={i}
                    className={`h-[40px] w-[40px] rounded-full flex justify-center items-center font-bold text-xl hover:ring-2 hover:ring-[#facc15] bg-gray-500 ${
                      currentQueNumber === i && "ring-2 ring-white" 
                    } ${
                      answers[question] && "bg-gray-800" 
                    }`}
                  >
                    {1 + i}
                  </button>
                ))}
              </div>
              <button className="bg-slate-900 shadow-md font-semibold hover:bg-rose-800 py-1 rounded-md">
                Submit Your Answers
              </button>
            </div>
          </div>
        </div> : <p className="text-center pt-10 text-lg font-bold">No Exam Question</p>}
      </div>
    </div>
  );
};

export default Test;
