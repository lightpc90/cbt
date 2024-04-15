"use client";

import React, { useState } from "react";
import { useAppContext } from "@/appContext/appState";
import { shuffledGeneral_Knowledge } from "@/data/Subjects";
import QueOptsLayout from "@/components/pageLayouts/QueOptsLayout";
import { Subjects } from "@/data/Subjects";
const Test = () => {
  const { answers } = useAppContext();
  const [currentQueNumber, setCurrentQueNumber] = useState(0); // Current question number
  const [currentSubject, setCurrentSubject] = useState(shuffledGeneral_Knowledge); // Current Test Subject

  console.log(answers);
  // function to handle next button
  const handleNext = () => {
    if (1 + currentQueNumber < currentSubject.length) {
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
        {/* Subjects  List */}
        <div className="flex flex-col items-start my-10 gap-2">
          {Subjects.map((subject, i) => (
            <button
              className={`bg-gray-700 py-2 px-3 rounded-md font-semibold hover:bg-gray-800`}
              key={i}
              onClick={() => setCurrentSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
        <button className="bt-10 bg-slate-800 p-1 rounded-md shadow-md font-semibold">
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
            <div className="w-[70px] h-[70px] bg-gray-500 rounded-full"></div>
            <div>
              <h3>Gideon F. Abbey</h3>
              <p>Robotics Engineering</p>
              <p>RTE/23/1956</p>
            </div>
          </div>
        </div>

        {/* Course, Time remaining, Questions and Options Sections */}
        <div className="p-2">
          {/* Course title and Time remaining */}
          <div className="flex justify-between mb-10 font-bold px-4">
            <p>Course: Mathematics 101</p>
            <div className="flex flex-wrap justify-center items-center gap-2">
              <div className="h-[70px] w-[70px] bg-gray-600 rounded-full "></div>
              <p className="text-gray-500">Time Remaining</p>
            </div>
          </div>
          {/* Questions and options */}
          <div className="flex w-full">
            <div className="w-9/12 mx-5">
              <QueOptsLayout
                currentSubject={currentSubject[currentQueNumber]}
                currentQueNumber={currentQueNumber + 1}
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
                {currentSubject.map(({ question }, i) => (
                  <button
                    onClick={() => {
                      setCurrentQueNumber(i);
                    }}
                    key={i}
                    className={`h-[40px] w-[40px] rounded-full flex justify-center items-center font-bold text-xl hover:ring-2 hover:ring-[#facc15] bg-gray-500 ${
                      currentQueNumber === i ? "ring-2 ring-white" : ""
                    } ${
                      answers?.hasOwnProperty(question) ? "bg-gray-800" : ""
                    }`}
                  >
                    {1 + i}
                  </button>
                ))}
              </div>
              <button className="bg-slate-900 shadow-md font-semibold py-1 rounded-md">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
