"use client";

import { useState } from "react";
import { useAppContext } from "@/appContext/appState";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignIn } from "@/app/auth/signIn";

const StudentTestLoginForm = () => {
  const initialFormData = { matricNo: "", surname: "" };
  const [formData, setFormData] = useState(initialFormData);

  const { setCurrentUserId, setUserData } = useAppContext();
  const router = useRouter();

  // loading states
  const [loading, setLoading] = useState(false);

  // handle form data on change
  const handleTestLoging = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login/student", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      // failed to make an API call
      console.log("check if res is not ok")
      if (!res.ok) {
        console.log("res not ok")
        toast.error("Failed! Try again");
      }
      // successfully made the API call
      else {
        console.log("res ok")
        const loggedIn = await res.json();
        if (loggedIn.success === false) {
          //returned an error
          console.log("res not succeeded");
          toast.error(loggedIn.error);
        }
        else if (loggedIn.success === true) {
          // returned a success
          console.log("logged in successfully");
          SignIn(loggedIn.data._id, loggedIn.data, setCurrentUserId, setUserData);
          // redirect to page where the student will choose the exam course
          router.push(
            `/start_test/pre/${loggedIn.data.firstname}_${loggedIn.data.lastname}/${loggedIn.data._id}`
          );
          toast.success(loggedIn.message);
        }
      }
      setLoading(false)
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div className="bg-slate-300 text-black min-h-[300px] hover:ring hover:ring-slate-800 w-full flex flex-col justify-center items-center gap-3 rounded-md shadow-md ">
      <h1 className="font-bold text-lg">Login to Start Your Test</h1>
      {/* admin login form */}
      <form onSubmit={handleTestLoging} className="flex flex-col gap-3 px-3">
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
          disabled={loading}
          className="bg-slate-800 p-1 rounded-md shadow-md font-semibold text-lg text-white hover:text-gray-800 hover:bg-white"
        >
          {loading ? `Loggin in...` : `login`}
        </button>
      </form>
    </div>
  );
};

export default StudentTestLoginForm;
