"use client";

import Link from "next/link";
import { BookOpen, CheckCircle2, Lock, Play, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import modulesData from "@/data/modules.json";
import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function ModulesPage() {
  const { completedModules, xp } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black font-outfit mb-4 text-glow">Course Modules</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            The complete DBMS curriculum compressed into lossless, high-impact modules. Read through the theory before jumping into the practice labs.
          </p>
        </div>
        
        {/* Global Stats */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 shrink-0 flex items-center gap-6">
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Total XP</div>
            <div className="text-3xl font-black font-mono text-primary text-glow">{xp.toLocaleString()}</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Progress</div>
            <div className="text-3xl font-black font-mono text-white">
              {Math.round((completedModules.length / modulesData.length) * 100)}%
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modulesData.map((mod: any, index: number) => {
          const isCompleted = completedModules.includes(mod.id);
          // Module 1 is always unlocked. Others require the previous module to be completed.
          const isUnlocked = mod.id === 1 || completedModules.includes(mod.id - 1);
          
          return (
            <div key={mod.id} className="relative group">
              {/* If locked, overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 z-20 rounded-3xl bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center border border-white/5 cursor-not-allowed">
                  <div className="w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-zinc-500" />
                  </div>
                  <div className="text-zinc-400 font-bold font-outfit text-lg">Locked</div>
                  <div className="text-zinc-600 text-sm mt-1">Complete Module {mod.id - 1} to unlock</div>
                </div>
              )}
              
              <Link 
                href={isUnlocked ? `/modules/${mod.id}` : '#'}
                onClick={(e) => !isUnlocked && e.preventDefault()}
                className={clsx(
                  "block h-full glass-panel p-8 rounded-3xl transition-all duration-500 relative overflow-hidden flex flex-col border",
                  isCompleted 
                    ? "border-green-500/20 bg-green-500/[0.02]" 
                    : isUnlocked 
                      ? "border-white/10 hover:border-primary/50 hover:bg-white/[0.02] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,255,255,0.1)]" 
                      : "border-white/5 opacity-50"
                )}
              >
                {/* Background Number */}
                <div className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.02] pointer-events-none transition-colors group-hover:text-primary/[0.05]">
                  {mod.id}
                </div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={clsx(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl",
                    isCompleted ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : `M${mod.id}`}
                  </div>
                  
                  {isUnlocked && !isCompleted && (
                    <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                      Active
                    </div>
                  )}
                </div>
                
                <h2 className={clsx(
                  "text-2xl font-bold font-outfit mb-4 relative z-10 transition-colors line-clamp-2",
                  isUnlocked && !isCompleted && "group-hover:text-primary",
                  isCompleted && "text-green-100"
                )}>
                  {mod.title}
                </h2>
                
                <p className="text-zinc-400 text-sm mb-8 flex-1 relative z-10 line-clamp-3 leading-relaxed">
                  {mod.content.substring(0, 150).replace(/[#*`]/g, '')}...
                </p>
                
                <div className="mt-auto relative z-10 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Reward</span>
                    <span className="text-sm font-mono font-bold text-amber-400">+500 XP</span>
                  </div>
                  
                  {isUnlocked && (
                    <div className={clsx(
                      "mt-4 flex items-center justify-center w-full py-3 rounded-xl font-bold transition-all gap-2",
                      isCompleted 
                        ? "bg-white/5 text-zinc-300 hover:bg-white/10" 
                        : "bg-primary text-black hover:bg-primary-hover shadow-lg shadow-primary/20"
                    )}>
                      {isCompleted ? "Review Material" : "Start Learning"}
                      {!isCompleted && <Play className="w-4 h-4" />}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
