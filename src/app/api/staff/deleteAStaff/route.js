import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Staff from "@/models/Staff";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  const { _id } = await req.json();
  try {
    await connectDB();

    //   FIND THE Staff INFO USING THE Staff ID
    const deletedDoc = await Staff.findByIdAndDelete({ _id });

    console.log("deletedDoc returned: ", deletedDoc)

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!deletedDoc) {
      console.log("Failed to delete staff");
      return NextResponse.json({
        success: false,
        error: "Failed to delete staff!",
      });
    }

    revalidateTag("staffs")
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
