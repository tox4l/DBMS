"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Skull } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { javascript } from "@codemirror/lang-javascript";

export type Question = {
  id: string | number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  isTrap?: boolean;
  trapExplanation?: string;
  codeSnippet?: string;
  codeType?: "sql" | "mongodb";
};

type QuestionCardProps = {
  question: Question;
  mode?: "practice" | "exam";
  onAnswer?: (isCorrect: boolean, selectedIndex: number) => void;
  showResults?: boolean; // Forced to show results (used at end of exam)
  userAnswerIndex?: number; // Pre-filled answer if reviewing
};

export default function QuestionCard({ 
  question, 
  mode = "practice", 
  onAnswer,
  showResults = false,
  userAnswerIndex
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(userAnswerIndex ?? null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(userAnswerIndex !== undefined);

  const isReviewing = mode === "practice" ? hasAnswered : showResults;

  const handleSelect = (index: number) => {
    if (isReviewing && mode === "practice") return; // locked in practice mode once answered
    if (showResults) return; // locked if reviewing exam

    setSelectedIndex(index);
    if (mode === "practice") {
      setHasAnswered(true);
      if (onAnswer) onAnswer(index === question.correctAnswer, index);
    } else {
      if (onAnswer) onAnswer(index === question.correctAnswer, index); // just record selection
    }
  };

  return (
    <div className={clsx(
      "glass-panel rounded-2xl overflow-hidden border transition-all",
      question.isTrap && isReviewing ? "border-amber-500/30" : "border-white/5"
    )}>
      {/* Question Header */}
      <div className="p-6 border-b border-white/5">
        {question.isTrap && isReviewing && (
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-wider uppercase mb-3">
            <Skull className="w-4 h-4" />
            Exam Trap Identified
          </div>
        )}
        <h3 className="text-lg md:text-xl font-medium text-white leading-relaxed">
          {question.text}
        </h3>
        
        {question.codeSnippet && (
          <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
            <CodeMirror
              value={question.codeSnippet}
              height="100%"
              extensions={[question.codeType === "sql" ? sql() : javascript()]}
              readOnly={true}
              theme="dark"
              basicSetup={{ lineNumbers: false, foldGutter: false }}
            />
          </div>
        )}
      </div>

      {/* Options */}
      <div className="p-4 space-y-2 bg-black/20">
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === question.correctAnswer;
          
          let stateStyles = "border-white/5 bg-zinc-900/50 hover:bg-white/5 text-zinc-300";
          let icon = null;

          if (isReviewing) {
            if (isCorrect) {
              stateStyles = "border-green-500/50 bg-green-500/10 text-white";
              icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
            } else if (isSelected) {
              stateStyles = "border-red-500/50 bg-red-500/10 text-white";
              icon = <XCircle className="w-5 h-5 text-red-500" />;
            } else {
              stateStyles = "border-white/5 bg-black/40 text-zinc-600";
            }
          } else if (isSelected) {
            stateStyles = "border-primary/50 bg-primary/10 text-white shadow-[0_0_15px_rgba(0,255,255,0.1)]";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isReviewing}
              className={clsx(
                "w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between group",
                stateStyles,
                !isReviewing && !isSelected && "hover:border-white/20 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "w-6 h-6 rounded flex items-center justify-center text-xs font-bold font-mono transition-colors",
                  isSelected && !isReviewing ? "bg-primary text-black" : "bg-white/10 text-zinc-400 group-hover:bg-white/20"
                )}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-sm md:text-base">{option}</span>
              </div>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Explanations */}
      <AnimatePresence>
        {isReviewing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-white/5 bg-zinc-950/80"
          >
            <div className="p-6 space-y-4">
              {question.explanation && (
                <div className="text-sm text-zinc-400">
                  <strong className="text-white">Explanation: </strong>
                  {question.explanation}
                </div>
              )}
              
              {question.isTrap && question.trapExplanation && (
                <div className="p-4 rounded-xl border-l-4 border-l-amber-500 bg-amber-500/10 text-amber-200/80 text-sm">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    Trap Analysis
                  </div>
                  {question.trapExplanation}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
