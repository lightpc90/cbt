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
    matricNo: {
        type: String,
    },
    email: {
      type: String,
    },
    hashedPwd: {
      type: String,
    },
    results: {
      type: [Object],
    },
    courses: {
      type: [String],
    },
    username: {
      type: String,
    },
    birthdayMonth: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    birthDay: {
      type: Number,
    },
    dept: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
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
