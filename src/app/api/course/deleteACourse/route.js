import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Course from "@/models/Course";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  const { _id } = await req.json();
  try {
    await connectDB();

    const deletedDoc = await Course.findByIdAndDelete({ _id });

    //   WHEN NO COURSE INFO IS RETURN FROM THE DATABASE
    if (!deletedDoc) {
      console.log("Failed to delete course");
      return NextResponse.json({
        success: false,
        error: "Failed to delete course!",
      });
    }

    revalidateTag("courses")
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
