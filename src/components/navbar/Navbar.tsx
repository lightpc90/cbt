
import StaffLoginMenu from '../menu/StaffLoginMenu';

const Navbar = () => {
  return (
    <div className="z-30 w-full">
      <div className="h-20 bg-slate-950 text-white w-full flex justify-between items-center shadow-md px-5 ">
        <h1 className="font-bold text-2xl">CBT SYSTEM</h1>
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