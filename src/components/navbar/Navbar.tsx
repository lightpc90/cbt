
import Image from 'next/image';
import StaffLoginMenu from '../menu/StaffLoginMenu';

import logo from '../../../public/image/appLogo.png'
import { IoIosBook } from "react-icons/io";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="z-30 w-full">
      <div className="h-20 bg-slate-950 text-white w-full flex justify-between items-center shadow-md px-5 ">
        <Link href={`/`} className='hover:text-rose-700'>
          <span className="flex items-center gap-2">
            <IoIosBook size={30} />
            <h1 className="font-bold text-lg">CBT System</h1>
          </span>
        </Link>
        <StaffLoginMenu />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold ">
          Folahan Institute of Technology, Wakanda
        </p>
        <p className="text-gray-400">Center of Excellence</p>
      </div>
    </div>
  );
}

export default Navbar