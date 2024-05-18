import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Staff from "@/models/Staff";

export async function POST(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    //   WHEN NO STAFF ID IS SENT FROM THE CLIENT SIDE
    if (!id) {
      return NextResponse.json({ success: false, error: "No staff id" });
    }

    //   FIND THE STAFF INFO USING THE USER ID
    const staff = await Staff.findById(id);

    //   WHEN NO STAFF INFO IS RETURN FROM THE DATABASE
    if (!staff) {
      console.log("No staff with such Id");
      return NextResponse.json({
        success: false,
        error: "No staff with such ID",
      });
    }
    //   WHEN A STAFF INFO IS RETURNED FROM THE DATABASE
    return NextResponse.json({
      success: true,
      message: "staff info returned",
      data: staff,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
