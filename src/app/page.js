import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-[150px]">
      <div className="h-12 bg-slate-800 text-white w-full flex justify-center items-center ">
        <h1 className="font-bold text-xl">CBT System</h1>
      </div>
      {/* links to the pages */}
      <div className="flex flex-col gap-3 items-center bg-white p-16 shadow-md rounded-md border-2 border-blue ">
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
        <Link
          href="/student_registration"
          className="bg-blue-900 p-2 text-white text-lg font-semibold rounded-md shadow-md hover:text-blue-900 hover:bg-white"
        >
          Students Registration Page
        </Link>
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
