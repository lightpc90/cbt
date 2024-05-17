import React from "react";
import LoginForm from "@/components/Forms/LoginForm";
import FormHeader from "@/components/Forms/FormHeader";

const Page = () => {
  const admin = true
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-950">
      <FormHeader/>
      <p className="mt-10 font-bold text-white">ADMIN LOGIN</p>
      <p>Folahan Institute of Technology</p>
      <LoginForm admin={admin} />
    </div>
  );
};

export default Page;
