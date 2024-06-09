import { useState, useEffect, useRef } from 'react';

const CountdownTimer = ({ initialMinutes = 10, initialSeconds = 0 }) => {
    const [minutes, setMinutes] = useState(parseInt(initialMinutes));
    const [seconds, setSeconds] = useState(initialSeconds);

    const [storageChecked, setStorageChecked] = useState(false)

    const minutesRef = useRef(minutes)
    const secondsRef = useRef(seconds)

    //   fetch timer data from local storage when component mounted
    useEffect(() => {
        console.log("entering effect to load timer from local...")
        
        const storedTime = localStorage.getItem('countdownTime');
        if (storedTime) {
            const { storedMinutes, storedSeconds, storedTimestamp } = JSON.parse(storedTime);

            const now = Date.now()
            const elapsed = Math.floor((now - storedTimestamp) / 1000)
            const totalSeconds = storedMinutes * 60 + storedSeconds - elapsed

            if (totalSeconds > 0) {
                const newMinutes = Math.floor(totalSeconds / 60)
                const newSeconds = totalSeconds % 60
                setMinutes(newMinutes);
                setSeconds(newSeconds);

                minutesRef.current = newMinutes
                secondsRef.current = newSeconds
            }
            else{
                setMinutes(0)
                setSeconds(0)
            }
        }

        // register when the local storage is chedcked
        setStorageChecked(true)
    }, []);

    //   run this piece of code when component mounted or whenever minutes or seconds changes
    useEffect(() => {
        minutesRef.current = minutes
        secondsRef.current = seconds

        localStorage.setItem('countdownTime', JSON.stringify({
            storedMinutes: minutes,
            storedSeconds: seconds,
            storedTimestamp: Date.now()
        }));
    }, [minutes, seconds]);

    //   run this piece of code every second of the countdown
    useEffect(() => {

        // run this only when the local storage has been checked
        if(storageChecked){
            const timer = setInterval(() => {
                if (secondsRef.current > 0) {
                    setSeconds(secondsRef.current - 1);
                } else {
                    if (minutesRef.current === 0) {
                        clearInterval(timer);
                    } else {
                        setMinutes(minutesRef.current - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
    
            return () => clearInterval(timer);
        }  
    }, [minutes, seconds]);



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
