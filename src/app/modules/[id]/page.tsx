"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import modulesData from "@/data/modules.json";
import { useAppStore } from "@/lib/store";

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const mod = modulesData.find((m: any) => m.id === id);
  
  const { markModuleCompleted, completedModules } = useAppStore();
  const isCompleted = completedModules.includes(id);

  if (!mod) {
    return <div className="p-12 text-center text-zinc-400">Module not found</div>;
  }

  // A very simple markdown parser for the module content
  const renderContent = (content: string) => {
    return content.split('\n\n').map((para, i) => {
      if (para.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-4">{para.replace('### ', '')}</h3>;
      }
      if (para.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-bold text-primary mt-10 mb-4">{para.replace('## ', '')}</h2>;
      }
      if (para.startsWith('- ')) {
        return (
          <ul key={i} className="list-disc list-inside space-y-2 my-4 text-zinc-300">
            {para.split('\n').map((item, j) => (
              <li key={j}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      if (para.includes('|') && para.includes('---')) {
        // Simple table rendering placeholder, actual tables are in tables hub
        return <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl my-4 text-sm text-zinc-400 font-mono overflow-x-auto whitespace-pre">{para}</div>;
      }
      if (para.startsWith('```')) {
        return <div key={i} className="p-4 bg-black border border-white/10 rounded-xl my-4 font-mono text-primary text-sm whitespace-pre-wrap">{para.replace(/```[a-z]*\n?/g, '')}</div>;
      }
      
      // Highlight bold text
      let formattedPara = para;
      // very hacky bold replacement for react rendering without dangerouslySetInnerHTML
      const parts = formattedPara.split(/\*\*(.*?)\*\*/g);
      
      return (
        <p key={i} className="text-zinc-300 leading-relaxed mb-4">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="sticky top-0 z-40 glass-panel border-x-0 border-t-0 px-6 py-4 flex items-center justify-between">
        <Link href="/modules" className="flex items-center text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Modules
        </Link>
        <div className="text-sm font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
          Module {mod.id}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-12 mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black font-outfit mb-6 text-glow text-white">
            {mod.title}
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none font-inter"
        >
          {renderContent(mod.content)}
        </motion.div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center">
          {isCompleted ? (
            <div className="flex flex-col items-center text-green-500">
              <CheckCircle className="w-16 h-16 mb-4" />
              <h3 className="text-2xl font-bold font-outfit">Module Completed!</h3>
              <p className="text-zinc-400 mt-2">You have earned 500 XP for this module.</p>
            </div>
          ) : (
            <button
              onClick={() => {
                markModuleCompleted(mod.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary-hover transition-all flex items-center gap-2 border-glow shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95"
            >
              Mark as Complete
              <CheckCircle className="w-5 h-5" />
            </button>
          )}
          
          <div className="mt-8 flex gap-4">
             <Link href="/practice" className="px-6 py-3 rounded-full bg-surface border border-white/10 font-bold hover:bg-zinc-900 transition-colors">
               Practice Questions
             </Link>
             <Link href="/lab" className="px-6 py-3 rounded-full bg-surface border border-white/10 font-bold hover:bg-zinc-900 transition-colors">
               Query Lab
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
