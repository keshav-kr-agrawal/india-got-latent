"use client";

import { useEffect, useState } from "react";
import { NEXT_EVENT_DATE } from "@/lib/data";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const diff = NEXT_EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface CountdownTimerProps {
  variant?: "hero" | "compact";
}

export function CountdownTimer({ variant = "hero" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="text-center">
              <span className="font-heading text-2xl font-bold text-gold">
                {String(unit.value).padStart(2, "0")}
              </span>
              <p className="text-[10px] tracking-wider uppercase text-text-secondary">
                {unit.label}
              </p>
            </div>
            {i < units.length - 1 && (
              <span className="text-gold/40 text-xl font-light">:</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-4 md:gap-8">
          <div className="text-center">
            <div className="border border-border bg-card px-4 py-3 md:px-6 md:py-4 min-w-[72px] md:min-w-[96px]">
              <span className="font-heading text-3xl md:text-5xl font-bold text-foreground">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-2 text-[10px] md:text-xs tracking-[0.15em] uppercase text-text-secondary">
              {unit.label}
            </p>
          </div>
          {i < units.length - 1 && (
            <span className="text-gold/30 text-2xl md:text-4xl font-light hidden sm:block">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
