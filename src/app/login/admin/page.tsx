import React from "react";
import LoginForm from "@/components/Forms/LoginForm";
import FormHeader from "@/components/Forms/FormHeader";

const Page = () => {
  const admin = true
  return (
    <div className=" h-screen bg-slate-800">
      <LoginForm admin={admin} />
    </div>
  );
};

export default Page;
