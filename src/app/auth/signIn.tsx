'use client'

// signin function
export function SignIn(
  userId: string,
  data: {},
  setCurrentUserId: (arg: string) => void,
  setUserData
) {
  console.log("signing in...");
  localStorage.setItem("currentUserId", userId);
  localStorage.setItem("userData", JSON.stringify(data));
  setCurrentUserId(userId);
  setUserData(data);
}
