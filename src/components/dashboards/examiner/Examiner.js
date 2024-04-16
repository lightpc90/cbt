import React from "react";
import QuestionsComponent from "./QuestionsComponent";

const Examiner = () => {
  return (
    <div className="h-screen bg-slate-900 text-white flex">
      {/* left pane */}
      <div className="w-2/12 flex flex-col bg-slate-950 h-full p-5 justify-between border-r-2">
        <div>
          {/* profile section */}
          <div className="p-2 flex flex-col justify-center items-center mb-10">
            <div className="h-[90px] w-[90px] rounded-full bg-slate-400 mb-5"></div>
            <p>Dr. J. Awonika</p>
            <p>Robotics Engineering</p>
            <p>2019/RTE/2055</p>
          </div>
          <hr />
          {/* Navigation section */}
          <div className="flex flex-col mt-10 gap-3">
            <button className="bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white">
              Set Test Questions
            </button>
            <button className="bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white">
              Manage Courses
            </button>
            <button className="bg-slate-800 py-1 rounded-md hover:ring-2 hover:ring-white">
              Results
            </button>
          </div>
        </div>
        {/* logout button */}
        <button className="bg-slate-700 py-1 rounded-md hover:ring-2 hover:ring-white">
          Logout
        </button>
      </div>
      {/* Right Pane */}
          <div className="text-white w-10/12 py-5 px-10 overflow-auto">
        {/* Set Questions Component */}
        <div className="">
          <p className="text-4xl font-bold my-5">Set Test Questions</p>
          <QuestionsComponent />
        </div>
      </div>
    </div>
  );
};

export default Examiner;
