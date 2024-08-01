import React from "react";
import LoginForm from "@/components/Forms/LoginForm";
import FormHeader from "@/components/Forms/FormHeader";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-950">
      <FormHeader />
      <p className="mt-10 text-white text-2xl mb-3 font-bold"> Examiner Login</p>
      <LoginForm />
    </div>
  );
};

export default Page;
