"use client";

import { useState, useEffect, useRef} from "react";
import { numberToAlphabet } from "@/UtilityFunctions/numberToAlphabet";
import { ActionCommand, useAppContext } from "@/appContext/appState";
import toast from "react-hot-toast";

const paramInit = {
  course: "",
  testMinDuration: "",
  schoolSession: "",
  dateAndTime: "",
};

const courseQuesInit = {
   questions: [], params: paramInit
};

const QuestionsComponent = ({ userInfo, isViewing=false, courseQues=courseQuesInit, setViewingQues }) => {
  const { state, dispatch } = useAppContext();

  const bottomRef = useRef(null)

  const [questions, setQuestions] = useState([
    { question: "", answer: "", options: ["", "", "", ""] },
  ]);

  //NOTE: the course property here refers only to the course code
  const [examPara, setExamPara] = useState({
    course: "",
    testMinDuration: "",
    schoolSession: "",
    dateAndTime: "",
  });

  console.log("is viewing?: ", isViewing)
  console.log("course ques obj: ", courseQues)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(isViewing === false){     
      const savedObject = localStorage.getItem("examObject")
        ? JSON.parse(localStorage.getItem("examObject"))
        : {};
      console.log("saved Object after reload: ", savedObject);
      if (savedObject?.questions && savedObject.questions.length > 0) {
        setQuestions(() => {
          return savedObject.questions;
        });
      }
      if (savedObject?.examPara) {
        setExamPara(() => {
          return savedObject.examPara;
        });
      }
    }
    
  }, []); 
  

  useEffect(()=>{
    if(isViewing === true){
      let questionList = []
       const handleQuestionLoading = () => {
         courseQues?.questions?.map((question) =>
          questionList.push({
            question: question.question,
            answer: question.answer,
            options: question.options,     
          })
         );
         setQuestions(questionList);
         setExamPara(courseQues?.params)
       };

       handleQuestionLoading()
    }
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [bottomRef, courseQues, isViewing])

  const addQuestion = () => {
    setQuestions((prev) => {
      return [...prev, { question: "", answer: "", options: ["", "", "", ""] }];
    });
    localStorage.setItem(
      "examObject",
      JSON.stringify({ questions: [...questions], examPara: { ...examPara } })
    );
  };

 

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(() => {
      return updatedQuestions;
    });
    // store changes in browser
    localStorage.setItem(
      "examObject",
      JSON.stringify({
        questions: [...updatedQuestions],
        examPara: { ...examPara },
      })
    );
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(() => {
      return updatedQuestions;
    });
    localStorage.setItem(
      "examObject",
      JSON.stringify({
        questions: [...updatedQuestions],
        examPara: { ...examPara },
      })
    );
  };

  const handleQuestionDelete = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(() => {
      return [...updatedQuestions];
    });
    localStorage.setItem(
      "examObject",
      JSON.stringify({
        questions: [...updatedQuestions],
        examPara: { ...examPara },
      })
    );
  };

  const handleSetAnswer = (questionIndex, option) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = option;
    setQuestions(() => {
      return [...updatedQuestions];
    });
    localStorage.setItem(
      "examObject",
      JSON.stringify({
        questions: [...updatedQuestions],
        examPara: { ...examPara },
      })
    );
  };

  const handleSetExamPara = (e, key) => {
    console.log("function called with key: ", key);
    setExamPara((prev) => {
      return { ...prev, [key]: e.target.value };
    });
    // save update in browser storage
    localStorage.setItem(
      "examObject",
      JSON.stringify({ questions: [...questions], examPara: { ...examPara } })
    );
  };

  // call api to save the questions into the subject db
  const handleQuestionSaving = async () => {
    setLoading(true);

    if (!examPara.course) {
      // window.alert("course input empty");
      toast.error("course input empty");
      setLoading(false);
    } else if (
      !examPara.testMinDuration ||
      !examPara.schoolSession ||
      !examPara.dateAndTime
    ) {
      console.log("fill all exam parameters");
      // window.alert("fill all forms");
      toast.error("fill all the form inputs");
      setLoading(false);
      return;
    }

    const selectedCourse = state?.courses?.find(
      (course) => course.code == examPara.course
    );
    console.log("selectedCourse: ", selectedCourse);
    const { _id } = selectedCourse;
    console.log("code selected: ", examPara.course);
    console.log("question _id to update: ", _id);

    const res = await fetch("/api/course/addExamQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        question: { questions: questions, params: examPara },
      }),
    });
    if (!res.ok) {
      console.log("api failure");
      toast.error("failed to make api call");
      setLoading(false);
      return;
    }
    const _res = await res.json();
    if (!_res.success) {
      console.log(_res.error);
      toast.error(_res.error);
    } else {
      console.log(_res.message);
      const newData = _res.data;
      dispatch({type: ActionCommand.UPDATE_COURSES, payload: newData})
      // setCourses([...courses, newData]);
      toast.success(_res.message);

      // empty the question form when questions saved sucessfully
      localStorage.setItem(
        "examObject",
        JSON.stringify({ questions: [], examPara: paramInit })
      );
    }
    setLoading(false);
    setViewingQues(false)
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        {/* Course choose input */}
        <div className="mr-3">
            <p className="font-bold mb-2">
              {userInfo?.courses?.length > 0
                ? `Choose Course`
                : `No Course Registered`}
            </p>
          <select
            className="py-1 px-2 bg-inherit ring-2 ring-white rounded-md"
            value={examPara?.course}
            onChange={(e) => {
              handleSetExamPara(e, "course");
            }}
            required
          >
            <option value="" className="bg-inherit text-slate-800">
              Select Course
            </option>
            { userInfo?.courses?.length > 0
              ? userInfo?.courses?.map((code, i) => (
                  <option
                    key={i}
                    value={code}
                    className="bg-inherit text-slate-800"
                  >
                    {code}
                  </option>
                ))
              : "No Course Registered"}
          </select>
        </div>
        {/* Exam Duration Set inputs */}
        <div className="flex flex-col gap-1 ">
          <p>Duration:</p>

          {/* Minute set input */}
          <div className="flex flex-col w-5/12 relative ">
            <input
              type="number"
              placeholder="00"
              disabled={userInfo?.courses?.length < 1}
              className=" text-rose-800 px-2 bg-inherit border-b border-green-800"
              value={parseInt(examPara?.testMinDuration)}
              onChange={(e) => {
                handleSetExamPara(e, "testMinDuration");
              }}
            />
            <label className="absolute right-[0px] text-slate-400 ">Min</label>
          </div>
        </div>

        {/* Session set input */}
        <div>
          <p>Exam Session</p>
          <input
            readOnly
            type="text"
            placeholder="2021/2022"
            disabled={userInfo?.courses?.length < 1}
            className="px-3 bg-inherit border-b-2 border-rose-800 rounded-md py-1"
            value={examPara?.schoolSession}
            onChange={(e) => {
              handleSetExamPara(e, "schoolSession");
            }}
          />
        </div>

        {/* Exam date */}
        <div className="flex flex-col gap-1 ">
          <label>Exam Date and Time</label>
          <input
            value={examPara?.dateAndTime}
            disabled={userInfo?.courses?.length < 1}
            onChange={(e) => {
              handleSetExamPara(e, "dateAndTime");
            }}
            type="datetime-local"
            className="bg-rose-800 rounded-md p-1"
          />
          <p>{examPara?.dateAndTime}</p>
        </div>
      </div>
      <div className="">
      {questions?.map((q, questionIndex) => (
        <div key={questionIndex} className="flex flex-col w-5/12 gap-2 mt-5">
          <div className="flex gap-2 items-center">
            {/* delete button */}
            <button
              className="h-[15px] w-[15px] ring-1 ring-white rounded-sm shadow-md bg-red-800 flex justify-center items-center"
              onClick={() => {
                handleQuestionDelete(questionIndex);
              }}
            >
              x
            </button>
            <p>Question {1 + questionIndex}</p>
          </div>

          <textarea
            placeholder="Enter question"
            value={q.question}
            disabled={userInfo?.courses?.length < 1}
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
                checked={questions[questionIndex].answer == option}
                disabled={!option}
                onChange={() => {
                  handleSetAnswer(questionIndex, option);
                }}
              />
            </div>
          ))}
          <div>{`answer: ${questions[questionIndex].answer}`}</div>
        </div>
      ))}
      </div>
      <div ref={bottomRef} className="flex-inline gap-3">
        <button
          className="bg-slate-800 p-2 rounded-md mr-3"
          onClick={addQuestion}
          disabled={userInfo?.courses?.length < 1 || loading}
        >
          Add Question
        </button>
        <button
          className="ring-2 ring-white p-2 rounded-md"
          disabled={userInfo?.courses?.length < 1 || loading}
          onClick={handleQuestionSaving}
        >
          {loading ? `Saving...` : `Save Questions`}
        </button>
      </div>
    </div>
  );
};

export default QuestionsComponent;
