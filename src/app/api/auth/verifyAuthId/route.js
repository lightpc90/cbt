import connectDB from "@/models/connectDB";
import Staff from "@/models/Staff";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("entering the api function...");

  try {
    await connectDB();
    const { email } = await req.json();
    console.log("extracting form data from req body...");

    // check if email is provided with password
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "enter your email",
        },
        { status: 400 }
      );
    }
    console.log("checking to see if ID is not already existing...");

    // check to see if the user already existed in the database
      const _email = email.toLowerCase();
      let existingUser = await Staff.findOne({email: _email });
      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Email already exists.",
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: `ID can be added`,
        },
        { status: 200 }
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
