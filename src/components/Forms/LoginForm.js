"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/appContext/appState";

const LoginForm = ({admin=false}) => {
  const router = useRouter()
  const {signIn, setUserData} = useAppContext()
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
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({...formData, admin: admin})
    })
    if(!res.ok){
      console.log("server failure: ", res)
      setLoading(false)
      return
    }
    const _res = await res.json()
    // if login not successful
    if(!_res.success){
      console.log( _res.error)
      setLoading(false)
      return
    }
    if(_res.success){
      console.log(_res.message)
      console.log("user data login: ", _res.data)
      signIn(_res.accessToken, _res.data._id, _res.data)
      if(_res.data.admin){
        router.push('/admin')
      }
      else{router.push('/examiner')}
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
