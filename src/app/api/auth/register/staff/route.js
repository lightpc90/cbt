import connectDB from "@/models/db/connectDB";
import Staff from "@/models/Staff";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("entering the api function...");

  try {
    await connectDB();
    const staffData = await req.json();
    console.log("extracting form data from req body...");


    if (!staffData) {
      return NextResponse.json(
        {
          success: false,
          error: "fill the form",
        },
      );
    }
    console.log("checking to see if staff is already existing...");

    // check to see if the user already existed in the database
    const _email = staffData.email.toLowerCase(); 
    const existingUser = await Staff.findOne({ email: _email });
    if (existingUser) {
    return NextResponse.json(
        {
        success: false,
        error: "Email already exists.",
        },
    );
    }
    console.log("registering a staff into the database...");

    // Insert the new staff into the database ---
    const newStaff = await Staff.create(staffData);
    if (!newStaff) {
    return NextResponse.json(
        {
        success: false,
        error: `Something went wrong! Try again`,
        },
    );
    }
    console.log("successfully registered... ", newStaff);
    return NextResponse.json(
    {
        success: true,
        message: `Registration successful!`,
        data: newStaff,
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
