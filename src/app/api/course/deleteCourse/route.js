import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Course from "@/models/Course";

export async function POST(req) {
  const { _id } = await req.json();
  try {
    await connectDB();

    //   FIND THE USER INFO USING THE USER ID
    const deletedDoc = await Course.deleteOne({ _id });

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (deletedDoc.deletedCount !== 1) {
      console.log("Failed to delete course");
      return NextResponse.json({
        success: false,
        error: "Failed to delete course!",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    return NextResponse.json({
      success: true,
      message: "Course successfully deleted",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
