import connectDB from "@/models/db/connectDB";
import { NextResponse } from "next/server";
import Student from "@/models/Student";

export async function GET(req) {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const _matricNo = searchParams.get('matricNo')
    const _id = searchParams.get('id')
    console.log("matricNo in getAStudent: ", _matricNo, "& ID: ", _id)

    let query

    if(_id && ! _matricNo){
        query = {_id}
        console.log("query is id obj: ", query)
    }
    else if(_matricNo && !_id){
        // replace all the ',' with '/'
        const matricNo = _matricNo.replace(/,/g, '/')
        query = {matricNo}
        console.log("query is matricNo obj: ", query );
    }

    
    // if code missing in request query
    if (!query) {
        return NextResponse.json({
            success: false,
            error: "query missing",
        })
    }

    try {
        await connectDB();

        const student = await Student.findOne(query);

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
