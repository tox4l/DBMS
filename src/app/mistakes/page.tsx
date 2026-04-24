"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, ChevronDown, Activity, Play, Zap, ShieldAlert } from "lucide-react";
import { useAppStore, Mistake } from "@/lib/store";
import modulesData from "@/data/modules.json";
import { clsx } from "clsx";

export default function MistakesPage() {
  const { mistakeBank, resolveMistake } = useAppStore();
  const [expandedMod, setExpandedMod] = useState<number | null>(null);

  const toggleMod = (id: number) => {
    setExpandedMod(expandedMod === id ? null : id);
  };

  const mistakesList = Object.values(mistakeBank);
  const unresolvedMistakes = mistakesList.filter(m => !m.resolved);
  const resolvedMistakes = mistakesList.filter(m => m.resolved);

  // Group unresolved by module
  const unresolvedByMod = useMemo(() => {
    const groups: Record<number, Mistake[]> = {};
    unresolvedMistakes.forEach(m => {
      if (!groups[m.moduleId]) groups[m.moduleId] = [];
      groups[m.moduleId].push(m);
    });
    // Sort each group by frequency
    Object.keys(groups).forEach(modId => {
      groups[parseInt(modId)].sort((a, b) => b.frequency - a.frequency);
    });
    return groups;
  }, [unresolvedMistakes]);

  // Weekly Stats (mock week window based on Date.now for demo)
  const lastWeekMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weeklyMistakes = mistakesList.filter(m => new Date(m.timestamp).getTime() > lastWeekMs);
  const weeklyResolved = weeklyMistakes.filter(m => m.resolved).length;

  return (
    <div className="min-h-screen bg-[#020202] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-5xl font-black font-outfit text-white uppercase tracking-tight">
              Mistake Bank
            </h1>
          </div>
          <p className="text-zinc-400 max-w-2xl text-lg">
            A persistent record of your incorrect answers. Resolve them to improve your exam readiness.
          </p>
        </header>

        {/* Top Summary & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-center">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Unresolved</h3>
            <div className="text-6xl font-black font-mono text-red-500">{unresolvedMistakes.length}</div>
          </div>
          
          <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-center">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">7-Day Summary</h3>
            <p className="text-zinc-300">You made <span className="text-white font-bold">{weeklyMistakes.length}</span> mistakes this week.</p>
            <p className="text-zinc-400 text-sm mt-1">{weeklyResolved} of them have been resolved.</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-bold text-white mb-4">Ready to Recover?</h3>
            <Link 
              href={unresolvedMistakes.length > 0 ? "/mistakes/drill" : "#"}
              className={clsx(
                "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                unresolvedMistakes.length > 0 
                  ? "bg-primary text-black hover:bg-primary-hover shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:scale-105" 
                  : "bg-white/5 text-zinc-500 cursor-not-allowed"
              )}
            >
              <Play className="w-5 h-5 fill-current" /> Drill My Mistakes
            </Link>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6 font-outfit border-b border-white/10 pb-4">Needs Attention</h2>
          
          {Object.keys(unresolvedByMod).length === 0 && (
            <div className="text-center p-12 glass-panel rounded-3xl border-dashed border-white/10">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white">All Clear</h3>
              <p className="text-zinc-500">You have no unresolved mistakes right now.</p>
            </div>
          )}

          {modulesData.map((mod) => {
            const mistakes = unresolvedByMod[mod.id];
            if (!mistakes || mistakes.length === 0) return null;

            const isExpanded = expandedMod === mod.id;

            return (
              <div key={mod.id} className="glass-panel rounded-3xl border border-red-500/20 overflow-hidden">
                <button 
                  onClick={() => toggleMod(mod.id)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center font-black text-xl text-red-500">
                      {mistakes.length}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Module {mod.id}: {mod.title}</h2>
                    </div>
                  </div>
                  <ChevronDown className={clsx("w-6 h-6 text-zinc-400 transition-transform duration-300", isExpanded && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <div className="p-6 space-y-6">
                        {mistakes.map(m => (
                          <div key={m.id} className="bg-black/50 rounded-2xl border border-white/5 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                                Failed {m.frequency} time{m.frequency > 1 ? 's' : ''}
                              </span>
                              <span className="text-xs text-zinc-500">{new Date(m.timestamp).toLocaleDateString()}</span>
                            </div>
                            
                            <h3 className="text-lg font-medium text-white mb-6">{m.questionText}</h3>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                                <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Your Answer</div>
                                <div className="text-red-400 line-through opacity-80">{m.wrongAnswer}</div>
                              </div>
                              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Correct Answer</div>
                                <div className="text-primary">{m.correctAnswer}</div>
                              </div>
                            </div>
                            
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                              <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                                <Zap className="w-4 h-4 text-amber-500" /> Explanation
                              </div>
                              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{m.explanation}</p>
                            </div>

                            <button 
                              onClick={() => resolveMistake(m.id)}
                              className="px-6 py-3 rounded-full bg-green-500/10 text-green-400 font-bold hover:bg-green-500/20 border border-green-500/20 transition-colors flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-5 h-5" /> I understand this now
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Resolved Section */}
        {resolvedMistakes.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold text-zinc-500 mb-6 font-outfit">Resolved ({resolvedMistakes.length})</h2>
            <div className="space-y-4">
              {resolvedMistakes.map(m => (
                <div key={m.id} className="glass-panel p-4 rounded-xl opacity-50 flex items-center justify-between hover:opacity-100 transition-opacity">
                  <div className="truncate pr-4 flex-1">
                    <span className="text-xs font-bold text-zinc-500 mr-2">M{m.moduleId}</span>
                    <span className="text-zinc-400 text-sm">{m.questionText}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
