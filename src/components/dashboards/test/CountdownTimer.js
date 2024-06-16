'use client'

// components/CountdownTimer.js
import { useEffect, useState } from 'react';

const CountdownTime = ({ minutes }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const endTime = localStorage.getItem('endTime');
    if (endTime) {
      const remainingTime = Math.floor((new Date(endTime) - new Date()) / 1000);
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
        setIsActive(true);
      } else {
        localStorage.removeItem('endTime');
      }
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(interval);
            localStorage.removeItem('endTime');
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => {
    const endTime = new Date(new Date().getTime() + timeLeft * 1000);
    localStorage.setItem('endTime', endTime);
    setIsActive(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>{formatTime(timeLeft)}</div>
      <button onClick={startTimer} disabled={isActive}>
        Start Timer
      </button>
    </div>
  );
};

export default CountdownTime;
