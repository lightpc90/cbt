"use client";

import { useEffect, useState } from "react";
import { numberToAlphabet } from "@/UtilityFunctions/numberToAlphabet";

const QueOptsLayout = ({ currentQuestion, currentQueNumber, answers, setAnswers }) => {
  const [keyIsSet, setKeyIsSet] = useState(false)

  // 
  const eachQuestion = currentQuestion.question

  // runs the function everytime a student picks an answer; to save the student answers in local storage
  const handleChange = (question, answer) => {
    localStorage.setItem(
      "answers",
      JSON.stringify({ ...answers, [question]: answer })
    );
    setAnswers({ ...answers, [question]: answer });
  }

  const setObjectKey=(savedAnswers)=>{
    if (savedAnswers[eachQuestion]  == null || savedAnswers[eachQuestion] == undefined) {
      // If the user has not answered this question yet, initialize it to null.
      setAnswers((prevAnswers) => ({ ...prevAnswers, [eachQuestion]: '' }));
      console.log("key set to empty string...")
    } else {
      setAnswers(savedAnswers);
      console.log("the key has a defined value, nothing to set")
    }
    setKeyIsSet(true)
    console.log("setKeyIsSet is set to true..." )
  }


  useEffect(() => {
    console.log("entering effect in quesoption layout")
    const savedAnswers = localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers"))
      : {};
      if(savedAnswers[eachQuestion]){
        console.log("value of the current key in savedObject: ", eachQuestion, '=', savedAnswers[eachQuestion])
      }
      else{console.log('value to this key is initially null: ', eachQuestion, "::::setting the value...")}
   setObjectKey(savedAnswers) 
  }, [eachQuestion ]);


  return (
    <div className="flex w-full">
      <div className="w-9/12 mx-5">
        {/* Question section */}
        <div className="bg-gray-700 max-h-[230px] rounded-md shadow-md p-3 overflow-auto mb-5 hover:bg-rose-800">
          <h2>Question {currentQueNumber}</h2>
          <p>{eachQuestion}</p>
        </div>
        {/* Options section */}
       {keyIsSet ? <div className="bg-gray-700 max-h-[310px] rounded-md p-3 shadow-md overflow-auto">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex flex-wrap hover:bg-green-600 ">
              <p>{numberToAlphabet(1 + index)}</p>
              <input
                type="radio"
                id={`opt${index}`}
                name={`opt${index}`}
                value={option}
                checked={answers[eachQuestion] == option}
                onChange={() => {
                  handleChange(eachQuestion, option);
                }}
              />
              <label htmlFor={`opt${index}`} className="ml-2">{option}</label>
            </div>
          ))}
        </div> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default QueOptsLayout;
