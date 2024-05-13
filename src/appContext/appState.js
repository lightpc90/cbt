'use client'

import { createContext, useContext, useState, useEffect } from "react";


const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// auth functions
// signin is called after the user is successfully signed in to store the info in the browser storage
export const signIn = (token, userId) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("currentUserId", userId);
    setAccessToken(token);
    setCurrentUserId(userId);
};


export const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUserId");
    setAccessToken(null);
    setCurrentUserId(null);
    router.push("/");
};


export const AppProvider = ({ children }) => {
    // State for the app context.
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState(typeof window !== 'undefined' ? localStorage.getItem('answers') & JSON.parse(localStorage.getItem('answers')) : {})
    const [staffsData, setStaffsData] = useState([]);
    const [coursesData, setCoursesData] = useState([])

    const [users, setUsers] = useState(null);
    const [verify, setVerify] = useState(false);

    const [accessToken, setAccessToken] = useState(
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    );

    //   fetch all staffs
    const fetchStaffs = async () => {
        if (staffsData.length !== 0) { return }
        const res = await fetch('/api/staff/fetchAllStaffs')
        const _res = await res?.json()
        if (_res.error) {
            console.log("error getting staffs: ", _res.error)
        }
        else if (_res.success) {
            setStaffsData(_res.data)
        }
        console.log("staffs data from effect: ",staffsData)
    }

    //  fetch all courses
    const fetchCourses = async () => {
        if (coursesData.length !== 0) { return }
        const res = await fetch('/api/course/fetchAllCourses')
        const _res = await res?.json()
        if (_res.error) {
            console.log("error getting courses: ", _res.error)
        }
        else if (_res.success) {
            setCoursesData(_res.data)
        }
        console.log("courses data from effect: ",coursesData)
    }




    // verify user access token
    const getVerification = async () => {
        const res = await fetch("/api/auth/verifyToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: accessToken }),
        });
        const _verify = await res.json();
        console.log("_verify: ", _verify);
        setVerify(_verify?.success);
    };

    const getAccessToken = () => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            getVerification();
            setAccessToken(token)
        }
    }

    // load access token and user auth verification
    useEffect(() => {
        setLoading(true)
        getAccessToken()
        setLoading(false);
    }, [accessToken]);

    // fetch staffs and courses from database
    useEffect(()=>{
        fetchCourses()
        fetchStaffs()
    }, [])

    return <AppContext.Provider value={{ answers, setAnswers, staffsData, setStaffsData, coursesData, setCoursesData }}>{children}</AppContext.Provider>
}