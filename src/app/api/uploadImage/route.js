
import cloudinary from '../../../../src/libraries/cloudinary'
import { NextResponse } from 'next/server';


export const POST = async (req, res) => {

    const form = await req.formData()
    const file = form.get('file')
    console.log('file: ', file)

    if(!file){
        return NextResponse.json({error: "No file received"},
          {status: 400}
        )
      }
    try {

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file, (error, result) => {
                if (error) {
                    console.log("got rejected")
                    reject(error);
                } else {
                    console.log("got resolved")
                    resolve(result);
                }
            });
        });
        console.log("success...")
        return NextResponse.json({
            success: true,
            message: 'Image saved succesfully',
            url: result.secure_url
        }, { status: 200 })
    } catch (error) {
        console.log("failed...: ", error)
        return NextResponse.json({
            success: 'Image upload failed',
            error: error.message
        },
            { status: 500 })
    } 
}