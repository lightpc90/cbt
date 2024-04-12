'use client'

import { createContext, useContext, useState } from "react";


const AppContext = createContext();
export const useAppContext =  () => useContext(AppContext);
export const AppProvider = ({ children }) => {
    // State for the app context.
    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState(typeof window !== 'undefined' ? localStorage.getItem('answers') & JSON.parse(localStorage.getItem('answers')) : {})
    const [userData, setUserData] = useState({});
    return <AppContext.Provider value={{answers, setAnswers}}>{children}</AppContext.Provider>
}