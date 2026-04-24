"use client";

import { useAppStore } from "@/lib/store";
import { Award, Zap, Target, BookOpen, AlertCircle, BarChart3, TrendingUp } from "lucide-react";
import { clsx } from "clsx";
import modulesData from "@/data/modules.json";
import Link from "next/link";

export default function DashboardPage() {
  const { xp, completedModules, streak, answeredQuestions, weakAreas } = useAppStore();

  const totalModules = modulesData.length;
  const progressPercent = Math.round((completedModules.length / totalModules) * 100) || 0;
  
  const correctAnswers = Object.values(answeredQuestions).filter(v => v).length;
  const totalAnswers = Object.keys(answeredQuestions).length;
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

  const getLevel = (xp: number) => {
    if (xp < 500) return { level: 1, title: "Query Novice", next: 500 };
    if (xp < 2000) return { level: 2, title: "Schema Designer", next: 2000 };
    if (xp < 5000) return { level: 3, title: "Data Architect", next: 5000 };
    if (xp < 10000) return { level: 4, title: "SQL Ninja", next: 10000 };
    return { level: 5, title: "Database Master", next: 20000 };
  };

  const { level, title, next } = getLevel(xp);
  const xpProgress = (xp / next) * 100;

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto pb-32">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black font-outfit mb-4 text-glow">Progress & Analytics</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Track your journey to database mastery.
        </p>
      </header>

      {/* Gamification Banner */}
      <div className="glass-panel p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-between gap-8 border-primary/30 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center border-4 border-black shadow-[0_0_30px_rgba(14,165,233,0.5)]">
            <span className="text-4xl font-black text-black">{level}</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold font-outfit text-white mb-1">{title}</h2>
            <p className="text-zinc-400 font-medium">{xp} / {next} XP to next level</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 relative z-10">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-primary">Lvl {level}</span>
            <span className="text-zinc-400">Lvl {level + 1}</span>
          </div>
          <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-primary to-blue-400 relative"
              style={{ width: `${Math.min(xpProgress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-bold font-outfit text-white">{streak} Days</div>
            <div className="text-zinc-400 text-sm font-medium">Current Streak</div>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
            <Target className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-bold font-outfit text-white">{accuracy}%</div>
            <div className="text-zinc-400 text-sm font-medium">Average Accuracy</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-bold font-outfit text-white">{progressPercent}%</div>
            <div className="text-zinc-400 text-sm font-medium">Course Completion</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold font-outfit">Module Progress</h3>
          </div>
          <div className="space-y-4">
            {modulesData.map((mod: any) => {
              const isDone = completedModules.includes(mod.id);
              return (
                <div key={mod.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={clsx("w-3 h-3 rounded-full", isDone ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-zinc-600")} />
                    <span className={clsx("font-medium", isDone ? "text-white" : "text-zinc-400")}>{mod.title}</span>
                  </div>
                  {isDone ? (
                    <span className="text-green-500 text-sm font-bold">Completed</span>
                  ) : (
                    <Link href={`/modules/${mod.id}`} className="text-primary hover:text-primary-hover text-sm font-bold transition-colors">Start</Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-2xl font-bold font-outfit">Areas for Improvement</h3>
          </div>
          {weakAreas.length > 0 ? (
            <div className="space-y-3">
              <p className="text-zinc-400 mb-4 text-sm">Based on your practice session errors, we recommend reviewing these topics:</p>
              {Array.from(new Set(weakAreas)).map((area, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <span className="text-white font-medium">{area}</span>
                  <Link href="/practice" className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors">
                    Practice
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-zinc-500 text-center">
              <Award className="w-12 h-12 mb-3 opacity-20" />
              <p>No weak areas detected yet.<br/>Keep answering practice questions!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
