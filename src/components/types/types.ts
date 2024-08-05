import { StringSchemaDefinition, Types } from "mongoose";

// Define types for complex state objects
export type IStudent = {
  _id: Types.ObjectId | string;
  firstname: string;
  middlename: string;
  lastname: string;
  matricNo: string;
  timestamp: Date;
  phone?: number;
  imageUrl?: string;
  email?: string;
  result?: {}[];
  dob?: string;
  username?: string;
  image?: string;
  courses?: string[];
  gender?: string;
  dept?: string;
  active: boolean;
  residentialAddress?: string;
}

export type IStaff = {
  _id: Types.ObjectId | string;
  firstname: string;
  middlename: string;
  lastname: string;
  department: string;
  timestamp: string;
  createdPwd: boolean;
  staffID: string;
  phone?: string;
  username: string;
  dob:string;
  email?: string;
  title: string;
  admin: boolean;
  superUser: boolean;
  tempPwd?: string;
  image?: string;
  courses?: string[];
  gender?: string;
  dept?: string;
  active: boolean;
  residentialAddress?: string;
}

export type ICourse = {
  _id: Types.ObjectId | string;
  title: string;
  code: string;
  staffs?: {}[];
  students?: {}[];
  timestamp: Date;
  dept: string;
  level: number;
  question?: {
    questions: {}[];
    params: {
      dateAndTime: string;
      testMinDuration: string;
    };
  };
  results?: {};
  active: boolean;
  published: boolean;
  live: boolean;
}
