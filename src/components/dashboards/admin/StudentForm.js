'use client'

import { middleware } from '@/middleware'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Depts = ["Computer Science", "Mathematics Education", "Biology Education", "Physics", "English"]
const Genders = ["Male", "Female"]

const StudentForm = ({ setStudents, studentData={}, setStudentData, isEditing, setIsEditing }) => {

    const router = useRouter()

    console.log('is editing? ', isEditing)

    const [loading, setIsLoading] = useState(false)

    const initialFormData = { firstname: '', middlename: '', lastname: '', matricNo: '', dept: '', gender: '', imageUrl: '' }

    const updatingInitialData = {firstname: studentData.firstname, middlename: studentData.middlename, lastname: studentData.lastname, matricNo: studentData.matricNo, dept: studentData.dept, gender: studentData.gender, imageUrl: studentData.imageUrl}

    const [formData, setFormData] = useState(isEditing === false ? initialFormData : updatingInitialData)
    const [file, setFile] = useState(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [error, setError] = useState('')

    const handleImgChange = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
    }

    // save image to system files
    const handleImageSaving = async ()=>{
        setError('')
        if(!file){return}
        const imageData = new FormData()
        imageData.append('file', file)
        console.log("imageData: ", imageData)
        setUploadingImage(true)
        try {
            const res = await fetch('/api/uploadDP/', {
                method: 'POST',
                body: imageData,
            })
            if(!res.ok){
                console.log("api failed...")
                setUploadingImage(false)
                setError("api failed")
                return
            }
            const data = await res.json()
            if (data.error){
                console.log("error: ", data.error)
                setError(data.error)
            }
            else{
                toast.success(data.message)
                setFormData(prev=>({...prev, imageUrl: data.filename}))
                console.log("the image name: ", data.filename)
                console.log("the image name in state: ", formData.imageUrl)
            }
        } catch (error) {
            console.log(error)
            setError('Internal Server Error')
        } finally {
            setUploadingImage(false)
        }
    }

    useEffect(()=>{
        if(file !== null){
            handleImageSaving()
        }
    }, [file])

    const handleRegisterOrUpdate = async () => {
        if (!formData.firstname || !formData.middlename || !formData.lastname || !formData.matricNo || !formData.dept || !formData.gender || !formData.imageUrl ) {
            console.log("fill the form completely")
            return
        }
        setIsLoading(true)

        // call update api if form loaded in update component
        if(isEditing === true){
            console.log("updatig student")
            const update = await fetch("/api/student/updateAStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({_id: studentData._id, update: formData })
            })
            if(!update.ok){
                toast.error("Internal Error")
                setIsLoading(false)
                return
            }

            const isUpdate = await update.json()
            if(isUpdate.success === false){
                toast.error(isUpdate.error)
            }
            else{
                setStudents((prev)=>(prev.map(student=>student._id == isUpdate.data._id ? isUpdate.data : student)))
                toast.success(isUpdate.message)
            }
            setIsLoading(false)
            setIsEditing(false)
            return
        }

        // call the api to register a new student
        console.log("registering a student")
        const res = await fetch("/api/auth/register/student/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) {
            console.log("Api failed")
            toast.error("Server Error")
            setIsLoading(false)
            return
        }

        const result = await res.json()
        if (result.success === false) {
            console.log(result.error)
            toast.error(result.error)
        }
        else {
            setStudents(prev => ([...prev, result.data]))
            toast.success(result.message)
            setFormData(initialFormData)
        }
        setIsLoading(false)
    }

    return (
        <div className='h-[92%] w-full overflow-auto flex flex-col p-2'>
            <div className='space-y-2'>
                <input type='text' name='firstName' id='firstName' required placeholder='First Name'
                    className='py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-rose-500'
                    value={formData.firstname}
                    onChange={(e) => { setFormData({ ...formData, firstname: e.target.value }) }}
                />
                <input type='text' name='middleName' id='middleName' required placeholder='Middle Name'
                    className='py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-rose-500'
                    value={formData.middlename}
                    onChange={(e) => { setFormData({ ...formData, middlename: e.target.value }) }}
                />
                <input type='text' name='lastName' id='lastName' required placeholder='Last Name'
                    className='py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-rose-500'
                    value={formData.lastname}
                    onChange={(e) => { setFormData({ ...formData, lastname: e.target.value }) }} lastname
                />
                <input type='text' name='matricNo' id='matricNo' required placeholder='Matric No'
                    className='py-1 px-2 w-[80%] rounded-md text-slate-900 hover:bg-rose-500'
                    value={formData.matricNo}
                    onChange={(e) => { setFormData({ ...formData, matricNo: e.target.value }) }}
                />
                <select className='block py-1 px-2 w-[80%] text-slate-900 rounded-md hover:bg-rose-500'
                    value={formData.dept}
                    onChange={(e) => { setFormData({ ...formData, dept: e.target.value }) }}
                >
                    <option value=''>Select Department</option>
                    {Depts.map((dept, i) => (
                        <option value={dept} key={i} >{dept}</option>
                    ))}
                </select>

                <select className='text-slate-900 py-1 px-2 rounded-md hover:bg-rose-500' required
                    value={formData.gender}
                    onChange={(e) => { setFormData({ ...formData, gender: e.target.value }) }}
                >
                    <option value='' >Gender</option>
                    {Genders.map((gender, i) => (
                        <option value={gender} key={i} >{gender}</option>
                    ))}
                </select>
                <label className=' text-slate-300 block' >
                    <p>Student Display Picture</p>
                    <input type="file" className='hover:bg-rose-700'
                        onChange={handleImgChange}
                    />
                </label>

                {/* image upload container */}
                {/* when uploading an image */}
                {uploadingImage ? <div className='h-[120px] w-[120px] flex flex-wrap justify-center p-2 items-center bg-slate-900 '>
                    Uploading Image...
                </div> : 
                // when the image is uploaded and there is no error
                formData.imageUrl && !uploadingImage && !error ? <div className='h-[120px] w-[120px] rounded-full overflow-hidden '>
                    <Image src={`/uploads/students/${formData.imageUrl}`} width={700} height={700} alt='display picture'/>
                </div> : 
                // when there is an error while uploading the image
                error && <div className='h-[120px] w-[120px] flex flex-wrap justify-center items-center p-2 bg-slate-900 '>
                    {error}
                </div> }
                <button disabled={loading} className='bg-slate-800 py-1 px-2 rounded-md hover:bg-slate-700'
                    onClick={handleRegisterOrUpdate}
                >
                    {isEditing && !loading ? `Update Student Info `:
                    
                    isEditing && loading ? `Updating...` :
                     !isEditing && !loading ? `Register A New Student` : 
                     `Registering...`} 
                </button>                
                {isEditing && <button className='bg-rose-900 hover:bg-rose-800 py-1 px-2 rounded-md ml-3' onClick={()=>setIsEditing(false)}>Cancel</button>}
            </div>
        </div>
    )
}

export default StudentForm