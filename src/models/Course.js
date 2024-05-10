import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    code: {
      type: String,
    },
    staffs: {
      type: Array,
    },
    students: {
        type: Array,
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
