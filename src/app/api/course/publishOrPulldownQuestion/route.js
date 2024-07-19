import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Course from "@/models/Course";
import { revalidateTag } from "next/cache";

export async function POST(req) {
    const {_id, published} = await req.json()
  try {
    await connectDB();

    const modifiedDoc = await Course.findOneAndUpdate({_id}, {published}, {new: true})

    console.log("modified doc: ", modifiedDoc)

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!modifiedDoc) {
      console.log("Failed to modify question");
      return NextResponse.json({
        success: false,
        error: "Failed to modify",
      },);
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("modified doc: ", modifiedDoc);

// purge cache data
    revalidateTag("courses")
    return NextResponse.json({
      success: true,
      message: "Successfully Updated",
      data: modifiedDoc,
    }, {status: 201});
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    }, {status: 500});
  }
}
