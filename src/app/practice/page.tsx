"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Trophy, Crosshair, Target, Clock, Zap } from "lucide-react";
import { useAppStore } from "@/lib/store";
import modulesData from "@/data/modules.json";
import questionsData from "@/data/questions.json";
import { clsx } from "clsx";

const SETS = [
  { id: 1, title: "Fundamentals", desc: "Easy difficulty concepts to build your base.", diff: "easy", icon: Target },
  { id: 2, title: "Core Concepts", desc: "Medium difficulty standard questions.", diff: "medium", icon: Zap },
  { id: 3, title: "Advanced & Edge Cases", desc: "Hard questions to test deep understanding.", diff: "hard", icon: Crosshair },
  { id: 4, title: "Trap Questions", desc: "Common misconceptions and tricky wording.", diff: "trap", icon: Crosshair },
  { id: 5, title: "Mixed Exam Style", desc: "A realistic blend of all difficulties.", diff: "mixed", icon: Trophy }
];

export default function PracticeHubPage() {
  const [expandedMod, setExpandedMod] = useState<number | null>(null);
  const { bestSetScores } = useAppStore();

  const toggleMod = (id: number) => {
    setExpandedMod(expandedMod === id ? null : id);
  };

  const getQuestionCount = (modId: number, setType: string) => {
    if (setType === "mixed") {
      return questionsData.filter((q: any) => q.moduleId === modId).length;
    }
    return questionsData.filter((q: any) => q.moduleId === modId && q.difficulty === setType).length;
  };

  return (
    <div className="min-h-screen bg-[#020202] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16">
          <h1 className="text-5xl font-black font-outfit text-white mb-4 uppercase tracking-tight text-glow">
            Practice Hub
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Master the curriculum by completing structured question sets. Select a module below to view available drills.
          </p>
        </header>

        <div className="space-y-6">
          {modulesData.map((mod) => {
            const isExpanded = expandedMod === mod.id;
            
            return (
              <div key={mod.id} className="glass-panel rounded-3xl border border-white/5 overflow-hidden transition-all duration-300">
                
                {/* Module Header */}
                <button 
                  onClick={() => toggleMod(mod.id)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-2xl text-primary font-outfit">
                      M{mod.id}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-outfit text-white">{mod.title}</h2>
                      <p className="text-zinc-500 text-sm mt-1">5 structured sets available</p>
                    </div>
                  </div>
                  <ChevronDown className={clsx("w-6 h-6 text-zinc-400 transition-transform duration-300", isExpanded && "rotate-180")} />
                </button>

                {/* Expanded Sets Grid */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {SETS.map((set) => {
                          const Icon = set.icon;
                          const qCount = getQuestionCount(mod.id, set.diff);
                          const scoreKey = `${mod.id}-${set.id}`;
                          const bestScore = bestSetScores[scoreKey] || 0;
                          
                          return (
                            <div key={set.id} className="bg-black/40 rounded-2xl border border-white/5 p-6 flex flex-col hover:border-white/10 transition-colors relative overflow-hidden group">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-white/5 text-zinc-300">
                                  <Icon className="w-5 h-5" />
                                </div>
                                {bestScore > 0 && (
                                  <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                    Best: {bestScore}%
                                  </div>
                                )}
                              </div>
                              
                              <h3 className="text-lg font-bold text-white mb-2">{set.title}</h3>
                              <p className="text-zinc-500 text-sm mb-6 flex-1">{set.desc}</p>
                              
                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                                  <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {qCount} Qs</span>
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~{Math.ceil(qCount * 1.5)}m</span>
                                </div>
                                
                                {qCount > 0 ? (
                                  <Link 
                                    href={`/practice/${mod.id}/${set.id}`}
                                    className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center hover:bg-primary-hover transition-colors group-hover:scale-110 active:scale-95"
                                  >
                                    <Play className="w-4 h-4 ml-1" />
                                  </Link>
                                ) : (
                                  <div className="text-xs text-zinc-600 font-bold">N/A</div>
                                )}
                              </div>
                            </div>
                          );
                        })}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
