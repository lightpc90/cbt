
//   signout function
export async function signOut () {
  

  if (!response.ok) {
    return {success: false}
  } else {
    // Handle errors if needed
    console.error("Failed to logout");
    return {success: false}
  }
};


