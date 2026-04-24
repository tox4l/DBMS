"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, Zap, RefreshCw } from "lucide-react";
import questionsData from "@/data/questions.json";
import generatedQuestionsData from "@/data/generated-questions.json";
import { useAppStore } from "@/lib/store";
import { clsx } from "clsx";

export default function PracticePage() {
  const allQuestions = useMemo(() => {
    return [...questionsData, ...generatedQuestionsData];
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStreak, setSessionStreak] = useState(0);
  
  const { recordQuestionAnswer, xp } = useAppStore();

  const question = allQuestions[currentIdx];
  const isAnswered = showExplanation;

  // Derive if correct based on whether the selected option letter matches the answer text
  const getCorrectLetter = (answerText: string) => {
    // The answer is usually like "A", "B", etc. We just take the first letter if it's MCQ
    const match = answerText.match(/^[A-D]/);
    return match ? match[0] : null;
  };

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    
    // Check correctness
    const correctLetter = getCorrectLetter(question.answer);
    const selectedLetter = opt.charAt(0);
    const isCorrect = selectedLetter === correctLetter;
    
    recordQuestionAnswer(question.id, isCorrect, `Module ${(question as any).moduleId || 'Unknown'}`);
    
    if (isCorrect) {
      setSessionStreak(s => s + 1);
    } else {
      setSessionStreak(0);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentIdx((prev) => (prev + 1) % allQuestions.length);
  };

  if (!question) return <div>No questions available.</div>;

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-80px)]">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit mb-2">Practice Mode</h1>
          <p className="text-zinc-400">Question {currentIdx + 1} of {allQuestions.length}</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
            <Zap className={clsx("w-5 h-5", sessionStreak > 2 ? "text-accent animate-pulse" : "text-zinc-500")} />
            <span className="font-bold">{sessionStreak} Streak</span>
          </div>
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="text-primary font-bold">{xp} XP</span>
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
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-zinc-400">
                {question.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
              </span>
              {(question as any).isGenerated && (
                <span className="px-3 py-1 rounded-full bg-primary/20 text-xs font-medium text-primary">
                  AI Generated
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
                      stateClass = "border-red-500/50 bg-red-500/10 text-red-400";
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
                    onClick={() => setShowExplanation(true)}
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
              className="mt-8 glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-center"
            >
              <div className="flex-1">
                {question.type === 'mcq' && (
                  <>
                    <h3 className="text-lg font-bold mb-2">Explanation</h3>
                    <p className="text-zinc-400 whitespace-pre-wrap">{question.answer}</p>
                  </>
                )}
              </div>
              <button
                onClick={handleNext}
                className="w-full md:w-auto px-8 py-4 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shrink-0"
              >
                Next Question
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
