"use client";

import { useState } from "react";
import { useAppContext } from "@/appContext/appState";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const { setUserData } = useAppContext();
  const signOut = async () => {
    setLoggingOut(true);
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      localStorage.removeItem("currentUserId");
      localStorage.removeItem("userData");
      setUserData({});
      router.push("/");
    } else {
      // Handle errors if needed
      console.error("Failed to logout");
    }
    setLoggingOut(false);
  };

  return (
    <div>
      <button
        className="px-2 p-1 bg-slate-800 rounded-md text-white text-sm hover:bg-slate-700"
        disabled={loggingOut}
        onClick={signOut}
      >
        {loggingOut ? `Logging out...` : `Logout`}
      </button>
    </div>
  );
};

export default Logout;
