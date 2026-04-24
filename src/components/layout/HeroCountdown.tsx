"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function HeroCountdown() {
  const [mounted, setMounted] = useState(false);
  const targetDate = new Date("2026-04-25T08:00:00+03:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
    totalMs: 0
  });

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isPassed: true, totalMs: 0 }));
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isPassed: false,
        totalMs: difference
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const hoursTotal = timeLeft.totalMs / (1000 * 60 * 60);
  const isUnder24h = hoursTotal < 24 && !timeLeft.isPassed;
  const isUnder1h = hoursTotal < 1 && !timeLeft.isPassed;

  if (timeLeft.isPassed) {
    return (
      <div className="mt-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-md inline-flex items-center gap-4 animate-pulse shadow-[0_0_50px_rgba(239,68,68,0.2)]">
        <span className="text-4xl md:text-5xl font-black font-outfit text-red-500 uppercase tracking-widest text-glow">
          EXAM TIME
        </span>
      </div>
    );
  }

  const TimeBlock = ({ value, label, highlight }: { value: number, label: string, highlight: string }) => (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md min-w-[80px] md:min-w-[120px]">
      <span className={clsx("text-4xl md:text-7xl font-black font-outfit tabular-nums", highlight)}>
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm text-zinc-500 uppercase tracking-[0.3em] mt-2 font-bold">{label}</span>
    </div>
  );

  const activeColor = isUnder1h ? "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" : 
                      isUnder24h ? "text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" : 
                      "text-primary drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-12 flex flex-wrap items-center gap-2 md:gap-4"
    >
      <TimeBlock value={timeLeft.days} label="Days" highlight={activeColor} />
      <span className="text-4xl md:text-6xl text-zinc-700 font-light">:</span>
      <TimeBlock value={timeLeft.hours} label="Hours" highlight={activeColor} />
      <span className="text-4xl md:text-6xl text-zinc-700 font-light">:</span>
      <TimeBlock value={timeLeft.minutes} label="Mins" highlight={activeColor} />
      <span className="text-4xl md:text-6xl text-zinc-700 font-light">:</span>
      <div className={clsx("transition-transform", isUnder1h ? "animate-pulse" : "")}>
        <TimeBlock value={timeLeft.seconds} label="Secs" highlight={isUnder24h ? activeColor : "text-white"} />
      </div>
    </motion.div>
  );
}
