'use client'

import { useState, useEffect } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";

import toast from "react-hot-toast";

const StaffLayout = ({ staff, coursesData }) => {

    const [open, setOpen] = useState(false)
    const firstnameInitial = staff.firstname[0]

    const [checkedCourses, setCheckedCourses] = useState({})
    const [allCodes, setAllCodes] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        // extract all the course codes in the coursesData object into a list
        const allCourseCodes = coursesData?.map(course=>course.code)
        setAllCodes(allCourseCodes)

        // get initial checked courses
        const initialCheckedCourses = allCourseCodes.reduce((acc, item) => {
            acc[item] = staff.courses.includes(item);
            return acc
        }, {})
        setCheckedCourses(initialCheckedCourses)
    }, [coursesData, staff])

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedCourses((prevState) => ({
            ...prevState, [name]: checked
        }))
    }

    const handleUpdateCourse = async()=>{
        setLoading(true)
        const trueKeys = Object.keys(checkedCourses).filter(key => checkedCourses[key]);
        console.log("updated course codes: ", trueKeys)
        // call staff update api
        const res = await fetch('/api/staff/updateAStaff', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({_id: staff._id, doc:{courses: trueKeys}})
        })
        if(!res.ok){
            console.log("failed to make api call")
            toast.error("failed api call")
            return 
        }
        // handle return data
        const _res = await res.json()
        if(!_res.success){
            console.log("error: ", _res.error)
            toast.error(_res.error)
        }
        else if(_res.success){
            console.log("message: ", _res.message)
            toast.success(_res.message)
        }
        setLoading(false)
    }


    return (
        <div className='flex bg-slate-800 px-2 py-1 text-white justify-between my-1 '>
            <div className='flex gap-2'>
                <p className='font-bold'>{`${firstnameInitial}. ${staff.lastname}`}</p>
                <p className="text-rose-600">{staff.tempPwd}</p>
                <p className='text-rose-300'>{`| Logged in: ${staff.createdPwd}`}</p>
            </div>
            <div>
                <button onClick={() => setOpen(!open)} className='flex items-center text-sm ring-1 ring-rose-800 px-2 rounded-md'>Update Course<span>{!open ? <HiChevronRight size={30} /> : <HiChevronDown size={30} />}</span></button>
                {open && <div className='bg-rose-600 p-1 relative right-0 top-0'>
                    {allCodes.map((code, i) => (
                        <div key={i} className="">
                            <label className="flex gap-1">
                                {code}
                                <input type="checkbox"
                                    name={code}
                                    checked={checkedCourses[code]}
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                            <hr/>
                        </div>
                    ))}
                    <button onClick={handleUpdateCourse} className="bg-slate-800 p-1 mt-5">{loading ? `loading..` : `Update!`}</button>
                </div>}
            </div>

        </div>
    )
}

export default StaffLayout