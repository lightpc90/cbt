import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Student from "@/models/Student";

export async function POST(req) {
    const {_id, update} = await req.json()
    console.log('id is: ', _id)
    console.log("student uodate doc: ", update)

    
    // if code missing in request query
    if (!_id) {
        return NextResponse.json({
            success: false,
            error: "id mising in query",
        })
    }

    try {
        await connectDB();

        const student = await Student.findByIdAndUpdate(_id, update, {new: true})

        //   WHEN NO Student INFO IS RETURN FROM THE DATABASE
        if (!student) {
            console.log("Update Failed");
            return NextResponse.json({
                success: false,
                error: "Update Failed",
            });
        }
        //   WHEN A Student INFO IS RETURNED FROM THE DATABASE
        console.log("student info returned: ", student);
        return NextResponse.json({
            success: true,
            message: "Updated Successfull",
            data: student,
        });
    } catch (err) {
        console.log(err);

        return NextResponse.json({
            success: false,
            error: err.message || "Something went wrong",
        });
    }
}
