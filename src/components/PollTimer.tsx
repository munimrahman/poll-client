import React, { useState, useEffect } from "react";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";

interface PollTimerProps {
  expiresAt: string;
}

export default function PollTimer({ expiresAt }: PollTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const expiryDate = new Date(expiresAt);

    const updateTimer = () => {
      const now = new Date();
      const expired = now >= expiryDate;

      setIsExpired(expired);

      if (expired) {
        setTimeLeft("Poll has ended");
      } else {
        const secondsLeft = differenceInSeconds(expiryDate, now);

        if (secondsLeft < 60) {
          // Less than a minute left
          setTimeLeft(`${secondsLeft} seconds left`);
        } else {
          // More than a minute
          setTimeLeft(
            `Ends ${formatDistanceToNow(expiryDate, { addSuffix: true })}`
          );
        }
      }
    };

    // Update now
    updateTimer();

    // Then update every second if close to expiry, otherwise every minute
    const interval = setInterval(
      updateTimer,
      differenceInSeconds(expiryDate, new Date()) < 60 ? 1000 : 60000
    );

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className={`text-sm ${isExpired ? "text-red-500" : "text-gray-500"}`}>
      {timeLeft}
    </div>
  );
}
