"use client";
import React, { useState, useEffect } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeRemaining = (endDate: string): TimeRemaining => {
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  const difference = end - now;

  let timeRemaining: TimeRemaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeRemaining = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeRemaining;
};

interface CountdownTimerProps {
  endDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(endDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="mt-8 flex space-x-4">
      <div className="text-black p-2 bg-white rounded-sm text-center w-[60px]">
        <span className="block text-3xl font-semibold" suppressHydrationWarning>
          {timeRemaining.days}
        </span>
        <span className="block text-sm">Days</span>
      </div>
      <div className="text-black p-2 bg-white rounded-sm text-center w-[60px]">
        <span className="block text-3xl font-semibold" suppressHydrationWarning>
          {timeRemaining.hours}
        </span>
        <span className="block text-sm">Hr</span>
      </div>
      <div className="text-black p-2 bg-white rounded-sm text-center w-[60px]">
        <span className="block text-3xl font-semibold" suppressHydrationWarning>
          {timeRemaining.minutes}
        </span>
        <span className="block text-sm">Min</span>
      </div>
      <div className="text-black p-2 bg-white rounded-sm text-center w-[60px]">
        <span className="block text-3xl font-semibold" suppressHydrationWarning>
          {timeRemaining.seconds}
        </span>
        <span className="block text-sm">Sc</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
