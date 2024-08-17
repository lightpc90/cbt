"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ActionCommand, useAppContext } from "@/appContext/appState";
import { useRouter } from "next/navigation";
import { ICourse } from "@/components/types/types";
import { Types } from "mongoose";
import { courseQuesInit } from "@/components/InitialData/question/questionInit";

import { FaDownload } from "react-icons/fa6";

import QuestionsComponent from "./QuestionsComponent";

const CourseManagement = ({ userInfo, data }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const [downloadHover, setDowloadOver] = useState(false);

  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const [viewingQues, setViewingQues] = useState(false);
  const [courseQues, setCourseQues] = useState();

  // loading states
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

  // Funtion used in Question View component
  const handleViewQues = (draftQues) => {
    setCourseQues(draftQues);
    setViewingQues(true);
  };

  // find course selected from the list of courses list using course code
  const getCourse = (courseCode: string) => {
    const _courseSelected = state?.courses?.find(
      (course: ICourse) => course.code == courseCode
    );
    return _courseSelected;
  };

  const getDraftQuestions = () => {
    const _drafts = state?.courses?.filter(
      (course: ICourse) =>
        userInfo.courses.includes(course.code) &&
        course.question?.questions.length > 0 &&
        course.published === false
    );
    if (_drafts.length > 0) {
      console.log("_drafts: ", _drafts);
      setDrafts(_drafts);
    }
  };

  const getPublishedQuestions = () => {
    const _published = state?.courses?.filter(
      (course) =>
        userInfo.courses.includes(course.code) &&
        course.question?.questions.length > 0 &&
        course.published === true
    );
    if (_published.length > 0) {
      setPublished(_published);
    }
  };

  useEffect(() => {
    getDraftQuestions();
    getPublishedQuestions();
    // getCourse();
  }, [state?.courses]);

  const publishOrPulldownQuestion = async (
    option: boolean,
    id: number | Types.ObjectId
  ) => {
    if (option === true) {
      setIsPublishing(true);
    } else if (option === false) {
      setIsDrafting(true);
    }
    const res = await fetch("/api/course/publishOrPulldownQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, published: option }),
    });
    if (!res.ok) {
      console.log("API failed");
      toast.error("Failed! Try again");
      setIsPublishing(false);
      setIsDrafting(false);
      return;
    }
    const _res = await res.json();
    if (_res.success === false) {
      console.log("error: ", _res.error);
      toast.success(_res.error);
    } else if (_res.success === true) {
      dispatch({ type: ActionCommand.UPDATE_COURSES, payload: _res.data });
      router.refresh();
      console.log("message: ", _res.message);
      toast.success(_res.message);
    }
    setIsPublishing(false);
    setIsDrafting(false);
  };

  const handleDowload = async (question: typeof courseQuesInit) => {
    try{
        const res = await fetch("/api/downloads/export-to-excel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(question),
        });
        if (!res.ok) {
          console.log("API failed");
          toast.error("Failed! Try again");
          return;
        }
        const blob = await res.blob();
        // create a URL for the Excel file and trigger the download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${question.params.course}-question.xlsx`;
        document.body.appendChild(a)
        a.click();
        // clean up
        document.body.removeChild(a)
        URL.revokeObjectURL(url);
    }catch(e){console.log("failed to export: ", e)}
  
  };

  return (
    <div>
      {viewingQues && courseQues && (
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900 p-10 overflow-auto">
          <QuestionsComponent
            userInfo={userInfo}
            isViewing={true}
            courseQues={courseQues}
            setViewingQues={setViewingQues}
          />
        </div>
      )}
      <p className="text-2xl font-bold my-2">Course Management</p>
      <div className="h-[200px]  text-slate-800 font-semibold  my-3 overflow-auto">
        <p className="bg-rose-800 px-2 py-1 text-sm ml-2 w-fit rounded-md text-white">
          My Course(s)
        </p>
        <div className="p-2 flex gap-2 overflow-auto">
          {userInfo?.courses?.length > 0
            ? userInfo?.courses?.map((code, i) => (
                <div
                  key={i}
                  className="bg-slate-700 text-white p-1 h-[130px] w-[150px] rounded-md overflow-auto "
                >
                  <p>{code}</p>
                  <p className="text-rose-400">{getCourse(code)?.title}</p>
                </div>
              ))
            : `No Course(s) Registered Yet`}
        </div>
      </div>
      <div className="h-[290px] font-semibold my-3 overflow-auto">
        <p className="bg-rose-800 px-2 py-1 text-sm ml-2 w-fit rounded-md mb-3 text-white">
          Draft Questions
        </p>
        <div className="px-2 py-1 overflow-auto flex gap-2">
          {drafts.length > 0
            ? drafts.map((draft, i) => (
                <div
                  className="w-[200px] h-[210px] bg-slate-700 text-white p-2 overflow-auto rounded-md shadow-md relative"
                  key={i}
                >
                  <p>{`${draft.code} Question`}</p>
                  <p className="text-rose-400 text-sm">{draft.title}</p>
                  <p className="text-sm">{`${draft.question?.questions?.length} questions`}</p>
                  <p className="text-sm">{`Duration: ${draft.question?.params?.testMinDuration}Mins`}</p>
                  <p className="text-rose-400 text-sm">{`Exam Date and Time: ${draft.question?.params?.dateAndTime}`}</p>
                  <hr className="my-2" />
                  <div className="flex gap-2 items-center justify-between">
                    <button
                      className="border border-rose-400 py-1 px-2 text-sm hover:bg-rose-500"
                      onClick={() => handleViewQues(draft.question)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => publishOrPulldownQuestion(true, draft._id)}
                      className="bg-rose-800 py-1 px-2 text-sm hover:bg-rose-500"
                    >
                      Publish
                    </button>
                    {/* button to download question obj as an excel file */}
                    {downloadHover && (
                      <div className="absolute bottom-12 text-sm right-0 bg-slate-200 text-slate-900 p-2 rounded-lg shadow-lg">
                        Download as an Excel file
                      </div>
                    )}
                    <button
                      onMouseEnter={() => setDowloadOver(true)}
                      onMouseLeave={() => setDowloadOver(false)}
                      onClick={() => handleDowload(draft.question)}
                      className="hover:text-green-700"
                    >
                      <FaDownload size={22} />
                    </button>
                  </div>
                </div>
              ))
            : `No Draft Questions`}
        </div>
      </div>
      <div className="h-[250px]  text-slate-800 font-semibold my-3 overflow-auto">
        <p className="bg-rose-800 px-2 py-1 text-sm ml-2 text-white w-fit mb-3 rounded-md ">
          Published Questions
        </p>
        <div className="px-2 py-1 overflow-auto flex gap-2">
          {published.length > 0 ? (
            published.map((published, i) => (
              <div
                className="w-[200px] h-[210px] bg-slate-700 text-white p-2 overflow-auto rounded-md shadow-md"
                key={i}
              >
                <p>{`${published.code} Question`}</p>
                <p>{published.title}</p>
                <p className="text-sm">{`${published.question?.questions?.length} questions`}</p>
                <p className="text-sm">{`Duration: ${published.question?.params?.testMinDuration}Mins`}</p>
                <p className="text-rose-400 text-sm">{`Exam Date and Time: ${published.question?.params?.dateAndTime}`}</p>
                <hr className="my-2" />
                <div className="space-x-2">
                  {/* <Link
                      className="border border-rose-400 p-1 hover:bg-rose-500"
                      href={`/`}
                    >
                      View
                    </Link> */}
                  <button
                    onClick={() =>
                      publishOrPulldownQuestion(false, published._id)
                    }
                    className="bg-rose-800 py-1 px-2 hover:bg-rose-500"
                  >
                    Pulldown
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No Published Questions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
