import Staff from "@/models/Staff";
import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, pwd, admin } = await req.json();

    console.log("email: ", email, "pwd: ", pwd, "admin? ", admin);

    // check if email and password is entered
    if (!email || !pwd) {
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

    // check if he is an admin if admin passed in the login form
    if (admin) {
      if (staff.admin === false) {
        console.log("You are not an admin");
        return NextResponse.json({
          success: false,
          error: "You are not an admin",
        });
      }
    }

    // if no user was found
    if (!staff || !staff.hashedPwd) {
      console.log("no user or no user hashedPwd: ", staff);
      return NextResponse.json({ success: false, error: "No staff found" });
    }

    // check if password matches
    const passwordMatch = await bcrypt.compare(pwd, staff.hashedPwd);

    if (!passwordMatch) {
      console.log("password not matched");
      return NextResponse.json({
        success: false,
        error: "Incorrect Password",
      });
    }

    // create a token for the user
    const _staff = { ...staff, hashedPwd: "" };
    console.log("staff object 1: ", _staff);
    const staffData = _staff._doc;
    const _staffData = { ...staffData, hashedPwd: "" };
    console.log("staff data passed to accesstoken: ", _staffData);
    console.log("staff data doc info", staffData);

    //create JWT
    const accessToken = jwt.sign(_staffData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    console.log("access token: ", accessToken);

    // if user found and passwords matched
    const response = NextResponse.json(
      {
        success: true,
        message: "Successfully logged in",
        data: _staffData,
      },
      { status: 201 }
    );

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //use secure cookies in production
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false, error: "Internal Server Error"
    }, {status: 500})
  }
}
