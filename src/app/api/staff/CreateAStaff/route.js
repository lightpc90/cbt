import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import Staff from "@/models/Staff";

export async function POST(req) {
  const eventDoc = await req.json();
  try {
    await connectDB();

    //  CREATE A NEW STAFF ENTRY
    const newStaff = await Staff.create(eventDoc);

    //   IF NEW STAFF IS NOT CREATED AND RETURNED FROM THE DATABASE
    if (!newStaff) {
      console.log("Account creation failed");
      return NextResponse.json(
        {
          success: false,
          error: "Registration failed!",
        },
        { status: 400 }
      );
    }
    //   WHEN AN EVENT INFO IS RETURNED FROM THE DATABASE
    console.log("new staff added: ", newStaff);
    return NextResponse.json(
      {
        success: true,
        message: "new Staff Account created",
        data: newStaff,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
