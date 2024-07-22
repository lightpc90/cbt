import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Course from "@/models/Course";

export async function GET(req) {
  try {
    await connectDB();

    //   FIND THE COURSE INFO USING THE COURSE ID
    const courses = await Course.find({});

    //   WHEN NO COURSE INFO IS RETURN FROM THE DATABASE
    if (courses.length === 0) {
      console.log("No course Registered");
      return NextResponse.json({
        success: false,
        error: "No course Registered",
      });
    }
    //   WHEN A COURSE INFO IS RETURNED FROM THE DATABASE
    console.log("all courses returned: ", courses);
    return NextResponse.json({
      success: true,
      message: "course info returned",
      data: courses,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
