import { NextResponse } from "next/server";
import * as xlsx from "xlsx";

const requiredKeys = [
  "question",
  "optiona",
  "optionb",
  "optionc",
  "optiond",
  "answer",
];

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  console.log("file uploaded: ", file);
  if (!file) {
    return NextResponse.json({ success: false, error: "No file uploaded" });
  }

  let err = "";
  const cleanedData = [];

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const workbook = xlsx.read(buffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    // iterate over the questions list
    let count = 0;
    for (const eachDoc of data) {
      count += 1;
      console.log("count: ", count);

      // get the headers in the uploaded file
      const incomingKeys = Object.keys(eachDoc).map((eachKey) => {
        eachDoc[eachKey.toLowerCase().trim()] = eachDoc[eachKey].trim();
        return eachKey.toLowerCase().trim();
      });
      console.log("incomingKeys: ", incomingKeys);

      // check if the required keys are present in the uploaded file
      const filteredKeys = incomingKeys.filter((eachKey) => {
        return requiredKeys.includes(eachKey);
      });

      console.log("filtered keys: ", filteredKeys);

      // check if all required keys are present
      if (filteredKeys.length !== requiredKeys.length) {
        err = `Ques ${count}: headers/values missing`;
        console.log("breaks from length checking...");
        break;
      }

      // create options array and check if answer is included
      const optionKeys = filteredKeys.filter((eachKey)=> eachKey !== 'question' && eachKey !== 'answer')
      console.log("option keys ", optionKeys)
      const options = optionKeys.map((eachKey) => eachDoc[eachKey]);

      if (options.includes(eachDoc.answer) === false) {
        err = "Invalid file format: answer not in options";
        break;
      }

      // if all good, return cleaned data

      cleanedData.push({
        question: eachDoc.question,
        options: options,
        answer: eachDoc.answer,
      });
      console.log("pushed cleaned data for question ", count);
    }

    // outside of the loop
    if (err) {
      return NextResponse.json({
        success: false,
        error: err,
      });
    }

    console.log("cleaned data: ", cleanedData);
    return NextResponse.json({
      success: true,
      data: cleanedData,
      message: "file processed successfully",
    });
  } catch (e) {
    console.log("server error: ", e);
    return NextResponse.json({
      success: false,
      error: "server error",
    });
  }
}
