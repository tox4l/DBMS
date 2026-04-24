"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import questionsData from "@/data/questions.json";
import generatedQuestionsData from "@/data/generated-questions.json";
import { useAppStore } from "@/lib/store";
import { clsx } from "clsx";

export default function ExamSessionPage() {
  const params = useParams();
  const router = useRouter();
  const { addXP } = useAppStore();
  
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  // Fake config based on ID
  const config = useMemo(() => {
    let title = "Exam";
    let filterFn = (q: any) => true;
    let mins = 30;
    
    if (params.id === "final") {
      title = "Final Exam";
      mins = 60;
    } else {
      const modId = parseInt(params.id as string);
      title = `Module ${modId} Exam`;
      filterFn = (q: any) => q.moduleId === modId || (!q.moduleId && q.id % 5 === modId % 5);
      mins = 20;
    }
    
    const allQ = [...questionsData, ...generatedQuestionsData];
    // Take a random subset of MCQ for the exam
    const examQuestions = allQ
      .filter(q => q.type === 'mcq')
      .filter(filterFn)
      .sort(() => 0.5 - Math.random())
      .slice(0, params.id === "final" ? 60 : 15);
      
    return { title, questions: examQuestions, minutes: mins };
  }, [params.id]);

  useEffect(() => {
    if (started && !submitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && started && !submitted) {
      handleSubmit();
    }
  }, [started, submitted, timeLeft]);

  const handleStart = () => {
    setTimeLeft(config.minutes * 60);
    setStarted(true);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Calculate score
    const correctCount = config.questions.filter((q, i) => {
      const selected = answers[i];
      if (!selected) return false;
      return selected.charAt(0) === (q.answer.match(/^[A-D]/)?.[0] || '');
    }).length;
    
    const score = Math.round((correctCount / config.questions.length) * 100);
    if (score >= 60) {
      addXP(score * 10); // Massive XP for exams
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (config.questions.length === 0) {
    return <div className="p-12 text-center text-zinc-400">Loading exam data...</div>;
  }

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass-panel p-10 rounded-3xl max-w-xl w-full text-center">
          <AlertTriangle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="text-4xl font-black font-outfit mb-4">{config.title}</h1>
          <p className="text-zinc-400 mb-8">
            You will have {config.minutes} minutes to answer {config.questions.length} questions. 
            Once started, the timer cannot be paused.
          </p>
          <button 
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-primary text-black font-bold text-lg hover:bg-primary-hover transition-colors"
          >
            Begin Exam
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    const correctCount = config.questions.filter((q, i) => {
      const selected = answers[i];
      if (!selected) return false;
      return selected.charAt(0) === (q.answer.match(/^[A-D]/)?.[0] || '');
    }).length;
    const score = Math.round((correctCount / config.questions.length) * 100);
    const passed = score >= 60;

    return (
      <div className="min-h-[calc(100vh-80px)] p-6 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-12 rounded-3xl max-w-2xl w-full text-center"
        >
          <div className={clsx("text-8xl font-black font-outfit mb-4", passed ? "text-green-500" : "text-red-500")}>
            {score}%
          </div>
          <h2 className="text-3xl font-bold mb-2">{passed ? "Exam Passed!" : "Exam Failed"}</h2>
          <p className="text-zinc-400 mb-8">
            You answered {correctCount} out of {config.questions.length} questions correctly.
          </p>
          
          <button 
            onClick={() => router.push('/exams')}
            className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
          >
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  const q = config.questions[currentIdx];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Exam Header */}
      <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-lg">{config.title}</div>
        <div className={clsx("flex items-center gap-2 font-mono text-xl font-bold px-4 py-1 rounded-lg", timeLeft < 300 ? "bg-red-500/20 text-red-500 animate-pulse" : "bg-white/5 text-white")}>
          <Clock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 bg-accent text-black font-bold rounded-lg hover:bg-amber-400"
        >
          Submit Exam
        </button>
      </header>

      {/* Main Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 flex flex-col">
        <div className="mb-8 flex flex-wrap gap-2">
          {config.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={clsx(
                "w-8 h-8 rounded text-sm font-medium transition-colors",
                currentIdx === i ? "border-2 border-primary" : "border border-white/10",
                answers[i] ? "bg-primary/20 text-primary" : "bg-white/5 text-zinc-400"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
            <span className="text-primary mr-3">{currentIdx + 1}.</span>
            {q.text}
          </h2>

          <div className="space-y-4">
            {q.options?.map((opt: string, i: number) => {
              const isSelected = answers[currentIdx] === opt;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setAnswers(prev => ({ ...prev, [currentIdx]: opt }));
                  }}
                  className={clsx(
                    "w-full text-left p-4 rounded-xl border transition-all duration-200",
                    isSelected ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30 hover:bg-white/5"
                  )}
                >
                  <span className="text-lg">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <button 
            onClick={() => setCurrentIdx(p => Math.max(0, p - 1))}
            disabled={currentIdx === 0}
            className="px-6 py-3 rounded-xl bg-white/5 text-white disabled:opacity-30 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>
          <button 
            onClick={() => setCurrentIdx(p => Math.min(config.questions.length - 1, p + 1))}
            disabled={currentIdx === config.questions.length - 1}
            className="px-6 py-3 rounded-xl bg-white/5 text-white disabled:opacity-30 flex items-center gap-2"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
