import React from 'react'
import Image from 'next/image'
import { create } from '@/actions/imageUpload'

const DpUpload = () => {
  return (
    <div>
        {/* Image upload form */}
        <form action={create}>
                    <label className=' text-slate-300 block' >
                        <p>Student Display Picture</p>
                        <input
                            type="file" id='image' name='image' required
                            className='hover:bg-rose-700'
                            // onChange={handleImgChange}
                        />
                    </label>
                    <button type='submit' >Upload</button>
                </form>


                {/* image upload container */}
                {/* when uploading an image */}
                {uploadingImage ? <div className='h-[120px] w-[120px] flex flex-wrap justify-center p-2 items-center bg-slate-900 '>
                    Uploading Image...
                </div> :
                    // when the image is uploaded and there is no error
                    formData.imageUrl && !uploadingImage && !error ? <div className='h-[120px] w-[120px] rounded-full overflow-hidden '>
                        <Image src={`/tmp/uploads/students/1720457304478student_3.png`} width={700} height={700} alt='display picture' />
                    </div> :
                        // when there is an error while uploading the image
                        error && <div className='h-[120px] w-[120px] flex flex-wrap justify-center items-center p-2 bg-slate-900 '>
                            {error}
                        </div>
                }
    </div>
  )
}

export default DpUpload