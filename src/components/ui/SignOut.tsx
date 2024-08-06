'use client'

import { useRouter } from "next/navigation";
import { useAppContext } from "@/appContext/appState";
import toast from "react-hot-toast";
import { iStaff } from "../InitialData/initialData";

export const SignOut=()=>{
    const router = useRouter()
    const {setUserData} =useAppContext()
    // sign out function
    const signOut = async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) {
        return;
      }
      const loggedOut = await response.json();
      if (loggedOut.success) {
        router.push("/");
        toast.success(loggedOut.message);
      }
      localStorage.removeItem("currentUserId");
      localStorage.removeItem("userData");
      setUserData(iStaff);
    };

    return (
      <button
        onClick={signOut}
        className="bg-slate-700 py-1 rounded-md hover:ring-2 hover:ring-white"
      >
        Logout
      </button>
    );
}
