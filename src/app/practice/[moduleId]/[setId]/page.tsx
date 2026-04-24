"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, Zap, RefreshCw, ArrowLeft, Trophy } from "lucide-react";
import questionsData from "@/data/questions.json";
import { useAppStore } from "@/lib/store";
import { clsx } from "clsx";
import Link from "next/link";

const SET_TITLES = ["Fundamentals", "Core Concepts", "Advanced", "Trap Questions", "Mixed Exam Style"];
const SET_DIFFS = ["easy", "medium", "hard", "trap", "mixed"];

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function PracticeSessionPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = parseInt(params.moduleId as string, 10);
  const setId = parseInt(params.setId as string, 10);
  
  const { recordQuestionAnswer, recordMistake, recordSetScore, xp } = useAppStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sessionQuestions = useMemo(() => {
    if (!moduleId || !setId) return [];
    const diff = SET_DIFFS[setId - 1];
    let filtered = questionsData.filter((q: any) => q.moduleId === moduleId);
    if (diff !== "mixed") {
      filtered = filtered.filter((q: any) => q.difficulty === diff);
    }
    return shuffle(filtered);
  }, [moduleId, setId]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!mounted) return null;

  if (sessionQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020202] p-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">No Questions Found</h2>
        <p className="text-zinc-500 mb-8">This set doesn't have any questions yet.</p>
        <Link href="/practice" className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
          Return to Hub
        </Link>
      </div>
    );
  }

  const question: any = sessionQuestions[currentIdx];
  const isAnswered = showExplanation;

  const getCorrectLetter = (answerText: string) => {
    const match = answerText.match(/^[A-D]/);
    return match ? match[0] : null;
  };

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    
    const correctLetter = getCorrectLetter(question.answer);
    const selectedLetter = opt.charAt(0);
    const isCorrect = selectedLetter === correctLetter;
    
    // Core logic tracking
    recordQuestionAnswer(question.id, isCorrect, `Module ${moduleId}`);
    
    if (isCorrect) {
      setSessionStreak(s => s + 1);
      setCorrectCount(c => c + 1);
    } else {
      setSessionStreak(0);
      
      // Determine the full correct text
      const correctFullOption = question.options?.find((o: string) => o.startsWith(correctLetter || '')) || question.answer;

      // Log Mistake
      recordMistake({
        questionText: question.text,
        wrongAnswer: opt,
        correctAnswer: correctFullOption,
        explanation: question.explanation || question.answer,
        moduleId,
        setId
      });
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < sessionQuestions.length - 1) {
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Finish Set
      const score = Math.round((correctCount / sessionQuestions.length) * 100);
      recordSetScore(moduleId, setId, score);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const score = Math.round((correctCount / sessionQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-[#020202] p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[800px] h-[800px] bg-primary/30 rounded-full blur-[150px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-3xl text-center max-w-lg relative z-10 border border-white/10"
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(14,165,233,0.3)]">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          
          <h2 className="text-4xl font-black font-outfit text-white mb-2">Set Complete!</h2>
          <p className="text-zinc-400 mb-8">Module {moduleId} — {SET_TITLES[setId - 1]}</p>
          
          <div className="text-7xl font-mono font-black text-white mb-8 tracking-tighter">
            {score}<span className="text-3xl text-zinc-500">%</span>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                setCurrentIdx(0);
                setCorrectCount(0);
                setSessionStreak(0);
                setIsFinished(false);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
            <Link 
              href="/practice"
              className="px-6 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary-hover transition-colors"
            >
              Back to Hub
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-80px)]">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <Link href="/practice" className="text-primary hover:underline text-sm font-bold flex items-center gap-1 mb-4">
            <ArrowLeft className="w-4 h-4" /> Practice Hub
          </Link>
          <h1 className="text-3xl md:text-4xl font-black font-outfit mb-2">{SET_TITLES[setId - 1]}</h1>
          <p className="text-zinc-400">Question {currentIdx + 1} of {sessionQuestions.length}</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
            <Zap className={clsx("w-5 h-5", sessionStreak > 2 ? "text-amber-400 animate-pulse" : "text-zinc-500")} />
            <span className="font-bold">{sessionStreak} Streak</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-6 md:p-10 rounded-3xl w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-zinc-400">
                {question.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
              </span>
              {question.difficulty === 'trap' && (
                <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-xs font-bold text-red-400 animate-pulse">
                  TRAP QUESTION
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
              {question.text}
            </h2>

            {question.type === 'mcq' ? (
              <div className="space-y-4">
                {question.options?.map((opt: string, i: number) => {
                  const correctLetter = getCorrectLetter(question.answer);
                  const optLetter = opt.charAt(0);
                  
                  let stateClass = "border-white/10 hover:border-primary/50 hover:bg-white/5";
                  
                  if (isAnswered) {
                    if (optLetter === correctLetter) {
                      stateClass = "border-green-500/50 bg-green-500/10 text-green-400";
                    } else if (selectedOption === opt && optLetter !== correctLetter) {
                      stateClass = "border-red-500/50 bg-red-500/10 text-red-400 line-through opacity-70";
                    } else {
                      stateClass = "border-white/5 opacity-50";
                    }
                  } else if (selectedOption === opt) {
                    stateClass = "border-primary bg-primary/10";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      disabled={isAnswered}
                      className={clsx(
                        "w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between",
                        stateClass
                      )}
                    >
                      <span className="text-lg">{opt}</span>
                      {isAnswered && optLetter === correctLetter && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                      {isAnswered && selectedOption === opt && optLetter !== correctLetter && <XCircle className="w-6 h-6 text-red-500" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-zinc-300 italic mb-6">Self-evaluation question. Think of your answer, then reveal.</p>
                {!isAnswered ? (
                  <button 
                    onClick={() => {
                      recordQuestionAnswer(question.id, true, `Module ${moduleId}`);
                      setShowExplanation(true);
                    }}
                    className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary-hover transition-colors"
                  >
                    Reveal Answer
                  </button>
                ) : (
                  <div className="text-green-400 whitespace-pre-wrap font-mono text-sm">
                    {question.answer}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-center border border-white/10"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" /> Explanation
                </h3>
                <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{question.explanation}</p>
              </div>
              <button
                onClick={handleNext}
                className="w-full md:w-auto px-8 py-4 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shrink-0"
              >
                {currentIdx < sessionQuestions.length - 1 ? 'Next Question' : 'Finish Set'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
