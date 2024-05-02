import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center gap-[30px] bg-slate-800 text-white">
      <div className="h-12 bg-slate-950 text-white w-full flex justify-center items-center shadow-md ">
        <h1 className="font-bold">CBT SYSTEM</h1>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold ">Folahan Institute of Technology, Wakanda</p>
        <p className="text-gray-400">Center of Excellence</p>
      </div>

      {/* links to the pages */}
      <div className="flex flex-col gap-3 items-center bg-white p-10 shadow-md rounded-md border-2 border-blue ">
        <Link
          href="/login/admin"
          className="bg-blue-900 p-2 text-white text-lg font-semibold rounded-md shadow-md hover:text-blue-900 hover:bg-white"
        >
          Admin Page
        </Link>
        <Link
          href="/login/examiner"
          className="bg-blue-900 p-2 text-white text-lg font-semibold rounded-md shadow-md hover:text-blue-900 hover:bg-white"
        >
          Examiner/Lecturer Page
        </Link>
        {/* <Link
          href="/student_registration"
          className="bg-blue-900 p-2 text-white text-lg font-semibold rounded-md shadow-md hover:text-blue-900 hover:bg-white"
        >
          Students Registration Page
        </Link> */}
        <Link
          href="/login/student_test_login"
          className="bg-blue-900 p-2 text-white text-lg font-semibold rounded-md shadow-md hover:text-blue-900 hover:bg-white"
        >
          Start Test/Examination
        </Link>
      </div>
    </main>
  );
}
