import connectDB from "@/models/db/connectDB";
import Staff from "@/models/Staff";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt")

export async function POST(req) {
  console.log("entering the api function...");

  try {
    await connectDB();
    const {email, tempPwd, pwd, confirmPwd} = await req.json();
    console.log("extracting form data from req body...");

    // check if the password and confirmPassword matches
    if (pwd !== confirmPwd) {
      return NextResponse.json(
        { error: "passwords do not match" },
        { status: 400 }
      );
    }

    if (!(email || tempPwd || pwd || confirmPwd)) {
      return NextResponse.json(
        {
          success: false,
          error: "form cannot be empty",
        },
        { status: 400 }
      );
    }
    console.log("checking to see if staff is already existing...");

    // check to see if the user already existed in the database
    const _email = email.toLowerCase(); 
    const existingStaff = await Staff.findOne({ email: _email, tempPwd: tempPwd });
    if (!existingStaff) {
    return NextResponse.json(
        {
        success: false,
        error: "Staff does not exist.",
        },
        { status: 400 }
    );
    }
    console.log("Staff creating password...");

    const _hashedPwd = await bcrypt.hash(pwd, 10);
    // Update staff password ---
    const doc = {...existingStaff, createdPwd: true, hashedPwd: _hashedPwd}
    const modifiedDoc = await User.findOneAndUpdate({email}, doc, {new: true})
    if (!modifiedDoc) {
    return NextResponse.json(
        {
        success: false,
        error: `Something went wrong! Try again`,
        },
        { status: 422 }
    );
    }
    console.log("Password created successfully!... ", modifiedDoc);
    return NextResponse.json(
    {
        success: true,
        message: `Registration successful!`,
        data: modifiedDoc,
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
