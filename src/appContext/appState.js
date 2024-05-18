'use client'

import { createContext, useContext, useState, useEffect } from "react";


const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    // State for the app context.
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState(typeof window !== 'undefined' ? localStorage.getItem('answers') & JSON.parse(localStorage.getItem('answers')) : {})
    const [staffsData, setStaffsData] = useState([]);
    const [coursesData, setCoursesData] = useState([])

    // const [users, setUsers] = useState(null);
    const [verify, setVerify] = useState(false);

    const [userData, setUserData] = useState(typeof window !== 'undefined' ? localStorage.getItem('userData') : {})
    const [currentUserId, setCurrentUserId] = useState(typeof window !== 'undefined' ? localStorage.getItem('currentUserId') : {})

    const [accessToken, setAccessToken] = useState(
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    );

    //   fetch all staffs
    const fetchStaffs = async () => {
        if (staffsData.length !== 0) { return }
        const res = await fetch('/api/staff/fetchAllStaffs')
        if (!res.ok) { console.log("server failed: ", res) }
        const _res = await res?.json()
        if (_res.error) {
            console.log("error getting staffs: ", _res.error)
        }
        else if (_res.success) {
            setStaffsData(_res.data)
        }
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
        console.log("verify in verification: ", _verify.success)
        setVerify(() => { return _verify.success });
        return _verify.success
    };

    const getAccessToken = () => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            const _verify = getVerification();
            console.log("verify returned in getAccessToken(): ", _verify)
            if (_verify) { setAccessToken(token) }
            return _verify
        }
    }
    // signin function
    const signIn = (token, userId, data) => {
        console.log("signing in...")
        localStorage.setItem("accessToken", token);
        localStorage.setItem("currentUserId", userId);
        localStorage.setItem("userData", data)
        setAccessToken(token);
        setCurrentUserId(userId);
        setUserData(data)
        setVerify(true)
    };

    //   signout function
    const signOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUserId");
        localStorage.removeItem("userData")
        router.push("/");
    };

    // fetch staffs and courses from database
    useEffect(() => {
        fetchStaffs()
        console.log("staffs data from effect: ", staffsData)
        fetchCourses()
        console.log("courses data from effect: ", coursesData)
    })



    return <AppContext.Provider value={{ answers, setAnswers, staffsData, setStaffsData, coursesData, setCoursesData, signIn, signOut, userData, setUserData, getAccessToken, currentUserId }}>{children}</AppContext.Provider>
}