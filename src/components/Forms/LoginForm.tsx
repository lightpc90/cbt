"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/appContext/appState";
import toast from "react-hot-toast";
import { SignIn } from "@/app/auth/signIn";
import Navbar from "../navbar/Navbar";

import { RiAdminFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";

const LoginForm = ({admin=false}) => {
  const {setCurrentUserId, setUserData} = useAppContext()
  const router = useRouter()
  const initialFormData = { email: "", pwd: "",  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false)

  // handle form data on change
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(admin){
      console.log("trying to login as an admin...")
    }
    console.log("an admin? ", admin)
    setLoading(true)
    
    const res = await fetch('/api/auth/login/staff', {
      method: 'POST',
      body: JSON.stringify({...formData, admin: admin})
    })
    console.log("response:: ", res)
    if(res.ok === false){
      console.log("server failure: ", res)
      toast.error("failed to make api call")
      setLoading(false)
      return
    }
    const _res = await res.json()
    // if login not successful
    if(!_res.success){
      console.log( _res.error)
      toast.error(_res.error)
      setLoading(false)
      return
    }
    if(_res.success){
      console.log(_res.message)
      console.log("user login data: ", _res.data)
      SignIn(_res.data._id, _res.data, setCurrentUserId, setUserData)
      toast.success(_res.message)
      if(_res.data.admin){
        router.push(`/admin/${_res.data.firstname}_${_res.data.lastname}/${_res.data._id}`)
      }
      else{router.push(`/examiner/${_res.data.firstname}_${_res.data.lastname}/${_res.data._id}`)}
    }
  };
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <Navbar />
      <div className="h-full flex flex-col w-[400px] justify-center items-center ">
        {/* admin login form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center p-3 gap-2 w-full h-[500px] text-slate-900 bg-slate-300 rounded-lg shadow-md ring-2 ring-rose-900"
        >
          {admin ? <RiAdminFill size={30}/> : <FaUserTie size={30}/>}
          <h1 className="text-2xl font-bold text-center">{`${admin? `Admin` : `Staff`} Login`}</h1>
          {/* username input */}
          <label htmlFor="email" className="flex flex-col w-[80%]">
            <span>Email:</span>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              name="email"
              placeholder="example@domain.com"
              className="p-2 rounded-md"
            />
          </label>

          {/* password input */}
          <label htmlFor="password" className="flex flex-col w-[80%]">
            <span>Password</span>
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
          </label>
          <button
            type="submit"
            className="bg-slate-800 p-1 rounded-md shadow-md font-semibold text-lg text-white hover:text-gray-800 hover:bg-white w-[80%]"
          >
            {loading ? `Logging in...` : `login`}
          </button>
          {!admin && (
            <Link href="/login/passwordCreation" className="text-rose-800 font-semibold">
              First Login? Create Password with your OTP
            </Link>
          )}
        </form>
      </div>
    </div>
  );
    
};

export default LoginForm;
