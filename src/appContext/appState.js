'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    // State for the app context.
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([])
    const [staffs, setStaffs] = useState([])
    const [courses, setCourses] = useState([])
   
    const router = useRouter()

    // const [users, setUsers] = useState(null);

    const [userData, setUserData] = useState(typeof window !== 'undefined' ? localStorage.getItem('userData') : {})
    const [currentUserId, setCurrentUserId] = useState(typeof window !== 'undefined' ? localStorage.getItem('currentUserId') : {})

    // signin function
    const signIn = (userId, data) => {
        console.log("signing in...")
        localStorage.setItem("currentUserId", userId);
        localStorage.setItem("userData", JSON.stringify(data))
        setCurrentUserId(userId);
        setUserData(data)
    };

    //   signout function
    const signOut = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
        });
    
        if (response.ok) {
            localStorage.removeItem("currentUserId");
            localStorage.removeItem("userData")
            setUserData({})
            // Redirect to the login page or home page after successful logout
            // window.location.href = '/';
            router.push('/')
        } else {
            // Handle errors if needed
            console.error('Failed to logout');
        }
      
    };

    return <AppContext.Provider value={{ signIn, signOut, userData, setUserData, currentUserId, students, setStudents, staffs, setStaffs, courses, setCourses }}>{children}</AppContext.Provider>
}