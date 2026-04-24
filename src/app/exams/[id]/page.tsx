"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Flag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import questionsData from "@/data/questions.json";
import modulesData from "@/data/modules.json";
import { useAppStore } from "@/lib/store";
import QuestionCard from "@/components/shared/QuestionCard";
import ExamTimer from "@/components/shared/ExamTimer";

// Helper to shuffle array
const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export default function ModuleExamPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const mod = modulesData.find((m: any) => m.id === id);

  const { markModuleCompleted, addXP } = useAppStore();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flags, setFlags] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Just select 20 random MCQ questions for now
    const mcqs = questionsData.filter((q: any) => q.type === "mcq");
    setQuestions(shuffle(mcqs).slice(0, 20));
  }, []);

  if (!mod || questions.length === 0) {
    return <div className="p-12 text-center text-zinc-400">Loading Exam...</div>;
  }

  const handleAnswer = (isCorrect: boolean, selectedIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: selectedIndex }));
  };

  const toggleFlag = () => {
    setFlags(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer.charCodeAt(0) - 65) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    if (!confirm("Are you sure you want to submit?")) return;
    
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (finalScore >= 70) {
      markModuleCompleted(id);
      addXP(finalScore * 10);
    }
  };

  const handleTimeUp = () => {
    alert("Time is up! Submitting your exam automatically.");
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);
    
    if (finalScore >= 70) {
      markModuleCompleted(id);
      addXP(finalScore * 10);
    }
  };

  if (isSubmitted) {
    const passed = score >= 70;
    return (
      <div className="min-h-screen bg-black p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
              "p-12 rounded-3xl text-center mb-12 border",
              passed ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
            )}
          >
            {passed ? <ShieldCheck className="w-24 h-24 text-green-500 mx-auto mb-6" /> : <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-6" />}
            <h1 className="text-4xl md:text-6xl font-black font-outfit mb-4 text-white">
              {score}% - {passed ? "PASSED" : "FAILED"}
            </h1>
            <p className="text-zinc-400 text-lg mb-8">
              {passed ? "Excellent work. You have unlocked the next module." : "You must score at least 70% to pass. Review the traps and try again."}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/modules" className="px-8 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
                Return to Dashboard
              </Link>
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-6">Review Missed Questions</h3>
          <div className="space-y-6">
            {questions.map((q, idx) => {
              const selectedIdx = answers[idx];
              const correctIdx = q.answer.charCodeAt(0) - 65;
              if (selectedIdx === correctIdx && !q.isTrap) return null; // Only show mistakes or traps

              return (
                <div key={idx}>
                  <div className="text-zinc-500 mb-2 font-bold font-mono">Question {idx + 1}</div>
                  <QuestionCard 
                    question={q}
                    mode="exam"
                    showResults={true}
                    userAnswerIndex={selectedIdx}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col">
      {/* Exam Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/modules" className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-white font-bold font-outfit">{mod.title} Exam</h2>
            <div className="text-xs font-mono text-zinc-500">Question {currentIdx + 1} of {questions.length}</div>
          </div>
        </div>
        <ExamTimer durationMinutes={30} onTimeUp={handleTimeUp} />
      </div>

      <div className="flex-1 flex flex-col md:flex-row max-w-[1400px] w-full mx-auto p-6 gap-8">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionCard 
                question={{
                  ...currentQ,
                  correctAnswer: currentQ.answer.charCodeAt(0) - 65,
                  options: currentQ.options.map((o: string) => o.replace(/^[A-D]\)\\s*/, ''))
                }}
                mode="exam"
                userAnswerIndex={answers[currentIdx]}
                onAnswer={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={toggleFlag}
              className={clsx(
                "px-4 py-2 rounded-xl border flex items-center gap-2 font-bold transition-colors",
                flags[currentIdx] ? "bg-amber-500/20 border-amber-500/50 text-amber-500" : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
              )}
            >
              <Flag className="w-4 h-4" /> Flag for Review
            </button>
            <div className="flex gap-4">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(p => p - 1)}
                className="px-6 py-2 rounded-xl bg-white/5 text-white font-bold disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                Previous
              </button>
              {currentIdx === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-2 rounded-xl bg-primary text-black font-bold hover:bg-primary-hover shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all"
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx(p => p + 1)}
                  className="px-8 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Grid Sidebar */}
        <div className="w-full md:w-72 shrink-0">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 sticky top-24">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={clsx(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold transition-all border",
                    currentIdx === idx ? "border-primary text-primary bg-primary/10 scale-110" :
                    flags[idx] ? "border-amber-500/50 text-amber-500 bg-amber-500/10" :
                    answers[idx] !== undefined ? "border-white/20 text-white bg-white/10" :
                    "border-white/5 text-zinc-500 hover:bg-white/5"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            
            <div className="mt-8 space-y-2 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-white/10 border border-white/20" /> Answered
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500/10 border border-amber-500/50" /> Flagged
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
