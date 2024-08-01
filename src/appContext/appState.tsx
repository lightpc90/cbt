"use client";

import { createContext, useContext, useState, useReducer } from "react";
import { ICourse, IStaff, IStudent } from "@/components/interfaces/interfaces";

interface State {
  students: IStudent[];
  staffs: IStaff[];
  courses: ICourse[];
  loading: false;
}

type Action =
  | { type: "SET_STUDENTS"; payload?: IStudent[] }
  | { type: "SET_STAFFS"; payload?: IStaff[] }
  | { type: "SET_COURSES"; payload?: ICourse[] }
  | { type: "SET_LOADING"; payload?: boolean }
  | { type: "CLEAR_ALL" };

export enum ActionCommand {
  SET_STUDENTS = "SET_STUDENTS",
  SET_STAFFS = "SET_STAFFS",
  SET_COURSES = "SET_COURSES",
  SET_LOADING = "SET_LOADING",
  CLEAR_ALL = "CLEAR_ALL",
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload };
    case "SET_STAFFS":
      return { ...state, staffs: action.payload };
    case "SET_COURSES":
      return { ...state, courses: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "CLEAR_ALL":
      return { students: [], staffs: [], courses: [], loading: false };
    default:
      return state;
  }
}

const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const initialState: State = {
    students: [],
    staffs: [],
    courses: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // State for the app context.
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [courses, setCourses] = useState([]);

  const [userData, setUserData] = useState(
    typeof window !== "undefined" ? localStorage.getItem("userData") : {}
  );
  const [currentUserId, setCurrentUserId] = useState(
    typeof window !== "undefined" ? localStorage.getItem("currentUserId") : ""
  );

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        userData,
        setUserData,
        currentUserId,
        setCurrentUserId,
        students,
        setStudents,
        staffs,
        setStaffs,
        courses,
        setCourses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
