"use client";

import { createContext, useContext, useState, useReducer, ReactElement, Dispatch, SetStateAction, DispatchWithoutAction } from "react";
import { ICourse, IStaff, IStudent } from "@/components/interfaces/interfaces";
import { Types } from "mongoose";
import { iStaff } from "@/components/InitialData/initialData";

interface State {
  students: IStudent[];
  staffs: IStaff[];
  courses: ICourse[];
  loading: boolean;
}

type Action =
  | { type: "SET_STUDENTS"; payload?: IStudent[] }
  | { type: "SET_STAFFS"; payload?: IStaff[] }
  | { type: "SET_COURSES"; payload?: ICourse[] }
  | { type: "SET_LOADING"; payload?: boolean }
  | { type: "ADD_STUDENT"; payload?: IStudent }
  | { type: "ADD_STAFF"; payload?: IStaff }
  | { type: "ADD_COURSE"; payload?: ICourse }
  | { type: "DELETE_COURSE"; payload?: string | Types.ObjectId }
  | { type: "DELETE_STAFF"; payload?: string | Types.ObjectId }
  | { type: "DELETE_STUDENT"; payload?: string | Types.ObjectId }
  | { type: "UPDATE_COURSES"; payload?: ICourse }
  | { type: "UPDATE_STAFFS"; payload?: IStaff }
  | { type: "UPDATE_STUDENTS"; payload?: IStudent }
  | { type: "CLEAR_ALL" };

export enum ActionCommand {
  SET_STUDENTS = "SET_STUDENTS",
  SET_STAFFS = "SET_STAFFS",
  SET_COURSES = "SET_COURSES",
  SET_LOADING = "SET_LOADING",
  ADD_STUDENT = "ADD_STUDENT",
  ADD_STAFF = "ADD_STAFF",
  ADD_COURSE = "ADD_COURSE",
  DELETE_COURSE = "DELETE_COURSE",
  DELETE_STAFF = "DELETE_STAFF",
  DELETE_STUDENT = "DELETE_STUDENT",
  UPDATE_COURSES = "UPDATE_COURSES",
  UPDATE_STAFFS = "UPDATE_STAFFS",
  UPDATE_STUDENTS = "UPDATE_STUDENTS",
  CLEAR_ALL = "CLEAR_ALL",
}

function reducer(state: State, action: Action): State  {
  switch (action.type) {
    // RUN SET ACTIONS
    case ActionCommand.SET_STUDENTS:
      return { ...state, students: action.payload };
    case ActionCommand.SET_STAFFS:
      return { ...state, staffs: action.payload };
    case ActionCommand.SET_COURSES:
      return { ...state, courses: action.payload };
    case ActionCommand.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionCommand.CLEAR_ALL:
      return { students: [], staffs: [], courses: [], loading: false };

    // RUN ADD ACTIONS
    case ActionCommand.ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload ]};
    case ActionCommand.ADD_STAFF:
      return { ...state, staffs: [...state.staffs, action.payload] };
    case ActionCommand.ADD_COURSE:
      return { ...state, courses: [...state.courses, action.payload] };

    // RUN DELETE ACTIONS
    case ActionCommand.DELETE_COURSE: {
      const newList = state.courses.filter(
        (existingCourse) => existingCourse._id !== action.payload
      );
      return { ...state, courses: newList };
    }
    case ActionCommand.DELETE_STAFF: {
      const newList = state.staffs.filter(
        (existingStaff) => existingStaff._id !== action.payload
      );
      return { ...state, staffs: newList };
    }
    case ActionCommand.DELETE_STUDENT: {
      const newList = state.students.filter(
        (existingStudent) => existingStudent._id !== action.payload
      );
      return { ...state, students: newList };
    }
    // RUN UPDATE ACTIONS
    case ActionCommand.UPDATE_COURSES: {
      const newList = state.courses.map((existingCourse) =>
        existingCourse._id === action.payload._id
          ? action.payload
          : existingCourse
      );
      return { ...state, courses: newList };
    }
    case ActionCommand.UPDATE_STAFFS: {
      const newList = state.staffs.map((existingStaff) =>
        existingStaff._id === action.payload._id
          ? action.payload
          : existingStaff
      );
      return { ...state, staffs: newList };
    }
    case ActionCommand.UPDATE_STUDENTS: {
      const newList = state.students.map((existingStudent) =>
        existingStudent._id === action.payload._id
          ? action.payload
          : existingStudent
      );
      return { ...state, students: newList };
    }
    default:
      return state;
  }
}

 const initialState: State = {
   students: [],
   staffs: [],
   courses: [],
   loading: false,
 };

const contextInit = {
  courses: [],
  staffs: [],
  students: [],
  loading: false,
  state: initialState,
  dispatch: () => null,
  userData: {firstname: ''},
};

const AppContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | {}
>(contextInit);

export const useAppContext = () => {
  useContext(AppContext)
};

export const AppProvider = ({ children }:{children: ReactElement | ReactElement[]}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [userData, setUserData] = useState<IStaff>(
    typeof window !== "undefined"
      ? localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData"))
      : iStaff
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
