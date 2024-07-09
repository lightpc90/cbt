'use server'

import {cloudinary} from '../libraries/cloudinary'

export async function create(formData){
    console.log(formData.get('image'))
    return

    const file = formData.get('image')
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream({}, function(error, result)
        {
            if(error){
                reject(error)
                return
            }
            resolve(result)
        })
        .end(buffer)
    })
}