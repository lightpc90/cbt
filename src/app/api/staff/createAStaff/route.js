import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Staff from "@/models/Staff";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  const staffData = await req.json();
  console.log("staff data: ", staffData)
  const _email = staffData.email.toLowerCase()
  staffData.email = _email
  try {
    await connectDB();

    const existingStaff = await Staff.findOne({email: _email})
    if(existingStaff){
      return NextResponse.json({
        success: false,
        error: "email already existing!"
      }, )
    }
    //  CREATE A NEW STAFF ENTRY
    const newStaff = await Staff.create(staffData);

    //   IF NEW STAFF IS NOT CREATED AND RETURNED FROM THE DATABASE
    if (!newStaff) {
      console.log("Account creation failed");
      return NextResponse.json(
        {
          success: false,
          error: "Registration failed!",
        },
      );
    }
    //   WHEN AN EVENT INFO IS RETURNED FROM THE DATABASE
    console.log("new staff added: ", newStaff);

    revalidateTag("staffs")
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
