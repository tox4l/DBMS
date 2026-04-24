"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, Zap, RefreshCw, ArrowLeft, Trophy } from "lucide-react";
import questionsData from "@/data/questions.json";
import { useAppStore } from "@/lib/store";
import { clsx } from "clsx";
import Link from "next/link";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function MistakeDrillPage() {
  const router = useRouter();
  const { mistakeBank, resolveMistake, recordQuestionAnswer } = useAppStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const drillQuestions = useMemo(() => {
    // Get all unresolved mistakes
    const unresolved = Object.values(mistakeBank).filter(m => !m.resolved);
    
    // Map them back to the original question data to get options
    const mapped = unresolved.map(m => {
      const original = questionsData.find(q => q.text === m.questionText);
      return {
        ...original,
        ...m, // contains mistake specific data like mistake ID
        originalId: original?.id
      };
    }).filter(q => q.originalId); // Only keep if we found the original question

    return shuffle(mapped);
  }, [mistakeBank]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!mounted) return null;

  if (drillQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020202] p-12 flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold mb-4">No Mistakes to Drill!</h2>
        <p className="text-zinc-500 mb-8">You have resolved all your mistakes or haven't made any yet.</p>
        <Link href="/mistakes" className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
          Return to Bank
        </Link>
      </div>
    );
  }

  const question: any = drillQuestions[currentIdx];
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
    
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      // Auto-resolve mistake if they get it right during a drill
      resolveMistake(question.id);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < drillQuestions.length - 1) {
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#020202] p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-3xl text-center max-w-lg relative z-10 border border-white/10"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          
          <h2 className="text-4xl font-black font-outfit text-white mb-2">Drill Complete</h2>
          <p className="text-zinc-400 mb-8">You successfully resolved {correctCount} out of {drillQuestions.length} mistakes during this session.</p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/mistakes"
              className="px-6 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary-hover transition-colors"
            >
              Back to Mistake Bank
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
          <Link href="/mistakes" className="text-primary hover:underline text-sm font-bold flex items-center gap-1 mb-4">
            <ArrowLeft className="w-4 h-4" /> Mistake Bank
          </Link>
          <h1 className="text-3xl md:text-4xl font-black font-outfit mb-2 text-red-500">Recovery Drill</h1>
          <p className="text-zinc-400">Mistake {currentIdx + 1} of {drillQuestions.length}</p>
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
            className="glass-panel p-6 md:p-10 rounded-3xl w-full border border-red-500/20"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-zinc-400">
                {question.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
              </span>
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-xs font-bold text-red-500 border border-red-500/20">
                Failed {question.frequency} time{question.frequency > 1 ? 's' : ''} previously
              </span>
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
                      resolveMistake(question.id);
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
                
                {selectedOption && getCorrectLetter(question.answer) === selectedOption.charAt(0) && (
                  <div className="mt-4 text-green-400 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Mistake Resolved!
                  </div>
                )}
              </div>
              <button
                onClick={handleNext}
                className="w-full md:w-auto px-8 py-4 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shrink-0"
              >
                {currentIdx < drillQuestions.length - 1 ? 'Next Question' : 'Finish Drill'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
