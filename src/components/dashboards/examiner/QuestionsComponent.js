"use client";

import { useState, useEffect } from "react";
import { numberToAlphabet } from "@/UtilityFunctions/numberToAlphabet";
import { useAppContext } from "@/appContext/appState";

const QuestionsComponent = () => {

  const {coursesData} = useAppContext()

  const [questions, setQuestions] = useState([
    { question: "", answer: "", options: ["", "", "", ""] },
  ]);

  const [examPara, setExamPara] = useState(
    { course: '', testHourDuration: '', testMinDuration: '', schoolSession: '', dateAndTime: '' }
  )


  useEffect(() => {
    const savedObject = localStorage.getItem("examObject")
      ? JSON.parse(localStorage.getItem("examObject"))
      : {};
    console.log("save Object after reload: ", savedObject)
    if(savedObject?.questions && savedObject.questions.length > 0){setQuestions(()=>{return savedObject.questions})}
    if(savedObject?.examPara){setExamPara(()=>{return savedObject.examPara})}
    console.log("exam questions: ", questions)
    console.log("exam para: ", examPara)
  }, []);

  const addQuestion = () => {
    setQuestions((prev)=>{return [
      ...prev,
      { question: "", answer: "", options: ["", "", "", ""] },
    ]});
    localStorage.setItem("examObject", JSON.stringify({questions: [...updatedQuestions], examPara: {...examPara}}))
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(() => { return updatedQuestions });
    // store changes in browser
    localStorage.setItem("examObject", JSON.stringify({ questions: [...updatedQuestions], examPara: { ...examPara } }))
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(() => { return updatedQuestions });
    localStorage.setItem("examObject", JSON.stringify({ questions: [...updatedQuestions], examPara: { ...examPara } }))
  };

  const handleQuestionDelete = (questionIndex) => {
    questions.splice(questionIndex, 1);
    setQuestions(() => { return [...questions] });
    localStorage.setItem("examObject", JSON.stringify({ questions: [...updatedQuestions], examPara: { ...examPara } }))
  }

  const handleSetAnswer = (questionIndex, option) => {
    const updatedQuestions = questions
    updatedQuestions[questionIndex].answer = option;
    setQuestions(() => { return [...updatedQuestions] })
    localStorage.setItem("examObject", JSON.stringify({ questions: [...updatedQuestions], examPara: { ...examPara } }))
  }

  const handleSetExamPara = (e, key)=>{
    console.log("function called with key: ", key)
    setExamPara((prev)=>{return {...prev, [key]: e.target.value}})
    // save update in browser storage
    localStorage.setItem("examObject", JSON.stringify({ questions: [...questions], examPara: { ...examPara } }))
  }

  const handleCheck = (questionIndex, option)=>{
    console.log("compare answer and option: ", questions[questionIndex].answer, " vs", option )
    if(questions[questionIndex].answer == option){
      return true
    }
    return false
  }

  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex gap-2 items-center ">
        {/* Course choose input */}
        <div>
          <p className="font-bold mb-2">Choose Course</p>
          <select
            className="py-1 px-2 bg-inherit ring-2 ring-white rounded-md"
            value={examPara?.course}
            onChange={(e) => {handleSetExamPara(e, 'course')}}
          >
            {coursesData.map((course, i)=>(
              <option key={i} value={course.code} className="bg-inherit text-slate-800">{course.code}</option>
            ))}
            
          </select>
        </div>
        {/* Exam Duration Set inputs */}
        <div className="flex flex-col gap-1 ">
          <p>Duration:</p>
          <div className="flex gap-1">
            {/* Hour set input */}
            <div className="flex flex-col w-3/12 relative">
              <input type="number" placeholder="0" className="text-rose-800 px-2 bg-inherit border-b border-rose-800 " value={examPara?.testHourDuration} onChange={(e) => { handleSetExamPara(e, 'testHourDuration') }} />
              <label className="absolute right-[30px] text-slate-400 ">Hour</label>
            </div>
            {/* Minute set input */}
            <div className="flex flex-col w-3/12 relative ">
              <input type="number" placeholder="00" className=" text-rose-800 px-2 bg-inherit border-b border-green-800" value={examPara?.testMinDuration} onChange={(e) => {handleSetExamPara(e, 'testMinDuration') }} />
              <label className="absolute right-[30px] text-slate-400 ">Min</label>
            </div>
          </div>

        </div>

        {/* Session set input */}
        <div>
          <p>Exam Session</p>
          <input type="text" placeholder="2021/2022" className="px-3 bg-inherit border-b-2 border-rose-800 rounded-md py-1" value={examPara?.schoolSession} onChange={(e) => { handleSetExamPara(e, 'schoolSession') }} />
        </div>

        {/* Exam date */}
        <div className="flex flex-col gap-1 ">
          <label>Exam Date and Time</label>
          <input value={examPara?.dateAndTime} onChange={(e) => { handleSetExamPara(e, 'dateAndTime')  }} type="datetime-local" className="bg-rose-800 rounded-md p-1" />
          <p>{examPara?.dateAndTime}</p>
        </div>

      </div>
      {questions?.map((q, questionIndex) => (
        <div key={questionIndex} className="flex flex-col w-5/12 gap-2 ">
          <div className="flex gap-2 items-center">
            {/* delete button */}
            <button className="h-[15px] w-[15px] ring-1 ring-white rounded-sm shadow-md bg-red-800 flex justify-center items-center" onClick={() => { handleQuestionDelete(questionIndex) }} >x</button>
            <p>Question {1 + questionIndex}</p>
          </div>

          <textarea
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => handleQuestionChange(questionIndex, e)}
            className="p-2 bg-inherit ring-2 ring-white rounded-md"
          />
          <p className="text-gray-500">
            Note: You must tick one of the options as your correct answer
          </p>
          {q?.options?.map((option, optionIndex) => (
            <div key={optionIndex} className="flex gap-2">
              <input
                type="text"
                placeholder={`Option ${numberToAlphabet(optionIndex + 1)}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e)
                }
                className="p-2 bg-inherit border-b rounded-md"
              />
              <input
                type="radio"
                id={`opt-${questionIndex}-${optionIndex}`}
                name={`opt-${questionIndex}`}
                value={option}
                checked = {handleCheck(questionIndex, option)}
                disabled={!option}
                onChange={() => { handleSetAnswer(questionIndex, option) }}
              />
            </div>
          ))}
          <div>{`answer: ${questions[questionIndex].answer}`}</div>
        </div>
      ))}
      <div className="flex-inline gap-3">
        <button
          className="bg-slate-800 p-2 rounded-md mr-3"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          className="ring-2 ring-white p-2 rounded-md"
          onClick={() => console.log(questions)}
        >
          Save Questions
        </button>
      </div>
    </div>
  );
};

export default QuestionsComponent;
