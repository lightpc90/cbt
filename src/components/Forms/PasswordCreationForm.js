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
      <div className="bg-slate-300 h-[400px] w-3/12 flex flex-col text-slate-800 justify-center items-center gap-3 rounded-md shadow-md py-5 z-30">
        <h1 className="font-bold text-lg"> Staff Password Creation Form</h1>
        {/* Password creation form*/}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-8/12">
          {/* email input */}
          <span>
            <label className="text-sm" htmlFor="email">
              Email:
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="text"
              name="email"
              placeholder="johndoe@domain.com"
              className="p-2 rounded-md "
              required
            />
          </span>

          <span>
            <label className="text-sm" htmlFor="password">
              OTP
            </label>
            {/* temporary password input */}
            <input
              value={formData.tempPwd}
              onChange={(e) =>
                setFormData({ ...formData, tempPwd: e.target.value })
              }
              type="text"
              name="tempPwd"
              placeholder="ot-123456"
              className="p-2 rounded-md "
            />
          </span>

          <hr className="border-1 border-slate-400 mx-5" />

          <span>
            <label className="text-sm" htmlFor="password">
              password
            </label>
            {/* password input */}
            <input
              value={formData.pwd}
              onChange={(e) => {
                setFormData({ ...formData, pwd: e.target.value });
              }}
              type="password"
              name="password"
              placeholder="password"
              className="p-2 rounded-md "
            />
          </span>

          <span>
            <label className="text-sm" htmlFor="confirmPassword">confirm password</label>
            {/* confirm password input */}
            <input
              value={formData.confirmPwd}
              onChange={(e) =>
                setFormData({ ...formData, confirmPwd: e.target.value })
              }
              type="password"
              name="confirmPwd"
              placeholder="password"
              className="p-2 rounded-md "
            />
          </span>

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
