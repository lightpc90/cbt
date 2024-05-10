import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import Staff from "@/models/Staff";

export async function POST(req) {
  const { _id } = await req.json();
  try {
    await connectDB();

    //   FIND THE Staff INFO USING THE Staff ID
    const deletedDoc = await Staff.deleteOne({ _id });

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (deletedDoc.deletedCount !== 1) {
      console.log("Failed to delete staff");
      return NextResponse.json({
        success: false,
        error: "Failed to delete staff!",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    return NextResponse.json({
      success: true,
      message: "Staff successfully deleted",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
