import Staff from "@/models/Staff";
import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, pwd, admin } = await req.json();

    // check if email and password is entered
    if (!(email && pwd)) {
      return NextResponse.json(
        { success: false, error: "Please enter email and password" },
        { status: 400 }
      );
    }
    console.log("credentials submitted passed...");

    // connect to database
    await connectDB();
    const _email = email.toLowerCase();
    // LOGGIN IN WITH EMAIL
    const staff = await Staff.findOne({ email: _email });
    console.log("retrieved Staff: ", staff);
  
    // if no user was found
    if (!staff || !staff.hashedPwd) {
      console.log("no user or no user hashedPwd: ", staff);
      return NextResponse.json(
        { success: false, error: "No staff found" },
        { status: 401 }
      );
    }

    // check if password matches
    const passwordMatch = await bcrypt.compare(pwd, staff.hashedPwd);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          error: "Incorrect Password",
        },
        { status: 400 }
      );
    }
    // check if he is an admin if admin passed in the login form
    if(admin){
      if(staff.admin === false){
        return NextResponse.json({
          success: false,
          errror: 'You are not an admin'
        }, {status: 401})
      }
    }

    // create a token for the user
    const _staff = { ...staff, hashedPwd: "" };
    console.log("staff object: ", _staff)
    const staffData = _staff._doc
    const _staffData = {...staffData, hashedPwd: ""}
    console.log("staff data passed to accesstoken: ", _staffData)
    console.log("staff data doc info", staffData)

    //create JWT
    const accessToken = jwt.sign(_staffData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    console.log("access token: ", accessToken)

    // if user found and passwords matched
    return NextResponse.json(
      {
        success: true,
        message: "Successfully logged in",
        accessToken,
        data: _staffData,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
  }
}
