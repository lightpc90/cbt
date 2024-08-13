
import {NextResponse} from 'next/server'
import * as xlsx from 'xlsx'


export async function POST(request){
    const formData = await request.formData()
    const file = formData.get('file')
    console.log("file uploaded: ", file)
    if(!file){
        return NextResponse.json({success: false, error: 'No file uploaded'})
    }
 
    try{
         const buffer = Buffer.from(await file.arrayBuffer());

         const workbook = xlsx.read(buffer, { type: "buffer" });
         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
         const data = xlsx.utils.sheet_to_json(worksheet);

         console.log("converted excel: ", data);
         return NextResponse.json({success:true, data, message: "file processed successfully"});
    }catch(e){
        console.log("server error: ", e)
         return NextResponse.json({
           success: false,
           error: 'server error',
         });
    }
   
}