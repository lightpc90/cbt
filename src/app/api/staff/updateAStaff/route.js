import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Staff from "@/models/Staff";

export async function POST(req) {
    const {_id, doc} = await req.json()
  try {
    await connectDB();

    //   FIND THE USER INFO USING THE USER ID
    const modifiedDoc = await Staff.findOneAndUpdate({_id}, doc, {new: true})

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!modifiedDoc) {
      console.log("Failed to modifed");
      return NextResponse.json({
        success: false,
        error: "modification failed!",
      }, {status: 400});
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("modified doc: ", modifiedDoc);
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
