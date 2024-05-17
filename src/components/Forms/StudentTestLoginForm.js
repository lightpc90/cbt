"use client";

import { useState } from "react";

const StudentTestLoginForm = () => {
  const initialFormData = { matricNo: "", surname: "" };
  const [formData, setFormData] = useState(initialFormData);

  // handle form data on change
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-slate-300 text-black min-h-[300px] hover:ring hover:ring-slate-800 w-full flex flex-col justify-center items-center gap-3 rounded-md shadow-md ">
      <h1 className="font-bold text-lg">Login to Start Your Test</h1>
      {/* admin login form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-3">
        {/* matricNo input */}
        <input
          value={formData.matricNo}
          onChange={(e) =>
            setFormData({ ...formData, matricNo: e.target.value })
          }
          type="text"
          name="matricNo"
          placeholder="Matric No"
          className="p-2 rounded-md "
        />

        {/* surname input */}
        <input
          value={formData.surname}
          onChange={(e) => {
            setFormData({ ...formData, surname: e.target.value });
          }}
          type="password"
          name="surname"
          placeholder="Surname"
          className="p-2 rounded-md "
        />
        <button
          type="submit"
          className="bg-slate-800 p-1 rounded-md shadow-md font-semibold text-lg text-white hover:text-gray-800 hover:bg-white"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default StudentTestLoginForm;
