import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Course from "@/models/Course";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  const { _id, update } = await req.json();
  try {
    await connectDB();

    //   FIND THE USER INFO USING THE USER ID
    const modifiedDoc = await Course.findOneAndUpdate(
      { _id },
      update,
      { new: true }
    );

    console.log("modified doc: ", modifiedDoc);

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!modifiedDoc) {
      console.log("Failed to modifed");
      return NextResponse.json({
        success: false,
        error: "modification failed/data not found",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("modified doc: ", modifiedDoc);

    revalidateTag("courses");
    return NextResponse.json(
      {
        success: true,
        message: "Successfully Updated",
        data: modifiedDoc,
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
