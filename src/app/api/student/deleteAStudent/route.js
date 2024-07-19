import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Student from "@/models/Student";
import { revalidateTag } from "next/cache";

export async function POST(req) {
    const {_id} = await req.json()
    console.log('id is: ', _id)

    
    // if _id id missing in request
    if (!_id) {
        return NextResponse.json({
            success: false,
            error: "id mising in query",
        })
    }

    try {
        await connectDB();

        const student = await Student.findByIdAndDelete(_id)

        //   WHEN NO Student INFO IS RETURN FROM THE DATABASE
        if (!student) {
            console.log("Failed to delete");
            return NextResponse.json({
                success: false,
                error: "Failed to delete",
            });
        }
        //   WHEN A Student INFO IS RETURNED FROM THE DATABASE
        console.log("student info deleted: ", student);

        revalidateTag("students")
        return NextResponse.json({
            success: true,
            message: "Deleted Successfully",
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
