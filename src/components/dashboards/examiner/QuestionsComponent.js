"use client";

import { useState } from "react";

const QuestionsComponent = () => {
  const [questions, setQuestions] = useState([
    { question: "", answer: "", options: ["", "", "", ""] },
  ]);

  const [examPara, setExamPara] = useState({ course: '', hourDuration: '', minDuration: '', session: '' })

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answer: "", options: ["", "", "", ""] },
    ]);
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionDelete = (questionIndex) => {
    questions.splice(questionIndex, 1);
    setQuestions([...questions]);
  }

  const handleSetAnswer = (questionIndex, option) => {
    questions[questionIndex].answer = option;
    setQuestions([...questions])
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        {/* Course choose input */}
        <div>
          <p className="font-bold mb-2">Choose Course</p>
          <select
            className="py-1 px-2 bg-inherit ring-2 ring-white rounded-md"
            value={examPara.course}
            onChange={(e) => { setExamPara({ ...examPara, course: e.target.value }) }}
          >
            <option value='generalKnowledge' className="bg-inherit">General Knowledge</option>
          </select>
        </div>
        {/* Exam Duration Set inputs */}
        <div className="flex flex-col gap-1 ">
          <p>Duration:</p>
          <div className="flex gap-1">
            {/* Hour set input */}
            <div className="flex flex-col w-3/12 relative">
              <input type="number" placeholder="0" className="text-rose-800 px-2 bg-inherit border-b border-rose-800 " value={examPara.hourDuration} onChange={(e) => { setExamPara({ ...examPara, hourDuration: e.target.value }) }} />
              <label className="absolute right-[30px] text-slate-400 ">Hour</label>
            </div>
            {/* Minute set input */}
            <div className="flex flex-col w-3/12 relative ">
              <input type="number" placeholder="00" className=" text-rose-800 px-2 bg-inherit border-b border-green-800" value={examPara.minDuration} onChange={(e)=>{setExamPara({...examPara, minDuration: e.target.value})}} />
              <label className="absolute right-[30px] text-slate-400 ">Min</label>
            </div>
          </div>

        </div>

        {/* Session set input */}
        <div>
          <p>Exam Session</p>
          <input type="text" placeholder="2021/2022" className="px-3 bg-inherit border-b-2 border-rose-800 rounded-md" value={examPara.session} onChange={(e)=>{setExamPara({...examPara, session: e.target.value})}} />
        </div>

      </div>
      {questions.map((q, questionIndex) => (
        <div key={questionIndex} className="flex flex-col w-5/12 gap-2">
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
          {q.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex gap-2">
              <input
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
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
                disabled={!option}
                onClick={() => { handleSetAnswer(questionIndex, option) }}
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
