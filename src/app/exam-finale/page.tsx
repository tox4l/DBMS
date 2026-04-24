"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldAlert, Crosshair, BrainCircuit, Activity, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useAppStore } from "@/lib/store";
import modulesData from "@/data/modules.json";

export default function ExamFinalePage() {
  const { completedModules, xp } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // The finale should realistically be locked until all modules are done.
  // For demo purposes, let's say they need at least 50% of modules done, or we just leave it unlocked with a warning.
  const isLocked = completedModules.length < modulesData.length;
  
  // Calculate a fake "Readiness Score" based on XP and completed modules
  const maxPossibleXp = modulesData.length * 500 + 500; // rough estimate
  const readinessPercentage = Math.min(Math.round((xp / maxPossibleXp) * 100), 100);

  const getReadinessColor = () => {
    if (readinessPercentage >= 80) return "text-green-400 stroke-green-400";
    if (readinessPercentage >= 50) return "text-amber-400 stroke-amber-400";
    return "text-red-500 stroke-red-500";
  };

  return (
    <div className="min-h-screen bg-[#020202] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-outfit text-white mb-6 uppercase tracking-tight">
            Exam <span className="text-red-500">Finale</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            The ultimate testing ground. This sector is designed to push your database knowledge to its absolute limit using real exam traps and high-frequency trick questions.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Readiness Dial */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center p-8 glass-panel rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-8">Readiness Score</h3>
            
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="8"
                />
                {/* Progress Circle */}
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  className={getReadinessColor()}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * readinessPercentage) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={clsx("text-6xl font-black font-mono tracking-tighter", getReadinessColor().split(' ')[0])}>
                  {readinessPercentage}
                </span>
                <span className="text-zinc-500 font-bold font-outfit mt-1">%</span>
              </div>
            </div>
            
            <p className="text-center mt-8 text-zinc-400 text-sm">
              {readinessPercentage < 50 && "You are not ready. Complete more modules."}
              {readinessPercentage >= 50 && readinessPercentage < 80 && "You have a foundation, but traps will catch you. Proceed with caution."}
              {readinessPercentage >= 80 && "You are primed and ready for the real exam."}
            </p>
          </div>

          {/* Modes Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Trap Hunter Mode */}
            <Link 
              href="/exam-finale/trap-hunter"
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 group transition-all relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Crosshair className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold font-outfit text-white mb-3">Trap Hunter</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                A rapid-fire gauntlet of exclusively trick questions and common misconceptions. Identify the traps before they identify you.
              </p>
              <div className="text-amber-500 font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Commence Hunt &rarr;
              </div>
            </Link>

            {/* Weak Areas Drill */}
            <Link 
              href="/exam-finale/drill"
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 group transition-all relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold font-outfit text-white mb-3">Targeted Drill</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                The system analyzes your past mistakes and generates a custom exam focusing solely on your weakest curriculum areas.
              </p>
              <div className="text-blue-500 font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Start Drill &rarr;
              </div>
            </Link>

            {/* Full Mock Exam */}
            <Link 
              href="/exam-finale/mock"
              className={clsx(
                "glass-panel p-8 rounded-3xl border transition-all md:col-span-2 relative overflow-hidden flex items-center justify-between group",
                isLocked ? "border-white/5 opacity-50 cursor-not-allowed" : "border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5"
              )}
              onClick={(e) => isLocked && e.preventDefault()}
            >
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-red-500" />
                  </div>
                  {isLocked && (
                    <div className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-xs font-bold text-zinc-500 flex items-center gap-2">
                      <Lock className="w-3 h-3" /> LOCKED (Complete all modules)
                    </div>
                  )}
                </div>
                <h2 className="text-3xl font-black font-outfit text-white mb-3 uppercase tracking-tight">Full Mock Exam</h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                  The real deal. 40 questions. 60 minutes. A mix of standard theory, SQL/Mongo queries, and deadly exam traps. Do not take this lightly.
                </p>
              </div>
              
              {!isLocked && (
                <div className="relative z-10 hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-red-500/30 text-red-500 group-hover:bg-red-500/10 transition-colors">
                  <span className="font-bold uppercase tracking-widest text-xs">Start</span>
                </div>
              )}
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
