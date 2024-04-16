"use client";

import { useState } from "react";

const StudentRegForm = () => {
  const initialFormData = {
    middlename: "",
    password: "",
    firstname: "",
    lastname: "",
    studentID: "",
    pswd: "",
    confirmPswd: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  // handle form data on change
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="bg-slate-300 min-h-[300px] px-10 flex flex-col justify-center items-center gap-3 rounded-md shadow-md py-10 ring-4 ring-white">
      <h1 className="font-bold text-lg">Student Test Account Creation Form</h1>
      {/* Student Registration form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-10/12">
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

        {/* middle name input */}
        <input
          value={formData.middlename}
          onChange={(e) => {
            setFormData({ ...formData, middlename: e.target.value });
          }}
          type="text"
          name="middlename"
          placeholder="Middle Name"
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

        {/* Student ID input */}
        <input
          value={formData.studentID}
          onChange={(e) => {
            setFormData({ ...formData, studentID: e.target.value });
          }}
          type="text"
          name="studentId"
          placeholder="Student ID"
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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default StudentRegForm;
