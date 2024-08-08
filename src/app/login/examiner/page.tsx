import React from "react";
import LoginForm from "@/components/Forms/LoginForm";
import FormHeader from "@/components/Forms/FormHeader";
import backgroundImage from "../../../../public/image/formulaeBG.png";
import Image from "next/image";

const Page = () => {
  return (
    <div className=" h-screen bg-slate-800 relative">
      <Image
        src={backgroundImage}
        alt="background image"
        className="absolute h-full w-full top-0 left-0 right-0 cover opacity-20 blur-sm "
      />
      <LoginForm />
    </div>
  );
};

export default Page;
