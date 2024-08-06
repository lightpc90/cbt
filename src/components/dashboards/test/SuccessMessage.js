

import { IoCheckmarkCircle } from "react-icons/io5";
import { SignOut } from '@/components/ui/SignOut';

const SuccessMessage = () => {
  return (
    <div className='p-5 bg-white rounded-md shadow-md text-slate-900 h-[50%] flex flex-col justify-center items-center'>
        <IoCheckmarkCircle size={30} className='text-green-800' />
        <p className='text-green-800 text-2xl font-bold'>Submitted Successfully!</p>
        <p className='text-slate-800 font-bold'>You can now logout and leave the exam hall.</p>
        <SignOut/>
    </div>
  )
}

export default SuccessMessage