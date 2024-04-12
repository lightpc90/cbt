"use client";

import React, { useState } from "react";
import Link from "next/link";

const AdminLoginForm = () => {
  const initialFormData = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);

  // handle form data on change
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="bg-slate-300 h-[300px] w-3/12 flex flex-col justify-center items-center gap-3 rounded-md shadow-md ">
      <h1 className="font-bold text-lg">Admin login</h1>
      {/* admin login form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-8/12">
        {/* username input */}
        <input
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 rounded-md "
        />

        {/* password input */}
        <input
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 rounded-md "
        />
        <button
          type="submit"
          className="bg-slate-800 p-1 rounded-md shadow-md font-semibold text-lg text-white hover:text-gray-800 hover:bg-white"
        >
          login
        </button>
        <Link href="/">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default AdminLoginForm;
