"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/appContext/appState";
import toast from "react-hot-toast";

const LoginForm = ({admin=false}) => {
  const router = useRouter()
  const {signIn} = useAppContext()
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
      signIn(_res.data._id, _res.data)
      toast.success(_res.message)
      if(_res.data.admin){
        router.push(`/admin/${_res.data.firstname}_${_res.data.lastname}/${_res.data._id}`)
      }
      else{router.push(`/examiner/${_res.data.firstname}_${_res.data.lastname}/${_res.data._id}`)}
    }
  };
  return (
    <div className="bg-slate-300 h-[300px] w-3/12 flex flex-col justify-center items-center gap-3 rounded-md shadow-md ">
      {/* admin login form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-8/12 text-slate-900">
        {/* username input */}
        <input
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 rounded-md "
        />

        {/* password input */}
        <input
          value={formData.pwd}
          onChange={(e) => {
            setFormData({ ...formData, pwd: e.target.value });
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
          { loading ? `Logging in...` : `login`}
        </button>
        <Link href="/login/passwordCreation">First Login? Create Your Password</Link>
      </form>
    </div>
  );
};

export default LoginForm;
