'use client'

import { useState, useEffect, useRef } from 'react';

const CountdownTimer = ({ initialMinutes = 10, initialSeconds = 0 }) => {
    const [minutes, setMinutes] = useState(parseInt(initialMinutes));
    const [seconds, setSeconds] = useState(initialSeconds);

    const [storageChecked, setStorageChecked] = useState(false);

    const minutesRef = useRef(minutes);
    const secondsRef = useRef(seconds);

    // Fetch timer data from local storage when component mounted
    useEffect(() => {
        console.log("entering effect to load timer from local...");

        const storedTime = localStorage.getItem('countdownTime');
        if (storedTime) {
            const { storedMinutes, storedSeconds, storedTimestamp } = JSON.parse(storedTime);

            const now = Date.now();
            const elapsed = Math.floor((now - storedTimestamp) / 1000); // Time elapsed in seconds
            const totalSeconds = storedMinutes * 60 + storedSeconds - elapsed;

            if (totalSeconds > 0) {
                const newMinutes = Math.floor(totalSeconds / 60);
                const newSeconds = totalSeconds % 60;
                setMinutes(newMinutes);
                setSeconds(newSeconds);

                minutesRef.current = newMinutes;
                secondsRef.current = newSeconds;
            } else {
                setMinutes(0);
                setSeconds(0);
            }
        }
        // Register when the local storage is checked
        setStorageChecked(true);
        console.log("storage checked... step1: storedTime is: ", storedTime)
    }, []); // Run only once when the component mounts

    // Update local storage whenever minutes or seconds change
    useEffect(() => {
        minutesRef.current = minutes;
        secondsRef.current = seconds;

        localStorage.setItem('countdownTime', JSON.stringify({
            storedMinutes: minutes,
            storedSeconds: seconds,
            storedTimestamp: Date.now()
        }));
        console.log("saved to local... step 2")
    }, [minutes, seconds]);

    // Run this piece of code every second of the countdown
    useEffect(() => {


        if (storageChecked) {
            console.log("interval is set... step 3")
            const timer = setInterval(() => {
                if (secondsRef.current > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                } else {
                    if (minutesRef.current === 0) {
                        clearInterval(timer);
                    } else {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);

           

            return () => clearInterval(timer);
        }
        else{
            console.log("interval not set... step 3b")
        }
    }, [storageChecked]); // Run only when storageChecked changes




    return (

        <div>
            <div className={`flex justify-center items-center bg-green-800 py-2 px-5 text-2xl font-bold ${minutes < 4 && minutes >= 2 && 'bg-rose-400'} ${minutes < 2 && 'bg-rose-900'} `}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <p className={` ${minutes < 2 ? 'text-rose-800' : 'text-green-500'}`}>Time Remaining</p>
        </div>

    );
};

export default CountdownTimer;
