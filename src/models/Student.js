import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    middlename: {
      type: String,
    },
    lastname: {
        type: String,
      },
    phone: {
      type: String,
    },
    studentID: {
        type: String,
    },
    email: {
      type: String,
    },
    hashedPwd: {
      type: String,
    },
    username: {
      type: String,
    },
    birthdayMonth: {
      type: String,
    },
    image: {
      type: String,
    },
    birthDay: {
      type: Number,
    },
    dept: {
      type: String,
    },
    gender: {
      type: String,
    },
    residentialAddress: {
      type: String,
    },
  },
  { timestamps: true }
);



const Student = mongoose.models["Student"] || mongoose.model("Student", StudentSchema);

export default Student;
