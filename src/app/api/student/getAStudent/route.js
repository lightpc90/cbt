import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Student from "@/models/Student";

export async function GET(req) {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = searchParams.get('id')
    console.log('id is: ', id)

    
    // if code missing in request query
    if (!id) {
        return NextResponse.json({
            success: false,
            error: "id mising in query",
        })
    }

    try {
        await connectDB();

        const student = await Student.findById(id);

        //   WHEN NO Student INFO IS RETURN FROM THE DATABASE
        if (!student) {
            console.log("No Student Found");
            return NextResponse.json({
                success: false,
                error: "No student Found",
            });
        }
        //   WHEN A Student INFO IS RETURNED FROM THE DATABASE
        console.log("student info returned: ", student);
        return NextResponse.json({
            success: true,
            message: "student info returned",
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
