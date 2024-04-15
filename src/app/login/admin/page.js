import React from "react";
import AdminLoginForm from "@/components/Forms/AdminLoginForm";
import FormHeader from "@/components/Forms/FormHeader";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-950">
      <FormHeader/>
      <p className="mt-10 font-bold text-white">ADMIN LOGIN</p>
      <p>Folahan Institute of Technology</p>
      <AdminLoginForm />
    </div>
  );
};

export default Page;
