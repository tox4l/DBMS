"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, ChevronRight, BookOpen, AlertTriangle, Lightbulb } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import modulesData from "@/data/modules.json";
import { useAppStore } from "@/lib/store";
import DataTable from "@/components/shared/DataTable";
import DiagramViewer from "@/components/shared/DiagramViewer";

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

  // Extract sections for navigation
  const sections = mod.content.split('\\n\\n').filter((p: string) => p.startsWith('## ')).map((p: string) => p.replace('## ', ''));
  const [activeSection, setActiveSection] = useState(sections[0] || "");

  const renderContent = (content: string) => {
    // Split by sections if applicable, but for now we just render all and use anchors
    let currentSection = sections[0] || "";
    
    return content.split('\n\n').map((para, i) => {
      if (para.startsWith('## ')) {
        currentSection = para.replace('## ', '');
        return (
          <h2 key={i} id={currentSection.replace(/\s+/g, '-').toLowerCase()} className="text-2xl font-bold text-primary mt-16 mb-6 scroll-mt-24 border-b border-white/10 pb-2">
            {currentSection}
          </h2>
        );
      }
      
      if (para.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-4">{para.replace('### ', '')}</h3>;
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
        const lines = para.split('\n').map(l => l.trim()).filter(l => l.startsWith('|') && l.endsWith('|'));
        if (lines.length > 2) {
          const headerLine = lines[0];
          const headers = headerLine.split('|').filter(Boolean).map(s => s.trim());
          const columns = headers.map((h, idx) => ({ key: `col_${idx}`, label: h }));
          
          const dataLines = lines.slice(2);
          const data = dataLines.map((line, rowIdx) => {
            const cells = line.split('|').filter(Boolean).map(s => s.trim());
            const rowObj: any = { id: `row_${rowIdx}` };
            
            let isTrap = false;
            let isExamCritical = false;
            
            cells.forEach((cell, colIdx) => {
              const lowerCell = cell.toLowerCase();
              if (lowerCell.includes('trap') || lowerCell.includes('mistake') || lowerCell.includes('bad')) isTrap = true;
              if (lowerCell.includes('exam') || lowerCell.includes('critical') || lowerCell.includes('crucial')) isExamCritical = true;
              rowObj[`col_${colIdx}`] = cell.replace(/\*\*(.*?)\*\*/g, '$1'); // Strip bold markdown in cells for now
            });
            
            rowObj.isTrap = isTrap;
            rowObj.isExamCritical = isExamCritical;
            return rowObj;
          });

          return <DataTable key={i} columns={columns} data={data} title={currentSection.includes("Comparison") ? currentSection : undefined} />;
        }
      }
      
      if (para.startsWith('```')) {
        return <div key={i} className="p-4 bg-black/80 border border-white/10 rounded-xl my-4 font-mono text-primary text-sm whitespace-pre-wrap">{para.replace(/```[a-z]*\n?/g, '')}</div>;
      }
      
      // Inject Trap / Pro Tip Callouts based on content
      if (currentSection.toLowerCase().includes("trap") && !para.startsWith("##")) {
        return (
          <div key={i} className="my-6 p-4 rounded-xl border-l-4 border-l-amber-500 bg-amber-500/10 text-amber-200 text-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
              <AlertTriangle className="w-5 h-5" /> EXAM TRAP
            </div>
            {para.replace('- **', '').replace('**:', ':')}
          </div>
        );
      }

      // Hacky bold replacement
      const parts = para.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-zinc-300 leading-relaxed mb-4 text-lg">
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

      <div className="max-w-[1400px] mx-auto p-6 md:p-12 mt-4 flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar Navigation */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 glass-panel p-4 rounded-xl border border-white/10">
            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Sections
            </h4>
            <div className="space-y-1 border-l border-white/10 ml-2">
              {sections.map((sec: string, idx: number) => (
                <a
                  key={idx}
                  href={`#${sec.replace(/\s+/g, '-').toLowerCase()}`}
                  className={clsx(
                    "block px-4 py-2 text-sm transition-colors border-l-2 -ml-[1px]",
                    activeSection === sec 
                      ? "border-primary text-white font-bold bg-white/5" 
                      : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                  )}
                  onClick={() => setActiveSection(sec)}
                >
                  {sec}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
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

          {/* Module Diagrams (Injected Manually for now based on ID) */}
          {mod.id === 2 && (
            <DiagramViewer 
              title="Example ER Diagram (Conceptual)"
              chart={`erDiagram
                PATIENT ||--o{ APPOINTMENT : "has"
                DOCTOR ||--o{ APPOINTMENT : "attends"
                PATIENT {
                  int patient_id PK
                  string name
                }
                DOCTOR {
                  int doctor_id PK
                  string specialty
                }
                APPOINTMENT {
                  int apid PK
                  datetime start_time
                }
              `}
            />
          )}

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
    </div>
  );
}
