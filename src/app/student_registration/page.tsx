import React from "react";
import FormHeader from "@/components/Forms/FormHeader";
import StudentRegForm from "@/components/Forms/StudentRegForm";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-950">
      <FormHeader />
      <p className="font-bold text-xl text-white mt-10 mb-3">
        Create an Account for your Computer Based Test Here!
      </p>
      <StudentRegForm />
    </div>
  );
};

export default Page;
