import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Student from "@/models/Student";

export async function GET(req) {
  try {
    await connectDB();

    //   Fetch all students
    const students = await Student.find({});

    //   WHEN NO DATA IS RETURN FROM THE DATABASE
    if (students.length === 0) {
      console.log("No Student Found");
      return NextResponse.json({
        success: false,
        error: "No Student Found",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("all students returned: ", students);
    return NextResponse.json({
      success: true,
      message: "students info returned",
      data: students,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
