import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Course from "@/models/Course";

export async function GET(req) {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const code = searchParams.get('code')
    console.log('code is: ', code)

    
    // if code missing in request query
    if (!code) {
        NextResponse.json({
            success: false,
            error: "code mising in query",
        })
    }

    try {
        await connectDB();

        //   FIND THE COURSE INFO USING live and code filter
        const course = await Course.findOne({ code: code, });

        //   WHEN NO Course INFO IS RETURN FROM THE DATABASE
        if (!course) {
            console.log("No live exam for this student");
            return NextResponse.json({
                success: false,
                error: "No live exam for this student",
            });
        }
        //   WHEN A Course INFO IS RETURNED FROM THE DATABASE
        console.log("exam course returned: ", course);
        return NextResponse.json({
            success: true,
            message: "live exam returned",
            data: course,
        });
    } catch (err) {
        console.log(err);

        return NextResponse.json({
            success: false,
            error: err.message || "Something went wrong",
        });
    }
}
