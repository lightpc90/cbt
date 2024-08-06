"use client";

import StudentLayout from "./StudentLayout";
import StudentForm from "./StudentForm";
import { useAppContext } from "@/appContext/appState";

import { BsFilterSquareFill, BsFilterSquare } from "react-icons/bs";
import { RiFilterFill } from "react-icons/ri";
import { IStudent } from "@/components/types/types";

const ManageStudent = ({ data }) => {
  const { state } = useAppContext();

  // const [students, setStudents] = useState(studentsData?.length > 0 ? studentsData : [])
  return (
    <div className="">
      <p className="text-2xl font-bold my-2">Manage Students</p>
      <div className="flex gap-2">
        <div className="bg-slate-700 h-[600px] w-[30%] rounded-md overflow-auto">
          <p className="bg-rose-900 p-1 text-lg font-bold text-center">
            Add Student
          </p>
          <StudentForm />
        </div>
        {/* All Published Questions container */}
        <div className="bg-slate-700 h-[800px] w-[70%] rounded-md overflow-auto">
          <p className="bg-rose-900 p-1 font-bold text-center text-lg">
            Students
          </p>
          <div className="flex p-2 space-x-2">
            <input
              type="text"
              placeholder="search student by name"
              className="p-2 text-slate-900"
            />
            <button className="flex gap-1 items-center bg-slate-900 px-2 rounded-md">
              Filter <RiFilterFill />
            </button>
          </div>
          <div className="h-[85%] overflow-auto flex flex-col p-2 gap-2">
            {/* list of Students */}
            {state?.students?.map((student: IStudent, i: number) => (
              <StudentLayout key={i} student={student} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
