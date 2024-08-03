'use client'

import { IStaff } from "@/components/interfaces/interfaces";
import { Dispatch, SetStateAction } from "react";

// signin function
export function SignIn(
  userId: string,
  data: IStaff,
  setCurrentUserId: Dispatch<SetStateAction<string>>,
  setUserData: Dispatch<SetStateAction<IStaff>>
) {
  console.log("signing in...");
  localStorage.setItem("currentUserId", userId);
  localStorage.setItem("userData", JSON.stringify(data));
  setCurrentUserId(userId);
  setUserData(data);
}
