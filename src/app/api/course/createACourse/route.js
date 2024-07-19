
import { NextResponse } from "next/server";
import Course from "@/models/Course";
import connectDB from "@/models/db/connectDB";
import { revalidateTag } from "next/cache";


export async function POST(req){
    console.log("beginning of the api")
    try {
        console.log("connecting to db...")
        await connectDB()
        const {title, code, dept, level} = await req.json()
        if(!(title || code || dept || level)){
            return NextResponse.json({
                error: "Empty field(s)"
            }, )
        }
        const existingCourse = await Course.findOne({code: code})
        if(existingCourse){
            return NextResponse.json({
                success: false,
                error: "Course code already existing!"
            }, )
        }
        const newCourse = await Course.create({title: title, code: code, dept: dept, level: level})
        if(!newCourse){
            return NextResponse.json({
                success: false,
                error: "Something went wrong!"
            }, )
        }
        revalidateTag("courses")
        return NextResponse.json({
            success: true,
            message: "New Course Registered",
            data: newCourse
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `internal server error: ${error}`,
        }, {status: 500})
    }
}