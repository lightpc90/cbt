import Student from "@/models/Student";
import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req) {
  try {
    const { matricNo, surname } = await req.json();

    console.log("matric No: ", matricNo, "surname: ", surname)

    // check if email and password is entered
    if (!matricNo || !lastname) {
      return NextResponse.json(
        { success: false, error: "Please enter matricNo and lastname" },
      );
    }
    console.log("credentials submitted passed...");

    // connect to database
    await connectDB();
    const _matricNo = matricNo.toLowerCase();
    // LOGGIN IN WITH Matric No
    const student = await Student.findOne({ matricNo: _matricNo });
    console.log("retrieved student: ", student);
  
    // if no student was found
    if (!student) {
      console.log("no student found: ", student);
      return NextResponse.json(
        { success: false, error: "No student found" },
      );
    }

    // check if lastname matches

    if(matricNo.lastname !== student.lastname){
        return NextResponse.json(
            {
              success: false,
              error: "incorrect password/lastname",
            },
          );
    }

    // create a token for the student
    const studentData = student._doc
    const _studentData = {
        firstname: studentData.firstname, 
        middlename: studentData.middlename, 
        lastname: studentData.lastname, 
        matricNo: studentData.matricNo,
        dept: studentData.dept,
        level: studentData.level
     }
    console.log("student data passed for jwt sign", _studentData)

    //create JWT
    const accessToken = jwt.sign(_studentData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    console.log("access token: ", accessToken)

    // if student found and passwords matched
    const response = NextResponse.json(
      {
        success: true,
        message: "Successfully logged in",
        data: _staffData,
      },
      { status: 201 }
    );

    response.cookies.set('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //use secure cookies in production
      maxAge: 60 * 60 * 24, // 1 day
      path: '/', 
    })
    return response;

  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false, error: "Internal Server Error"
    }, {status: 500})
  }
}
