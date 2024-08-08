import React from "react";
import LoginForm from "@/components/Forms/LoginForm";
import backgroundImage from "../../../../public/image/formulaeBG.png";
import Image from "next/image";

const Page = () => {
  const admin = true
  return (
    <div className=" h-screen bg-slate-800 relative">
      <Image
        src={backgroundImage}
        alt="background image"
        className="absolute h-full w-full top-0 left-0 right-0 cover opacity-20 blur-sm "
      />
      <LoginForm admin={admin} />
    </div>
  );
};

export default Page;
