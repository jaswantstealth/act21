"use client";

import React, { useEffect, useState, useRef } from "react";

type CountdownProps = {
  targetDate: string;
  onComplete?: () => void; // 👈 optional callback
};

const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const parts = {
    days: { text: ["days", "day"], dots: 60 },
    hours: { text: ["hours", "hour"], dots: 60 },
    minutes: { text: ["minutes", "minute"], dots: 60 },
    seconds: { text: ["seconds", "second"], dots: 60 },
  };

  const getRemainingTime = (target: Date, now: Date) => {
    let seconds = Math.floor((target.getTime() - now.getTime()) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const target = new Date(targetDate);

    const updateCountdown = () => {
      const now = new Date();
      const remaining = getRemainingTime(target, now);

      if (
        remaining.days <= 0 &&
        remaining.hours <= 0 &&
        remaining.minutes <= 0 &&
        remaining.seconds <= 0
      ) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsComplete(true); // 👈 set countdown complete
        if (onComplete) {
          onComplete(); // 👈 fire callback
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // 👈 stop countdown
        }
      } else {
        setTimeRemaining(remaining);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (isComplete) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "2rem",
          padding: "2rem",
        }}
      >
       Event is Expried!
      </div>
    );
  }

  return (
    <div className="countdown" style={{}}>
      {Object.entries(parts).map(([key, value]) => (
        <div key={key} className="part" style={{}}>
          <div
            className="remaining"
            style={{ color: "white", display: "grid", textAlign: "center" }}
          >
            <span className="number" style={{ color: "hsl(0 0% 100%)" }}>
              {timeRemaining[key as keyof typeof timeRemaining]}
            </span>
          </div>
          {Array.from({ length: value.dots }).map((_, i) => (
            <div
              key={i}
              className="dot-container"
              style={{
                rotate: `calc(360deg / ${value.dots} * ${i})`,
                height: "100%",
              }}
            >
              <div
                className="dot"
                style={{
                  backgroundColor:
                    i <= timeRemaining[key as keyof typeof timeRemaining]
                      ? "var(--dot-color-remaining)"
                      : "var(--dot-color-active)",
                }}
              />
            </div>
          ))}
          <span className="text">
            {
              value.text[
                Number(timeRemaining[key as keyof typeof timeRemaining] === 1)
              ]
            }
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
