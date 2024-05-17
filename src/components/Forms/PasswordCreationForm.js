"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PasswordCreationForm = () => {
    const router = useRouter()
    const initialFormData = { email: "", tempPwd: '', pwd: "", confirmPwd: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false)

    // handle form data on change
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const res = await fetch('/api/staff/staffPasswordCreation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doc: { ...formData, createdPwd: true } })
        })
        const _res = await res.json()
        if (!_res.sucess) {
            console.log("error: ", _res.error)
            setLoading(false)
        }
        else if (_res.success) {
            console.log("success:", _res.message)
        }

        // check if the staff is an admin or not
        if (_res.data.admin) { router.push("/login/admin") }
        else { router.push('/login/examiner') }

        setLoading(false)
    };


    return (
        <div className="bg-slate-300 h-[400px] w-3/12 flex flex-col text-slate-800 justify-center items-center gap-3 rounded-md shadow-md ">
            <h1 className="font-bold text-lg">Password Creation Form</h1>
            {/* Password creation form*/}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-8/12">
                {/* email input */}
                <input
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    type="text"
                    name="email"
                    placeholder="Your Registered Email"
                    className="p-2 rounded-md "
                    required
                />
                {/* temporary password input */}
                <input
                    value={formData.tempPwd}
                    onChange={(e) =>
                        setFormData({ ...formData, tempPwd: e.target.value })
                    }
                    type="text"
                    name="tempPwd"
                    placeholder="Your Temporary Password"
                    className="p-2 rounded-md "
                />

                <hr className="border-1 border-slate-800 mx-5" />

                {/* password input */}
                <input
                    value={formData.pwd}
                    onChange={(e) => {
                        setFormData({ ...formData, pwd: e.target.value });
                    }}
                    type="password"
                    name="password"
                    placeholder="New Password"
                    className="p-2 rounded-md "
                />
                {/* confirm password input */}
                <input
                    value={formData.confirmPwd}
                    onChange={(e) =>
                        setFormData({ ...formData, confirmPwd: e.target.value })
                    }
                    type="password"
                    name="confirmPwd"
                    placeholder="Confirm New Password"
                    className="p-2 rounded-md "
                />
                <button
                    type="submit"
                    className="bg-slate-800 p-1 rounded-md shadow-md font-semibold text-lg text-white hover:text-gray-800 hover:bg-white"
                >
                    {loading ? `Loading...` : `Create Password`}
                </button>
                {/* <Link href="/">First Login? Create Your Password</Link> */}
            </form>
        </div>
    );
};

export default PasswordCreationForm;
