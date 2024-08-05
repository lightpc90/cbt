"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ActionCommand, useAppContext } from "@/appContext/appState";
import { useRouter } from "next/navigation";
import { ICourse } from "@/components/types/types";
import { Types } from "mongoose";

const CourseManagement = ({ userInfo, data }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");

  // loading states
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

  // find course selected from the list of courses list using course code
  const getCourse = (courseCode: string) => {
    const _courseSelected = state.courses?.find(
      (course: ICourse) => course.code == courseCode
    );
    return _courseSelected;
  };

  const getDraftQuestions = () => {
    const _drafts = state.courses?.filter(
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
    const _published = state.courses?.filter(
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
  }, [state.courses]);

  const newList = (prev, updated) => {
    return prev.filter((eachPrev) =>
      eachPrev._id == updated._id ? updated : eachPrev
    );
  };

  const publishOrPulldownQuestion = async (
    option: boolean,
    id: number | Types.ObjectId
  ) => {
    // if(option === true){
    //   setIsPublishing(true)
    // }
    // else if(option === false){
    //   setIsDrafting(true)
    // }
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
      return;
    }
    const _res = await res.json();
    if (_res.success === false) {
      console.log("error: ", _res.error);
      toast.success(_res.error);
    } else if (_res.success === true) {
      dispatch({ type: ActionCommand.UPDATE_COURSES, payload: _res.data });
      console.log("message: ", _res.message);
      toast.success(_res.message);
      // setCourses((prev) => newList(prev, newDoc));
      router.refresh();
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold my-2">Course Management</p>
      <div className="h-[250px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto">
        <p className="bg-rose-800 p-1 text-white">My Course(s)</p>
        <div className="p-2 flex gap-2 overflow-auto">
          {userInfo?.courses?.length > 0
            ? userInfo?.courses?.map((code, i) => (
                <div
                  key={i}
                  className="bg-slate-900 text-white p-1 h-[180px] w-[150px] rounded-md overflow-auto "
                >
                  <p>{code}</p>
                  <p className="text-rose-400">{getCourse(code)?.title}</p>
                </div>
              ))
            : `No Course(s) Registered Yet`}
        </div>
      </div>
      <div className="h-[250px] bg-gray-300 font-semibold rounded-md shadow-md my-3 overflow-auto">
        <p className="bg-rose-800 p-1 text-white">Draft Questions</p>
        <div className="px-2 py-1 overflow-auto flex gap-2">
          {drafts.length > 0
            ? drafts.map((draft, i) => (
                <div
                  className="w-[200px] h-[210px] bg-slate-900 text-white p-2 overflow-auto rounded-md shadow-md"
                  key={i}
                >
                  <p>{`${draft.code} Question`}</p>
                  <p className="text-rose-400 text-sm">{draft.title}</p>
                  <p className="text-sm">{`${draft.question?.questions?.length} questions`}</p>
                  <p className="text-sm">{`Duration: ${draft.question?.params?.testMinDuration}Mins`}</p>
                  <p className="text-rose-400 text-sm">{`Exam Date and Time: ${draft.question?.params?.dateAndTime}`}</p>
                  <hr className="my-2" />
                  <div className="space-x-2">
                    <Link
                      className="border border-rose-400 p-1 hover:bg-rose-500"
                      href={`/`}
                    >
                      View
                    </Link>
                    <button
                      onClick={() => publishOrPulldownQuestion(true, draft._id)}
                      className="bg-rose-800 py-1 px-2 hover:bg-rose-500"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              ))
            : `No Draft Questions`}
        </div>
      </div>
      <div className="h-[250px] bg-gray-300 text-slate-800 font-semibold rounded-md shadow-md my-3 overflow-auto">
        <p className="bg-rose-800 p-1 text-white">Published Questions</p>
        <div className="px-2 py-1 overflow-auto flex gap-2">
          {published.length > 0
            ? published.map((published, i) => (
                <div
                  className="w-[200px] h-[210px] bg-slate-900 text-white p-2 overflow-auto rounded-md shadow-md"
                  key={i}
                >
                  <p>{`${published.code} Question`}</p>
                  <p>{published.title}</p>
                  <p className="text-sm">{`${published.question?.questions?.length} questions`}</p>
                  <p className="text-sm">{`Duration: ${published.question?.params?.testMinDuration}Mins`}</p>
                  <p className="text-rose-400 text-sm">{`Exam Date and Time: ${published.question?.params?.dateAndTime}`}</p>
                  <hr className="my-2" />
                  <div className="space-x-2">
                    <Link
                      className="border border-rose-400 p-1 hover:bg-rose-500"
                      href={`/`}
                    >
                      View
                    </Link>
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
            : `No Published Questions`}
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
