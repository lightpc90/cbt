import React from "react";
import ExaminerLoginForm from "@/components/Forms/ExaminerLoginForm";
import FormHeader from "@/components/Forms/FormHeader";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-950">
      <FormHeader />
      <p className="mt-10 text-white text-2xl mb-3 font-bold"> Examiner Login</p>
      <ExaminerLoginForm />
    </div>
  );
};

export default Page;
