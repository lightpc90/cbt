import React from 'react'

const StaffLayout = ({ staff }) => {
    const firstnameInitial = staff.firstname[0]
    return (
        <div className='flex bg-slate-800 px-2 py-1 text-white justify-between my-1'>
            <div className='flex gap-2'>
                <p>{`${firstnameInitial}. ${staff.lastname}`}</p>
                <div className='flex gap-2 text-rose-400'>{staff.courses.map((courseCode, i) => (
                    <p key={i}>{courseCode}</p>
                ))}
                </div>
            </div>
            <button className='text-sm ring-1 ring-rose-800 px-2 rounded-md'>Edit</button>
        </div>
    )
}

export default StaffLayout