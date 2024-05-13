import React from 'react'

const StaffLayout = ({staff}) => {
    const firstnameInitial = staff.firstname[0]
    return (
        <div className='bg-slate-800 flex-inline flex-col px-2 text-white gap-1'>
            <p>{`${firstnameInitial}. ${staff.lastname}`}</p>
            <div>{staff.courses.map((courseCode, i)=>(
                <p key={i}>{courseCode}</p>
            ))}</div>
            <button className='text-sm ring-1 ring-rose-800 px-2 rounded-md'>Edit</button>
        </div>
    )
}

export default StaffLayout