import connectDB from "@/models/db/connectDB";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("entering the student registration api function...");

  try {
    await connectDB();
    const studentData = await req.json();
    console.log("extracting form data from req body...");


    if (!studentData) {
      return NextResponse.json(
        {
          success: false,
          error: "fill the form",
        },
      );
    }
    console.log("checking to see if student is already existing...");

    // check to see if the student already existed in the database
    const matricNo = studentData.matricNo.toUpperCase() 
    const existingStudent = await Student.findOne({ matricNo });
    if (existingStudent) {
    return NextResponse.json(
        {
        success: false,
        error: "Matric Number already exists.",
        },
    );
    }
    console.log("registering a student into the database...");

    // make the student matric number upper case
    studentData.matricNo = studentData.matricNo.toUpperCase()
    // Insert the new staff into the database ---
    const newStudent = await Student.create(studentData);
    if (!newStudent) {
    return NextResponse.json(
        {
        success: false,
        error: `Something went wrong! Try again`,
        },
    );
    }
    console.log("successfully registered... ", newStudent);
    return NextResponse.json(
    {
        success: true,
        message: `Registration successful!`,
        data: newStudent,
    },
    { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        error: `internal server error ${err}`,
      },
      { status: 500 }
    );
  }
}
