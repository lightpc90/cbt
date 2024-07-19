import connectDB from "@/models/db/connectDB";
const bcrypt = require("bcrypt");
import { NextResponse } from "next/server";
import Staff from "@/models/Staff";

export async function POST(req) {
    const { doc} = await req.json()
    console.log("doc object: ", doc)
    const email = doc.email.toLowerCase()
    
  try {

    // confirm if the passwords are the same
    if(doc.pwd !== doc.confirmPwd){
      NextResponse.json({
        success: false,
        error: 'Passwords not matched!'
      },)
    }

    await connectDB();

    
    const staff = await Staff.findOne({email: email})
    // check if email exists
    if(!staff){
      return NextResponse.json({
        success: false,
        error: "Email not found!"
      }, )
    }

    // check if password has been created
    if(staff.createdPwd){
      return NextResponse.json({
        success: false,
        error: 'OTP is already used'
      },)
    }

    // check if the tempPwd is correct
    if (doc.tempPwd !== staff.tempPwd){
      return NextResponse.json({
      success: false,
      error: 'Incorrect Temp Password',
    },)}

    // hash staff password before saving in db
    console.log('data passed to bcrypt: ', doc.pwd, ' : ', '10' )
    const hashedPwd = await bcrypt.hash(doc.pwd, 10)

    //   FIND THE USER INFO USING THE USER ID
    const modifiedDoc = await Staff.findOneAndUpdate({email}, {...doc, hashedPwd: hashedPwd}, {new: true})

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!modifiedDoc) {
      console.log("Password creation failed");
      return NextResponse.json({
        success: false,
        error: "password creation failed!",
      }, );
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("password created: ", modifiedDoc);
    return NextResponse.json({
      success: true,
      message: "Password created successfully",
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
