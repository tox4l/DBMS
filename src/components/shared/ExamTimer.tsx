"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

type ExamTimerProps = {
  durationMinutes: number;
  onTimeUp: () => void;
  isRunning?: boolean;
};

export default function ExamTimer({ 
  durationMinutes, 
  onTimeUp, 
  isRunning = true 
}: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Color logic based on requirements
  let colorClass = "text-white border-white/20";
  let bgClass = "bg-black/50";
  let iconColor = "text-zinc-400";
  let animatePulse = false;

  if (minutes < 5) {
    colorClass = "text-red-500 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
    bgClass = "bg-red-500/10";
    iconColor = "text-red-500";
    animatePulse = true;
  } else if (minutes < 10) {
    colorClass = "text-amber-400 border-amber-400/50";
    bgClass = "bg-amber-400/10";
    iconColor = "text-amber-400";
  }

  return (
    <motion.div 
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded-xl border backdrop-blur-md transition-colors",
        colorClass,
        bgClass
      )}
      animate={animatePulse ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: animatePulse ? Infinity : 0, duration: 1 }}
    >
      <Clock className={clsx("w-5 h-5", iconColor)} />
      <div className="font-mono text-xl font-bold tracking-widest tabular-nums">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    </motion.div>
  );
}
