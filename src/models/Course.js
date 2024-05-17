import mongoose from "mongoose";
import Student from "./Student";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    code: {
      type: String,
    },
    staffs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Staff"
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Student"
    },
    dept: {
      type: String,
    },
    level: {
        typeof: String
    },
    question: {
        type: Object
    },
    results: {
      type: [{questions: [{question: String, answer: String}], studentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: Student
      }, score: String}]
    },
    published: {
        type: Boolean,
        default: false
    },
    live: {
        type: Boolean,
        default: false
    }
},
  { timestamps: true }
);



const Course = mongoose.models["Course"] || mongoose.model("Course", CourseSchema);

export default Course;
