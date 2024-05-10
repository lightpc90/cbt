import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import Course from "@/models/Course";

export async function POST(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    //   WHEN NO COURSE ID IS SENT FROM THE CLIENT SIDE
    if (!id) {
      return NextResponse.json({ success: false, error: "No course id" });
    }

    //   FIND THE COURSE INFO USING THE USER ID
    const course = await Course.findById(id);

    //   WHEN NO COURSE INFO IS RETURN FROM THE DATABASE
    if (!course) {
      console.log("No course with such Id");
      return NextResponse.json({
        success: false,
        error: "No course with such ID",
      });
    }
    //   WHEN A COURSE INFO IS RETURNED FROM THE DATABASE
    return NextResponse.json({
      success: true,
      message: "course info returned",
      data: course,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
