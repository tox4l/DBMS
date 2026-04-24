"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, Zap } from "lucide-react";
import { clsx } from "clsx";

export default function CountdownBanner() {
  const [mounted, setMounted] = useState(false);
  
  // Target: April 25, 2026 at 8:00 AM AST (UTC+3)
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

  if (timeLeft.isPassed) {
    return (
      <div className="w-full bg-red-500/20 border-b border-red-500/50 backdrop-blur-md sticky top-0 z-[100] overflow-hidden flex items-center justify-center p-3 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 animate-shimmer" />
        <div className="relative z-10 flex items-center gap-3 text-red-500 font-black tracking-widest font-outfit uppercase">
          <Zap className="w-5 h-5 fill-current" />
          EXAM TIME — You've got this 🔥
          <Zap className="w-5 h-5 fill-current" />
        </div>
      </div>
    );
  }

  const hoursTotal = timeLeft.totalMs / (1000 * 60 * 60);
  const isUnder24h = hoursTotal < 24;
  const isUnder1h = hoursTotal < 1;

  return (
    <div className={clsx(
      "w-full border-b backdrop-blur-md sticky top-0 z-[100] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 p-2 transition-colors duration-1000",
      isUnder1h ? "bg-red-500/10 border-red-500/30" : 
      isUnder24h ? "bg-amber-500/10 border-amber-500/30" : 
      "bg-black/80 border-white/10"
    )}>
      
      <div className={clsx(
        "flex items-center gap-2 font-bold text-sm tracking-widest uppercase",
        isUnder1h ? "text-red-500" : isUnder24h ? "text-amber-500" : "text-zinc-400"
      )}>
        {isUnder1h ? <AlertTriangle className={clsx("w-4 h-4", "animate-pulse")} /> : <Clock className="w-4 h-4" />}
        <span className="hidden md:inline">Final Exam Starts In</span>
        <span className="md:hidden">Exam In</span>
      </div>

      <div className="flex items-center gap-3 font-mono text-xl font-bold">
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className={clsx(
            "tabular-nums",
            isUnder1h ? "text-red-400" : isUnder24h ? "text-amber-400" : "text-primary"
          )}>
            {timeLeft.days.toString().padStart(2, '0')}
          </span>
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest">DD</span>
        </div>
        <span className="text-zinc-600 pb-3">:</span>
        
        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className={clsx(
            "tabular-nums",
            isUnder1h ? "text-red-400" : isUnder24h ? "text-amber-400" : "text-primary"
          )}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest">HH</span>
        </div>
        <span className="text-zinc-600 pb-3">:</span>
        
        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className={clsx(
            "tabular-nums",
            isUnder1h ? "text-red-400" : isUnder24h ? "text-amber-400" : "text-primary"
          )}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest">MM</span>
        </div>
        <span className="text-zinc-600 pb-3">:</span>
        
        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className={clsx(
            "tabular-nums",
            isUnder1h ? "text-red-500 animate-pulse" : isUnder24h ? "text-amber-500" : "text-white"
          )}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest">SS</span>
        </div>
      </div>
    </div>
  );
}
