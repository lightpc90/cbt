import React from 'react'
import PasswordCreationForm from '@/components/Forms/PasswordCreationForm'
import backgroundImage from  '../../../../public/image/formulaeBG.png'
import Image from 'next/image';

const Page = () => {
  return (
    <div className="flex justify-center bg-slate-800 items-center h-screen overflow-auto relative ">
      <Image
        src={backgroundImage}
        alt="background image"
        className="absolute h-full w-full top-0 left-0 right-0 cover opacity-20 blur-sm "
      />
      <PasswordCreationForm />
    </div>
  );
}

export default Page