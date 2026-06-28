"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GAME_DURATION } from "@/lib/constants";
import { playTickSound } from "@/utils/sounds";

interface UseTimerOptions {
  onComplete: () => void;
  autoStart?: boolean;
}

export function useTimer({ onComplete, autoStart = true }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onCompleteRef.current();
          }
          return 0;
        }

        if (prev <= 11) {
          playTickSound();
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, timeLeft]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);

  const progress = (timeLeft / GAME_DURATION) * 100;
  const isUrgent = timeLeft <= 10 && timeLeft > 0;

  return {
    timeLeft,
    progress,
    isUrgent,
    isRunning,
    pause,
    resume,
  };
}
