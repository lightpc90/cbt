"use client";

import { useState } from "react";

const ExaminerRegForm = () => {
  const initialFormData = {
    firstname: "",
    lastname: "",
    examinerId: "",
    code: "",
    pswd: "",
    confirmPswd: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  // handle form data on change
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="bg-slate-300 min-h-[300px] w-3/12 flex flex-col justify-center items-center gap-3 rounded-md shadow-md ">
      <h1 className="font-bold text-lg">Examniner Registraton Form</h1>
      {/* Examiner Registration form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-8/12">
        {/* firstname input */}
        <input
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
          type="text"
          name="firstname"
          placeholder="First Name"
          className="p-2 rounded-md"
        />

        {/* lastname input */}
        <input
          value={formData.lastname}
          onChange={(e) => {
            setFormData({ ...formData, lastname: e.target.value });
          }}
          type="text"
          name="lastname"
          placeholder="Last Name"
          className="p-2 rounded-md"
        />

        {/* Examiner ID input */}
        <input
          value={formData.examinerId}
          onChange={(e) => {
            setFormData({ ...formData, examinerId: e.target.value });
          }}
          type="text"
          name="examinerId"
          placeholder="Examiner ID"
          className="p-2 rounded-md"
        />

        {/* code input */}
        <input
          value={formData.code}
          onChange={(e) => {
            setFormData({ ...formData, code: e.target.value });
          }}
          type="text"
          name="code"
          placeholder="Your Code"
          className="p-2 rounded-md"
        />

        {/* password input */}
        <input
          value={formData.pswd}
          onChange={(e) => {
            setFormData({ ...formData, pswd: e.target.value });
          }}
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 rounded-md"
        />

        {/* confirm password input */}
        <input
          value={formData.confirmPswd}
          onChange={(e) => {
            setFormData({ ...formData, confirmPswd: e.target.value });
          }}
          type="password"
          name="confirmpassword"
          placeholder="confirm Password"
          className="p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-slate-800 p-1 rounded-md shadow-md font-semibold text-lg text-white hover:text-gray-800 hover:bg-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default ExaminerRegForm;
