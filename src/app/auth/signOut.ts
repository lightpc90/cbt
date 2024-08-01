'use client'

import { useRouter } from "next/navigation";

//   signout function
export async function SignOut (setUserData) {
    const router = useRouter()
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (response.ok) {
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("userData");
    setUserData({});
    // Redirect to the login page or home page after successful logout
    // window.location.href = '/';
    router.push("/");
  } else {
    // Handle errors if needed
    console.error("Failed to logout");
  }
};


