"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/appContext/appState";
import { numberToAlphabet } from "@/UtilityFunctions/numberToAlphabet";

const QueOptsLayout = ({ currentSubject, currentQueNumber }) => {

  const { answers, setAnswers } = useAppContext()
  console.log("answer after  setting", answers)

  const handleChange = (question, answer) => {
     localStorage.setItem(
       "answers",
       JSON.stringify({ ...answers, [question]: answer })
     );
    setAnswers({ ...answers, [question]: answer }); 
  }
  
  
  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers"))
      : {};
    if (!savedAnswers[currentSubject.question]) {
      // If the user has not answered this question yet, initialize it with a null value.
      setAnswers((prevAnswers) => ({ ...prevAnswers, [currentSubject.question]: null }));
    } else {
      setAnswers(savedAnswers);
    }
    }, []);
  
  
  return (
    <div className="flex w-full">
      <div className="w-9/12 mx-5">
        {/* Question section */}
        <div className="bg-gray-700 max-h-[230px] rounded-md shadow-md p-3 overflow-auto mb-5">
          <h2>Question {currentQueNumber}</h2>
          <p>{currentSubject.question}</p>
        </div>
        {/* Options section */}
        <div className="bg-gray-700 max-h-[310px] rounded-md p-3 shadow-md overflow-auto">
          {currentSubject.options.map((option, index) => (
            <div key={index} className="flex flex-wrap ">
              <p>{numberToAlphabet(1+index)}</p>
              <input
                type="radio"
                id={`opt${index}`}
                name="option"
                value={option}
                checked={answers[currentSubject.question] == option}
                onChange={() => {
                  handleChange(currentSubject.question, option);
                }}
              />
              <label htmlFor={`opt${index}`} className="ml-2">{option}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueOptsLayout;
