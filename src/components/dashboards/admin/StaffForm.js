'use client'

import React, { useState } from 'react'

const Titles = [
    { value: '', name: 'Choose Title' },
    { value: 'Mr.', name: 'Mr.' },
    { value: 'Ms.', name: 'Ms.' },
    { value: 'Mrs.', name: 'Mrs.' },
    { value: 'Engr.', name: 'Engr.' },
    { value: 'Dr.', name: 'Dr.' },
    { value: 'Prof.', name: 'Prof.' },
]

const StaffForm = ({ staff, setStaffData, coursesData, editing = false }) => {
    const initialFormData = {
        title: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        dept: '',
        staffID: '',
        courses: []
    }
    const updateInitialFormData = {
        title: staff?.title,
        firstname: staff?.firstname,
        middlename: staff?.middlename,
        lastname: staff?.lastname,
        email: staff?.email,
        dept: staff?.dept,
        staffID: staff?.staffID
    }
    const [formData, setFormData] = useState(editing ? updateInitialFormData : initialFormData)
    return (
        <div className='flex flex-col gap-2'>
            {/* title */}
            <select
                name='title'
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })} required
                className='bg-inherit border rounded-md p-2 '
            >
                {Titles.map((Title, i) => (
                    <option key={i} value={Title.value} className='text-slate-900'>{Title.name}</option>
                ))}
            </select>
            {/* firstname */}
            <input
                value={formData.firstname}
                onChange={e => setFormData({ ...formData, firstname: e.target.value })}
                type='text' name='firstname' placeholder='First Name' required
                className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit'
            />
            {/* middlename */}
            <input
                value={formData.middlename}
                onChange={e => setFormData({ ...formData, middlename: e.target.value })}
                type='text' name='middlename' placeholder='Middle Name'
                className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit'
            />
            {/* lastname */}
            <input
                value={formData.lastname}
                onChange={e => setFormData({ ...formData, lastname: e.target.value })}
                type='text' name='lastname' placeholder='Last Name' required
                className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit'
            />
            {/* email */}
            <input
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                type='email' name='email' placeholder='Email' required
                className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit'
            />
            {/* dept select input */}
            <select value={formData.dept}
                name='dept'
                onChange={e => setFormData({ ...formData, dept: e.target.value })} required className='bg-inherit border rounded-md p-2'>
                <option value='' >Choose Dept</option>
                {coursesData?.map((course, i) => (
                    <option key={i} value={course.dept} className='text-slate-900'>{course.dept}</option>
                ))}
            </select>
            <p>If a dept is missing, register it by registering a course under the dept</p>
            {/* staff id */}
            <input
                value={formData.staffID}
                onChange={e => setFormData({ ...formData, staffID: e.target.value })}
                type='text' name='staffID' placeholder='School Staff ID' required
                className='p-1 rounded-md border-b-2 border-b-blue-800 bg-inherit'
            />
        </div>
    )
}
export default StaffForm;