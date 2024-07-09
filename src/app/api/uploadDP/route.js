
import path from 'path';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';

console.log("entering the upload api...")

export async function POST(req){
  const formData = await req.formData()

  const file = formData.get('file')
  if(!file){
    return NextResponse.json({error: "No file received"},
      {status: 400}
    )
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + file.name.replaceAll(" ", "_")
  console.log("image name: ", filename)
  try{
     await writeFile(
      path.join(process.cwd(), "tmp/uploads/students/" + filename),
      buffer
    )
    console.log("image successfully added...")
    return NextResponse.json({message: "success", filename: filename}, {status: 201})
  }catch(err){
    console.log("error occured: ", err)
    return NextResponse.json({error: "Failed"}, {status: 500})
  }
  }
