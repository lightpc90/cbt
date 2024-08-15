import * as xlsx from "xlsx";
import { NextResponse } from "next/server";

import { numberToAlphabet } from "@/UtilityFunctions/numberToAlphabet";

export async function POST(request) {
  const { questions, params } = await request.json();

  //   extract the options array and make it key:value object
  const flattenedQuestions = questions.map((question) => {
    const options = {}
    return {
      ...question,
      options: question.options.map((eachOption, i) => {
        options[`option${numberToAlphabet(i + 1)}`] = eachOption;
      }),
      optionA: options.optionA,
      optionB: options.optionB,
      optionC: options.optionC,
      optionD: options.optionD,
      options: ''
    };
  });
  

  if (!Array.isArray(flattenedQuestions)) {
    throw new Error("Invalid data format. Expected an array.");
  }
  console.log("it is an array..");
    console.log("flattened questions: ", flattenedQuestions);
//   const jsonQuestions = JSON.stringify(questions);
  try {
    const worksheet = xlsx.utils.json_to_sheet(flattenedQuestions);
    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    console.log("worksheet: ", worksheet);
    workbook.Sheets[params.course] = worksheet;

    // Append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, params.course);

    // Convert workbook to binary buffer
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });


    // Create a Blob response for download
    const response = new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=${params.course}-questions.xlsx`,
      },
    });

    return response;
  } catch (e) {
    console.log("server error: ", e);
    return new NextResponse({
      success: false,
      error: "Download Failed, Try again!",
    });
  }
}
