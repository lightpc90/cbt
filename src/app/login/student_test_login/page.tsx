import React from "react";
import StudentTestLoginForm from "@/components/Forms/StudentTestLoginForm";
import FormHeader from "@/components/Forms/FormHeader";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-950">
      <FormHeader />
      <p className="font-bold text-white text-xl mb-3 mt-10">Test login</p>
      <StudentTestLoginForm />
    </div>
  );
};

export default Page;
