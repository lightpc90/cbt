import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Staff from "@/models/Staff";

export async function GET(req) {
  try {
    await connectDB();

    //   FIND THE USER INFO USING THE USER ID
    const staffs = await Staff.find({})

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (staffs.length === 0) {
      console.log("No staff Registered");
      return NextResponse.json({
        success: false,
        error: "No staff Registered",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("all staffs returned: ", staffs);
    return NextResponse.json({
      success: true,
      message: "staff info returned",
      data: staffs,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
