"use client";

import { motion } from "framer-motion";
import { Link2, ArrowRight, Zap, AlertTriangle, ShieldCheck } from "lucide-react";
import { TextHighlighter } from "@/components/ui/TextHighlighter";
import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";

const SectionHeader = ({ title, icon: Icon }: { title: string, icon?: any }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
    {Icon && <Icon className="w-6 h-6 text-primary" />}
    <h2 className="text-3xl font-black font-outfit text-white">{title}</h2>
  </div>
);

const TrapCard = ({ trap, reason, correct, trick }: any) => (
  <div className="relative p-6 rounded-2xl bg-black border-l-4 border-l-amber-500 border-y border-r border-white/10 my-6 group hover:border-amber-500/50 transition-all">
    <div className="absolute -top-3 -right-3">
      <div className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30 flex items-center gap-2">
        <AlertTriangle className="w-3 h-3" /> EXAM TRAP
      </div>
    </div>
    <h3 className="text-xl font-bold text-amber-500 mb-3">{trap}</h3>
    <div className="space-y-3 text-sm">
      <div className="flex gap-2">
        <span className="text-zinc-500 font-bold shrink-0">Why students fall for it:</span>
        <span className="text-zinc-300"><TextHighlighter text={reason} /></span>
      </div>
      <div className="flex gap-2">
        <span className="text-green-500 font-bold shrink-0">The correct answer:</span>
        <span className="text-zinc-300"><TextHighlighter text={correct} /></span>
      </div>
      <div className="flex gap-2 bg-primary/10 p-3 rounded-lg border border-primary/20 mt-4">
        <span className="text-primary font-bold shrink-0">Memory trick:</span>
        <span className="text-white"><TextHighlighter text={trick} /></span>
      </div>
    </div>
  </div>
);

export default function RelationshipsPage() {
  const [examStarted, setExamStarted] = useState(false);
  const [examScore, setExamScore] = useState<number | null>(null);

  const startExam = () => setExamStarted(true);
  const finishExam = () => setExamScore(80); // Mock score for now

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      {/* Hero */}
      <div className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold tracking-widest text-sm uppercase">
            <Link2 className="w-4 h-4" /> Comprehensive Guide
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black font-outfit tracking-tight leading-tight">
            Table <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 text-glow">Relationships</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-zinc-400 font-inter max-w-2xl mx-auto">
            The topic that trips everyone up. Not anymore. Master 1:N, M:N, Junction Tables, and ERD notation once and for all.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
        
        {/* Color Legend */}
        <div className="glass-panel p-6 rounded-2xl flex flex-wrap gap-4 items-center justify-center text-sm font-bold">
          <span className="text-zinc-500 uppercase tracking-widest mr-4">Color System:</span>
          <span className="text-[#0ea5e9]">Primary Keys</span>
          <span className="text-[#f59e0b]">Foreign Keys</span>
          <span className="text-[#22c55e]">Correct</span>
          <span className="text-[#ef4444]">Traps</span>
          <span className="text-[#a855f7]">Junction Tables</span>
          <span className="text-[#f97316]">Constraints</span>
        </div>

        {/* Section 1 */}
        <section>
          <SectionHeader title="1. What is a Relationship?" icon={Link2} />
          <div className="prose prose-invert prose-lg max-w-none">
            <p>
              <TextHighlighter text="Relational databases are built on the concept of linking tables together. Without relationships, you just have a glorified spreadsheet. Relationships are established using a PRIMARY KEY in one table, linked to a FOREIGN KEY in another." />
            </p>
            {/* Visual placeholder */}
            <div className="my-10 h-48 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <div className="flex items-center gap-12 relative z-10">
                <div className="w-32 h-32 bg-black border-2 border-[#0ea5e9] rounded-xl flex items-center justify-center font-bold text-[#0ea5e9] shadow-[0_0_30px_rgba(14,165,233,0.3)]">PARENT</div>
                <motion.div animate={{ x: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 2 }} className="h-1 bg-white/20 w-32 relative">
                   <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 border-t-2 border-r-2 border-white/50 rotate-45" />
                </motion.div>
                <div className="w-32 h-32 bg-black border-2 border-[#f59e0b] rounded-xl flex items-center justify-center font-bold text-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.3)]">CHILD</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <SectionHeader title="2. One to One (1:1)" />
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p>
              <TextHighlighter text="A 1:1 relationship means one record in Table A relates to exactly one record in Table B. This is rare. Usually, if two things are 1:1, they belong in the same table. We only separate them for security (e.g., storing passwords in a separate table) or performance (storing large BLOBs separately)." />
            </p>
            <div className="bg-red-500/10 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> EXAM TRAP</h4>
              <p className="text-red-200 m-0"><TextHighlighter text="Students often confuse 1:1 with 'just put everything in one table'. While true in practice, if the exam asks for a 1:1 schema, you MUST show two tables, where the FOREIGN KEY in one table is also constrained as UNIQUE."/></p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <SectionHeader title="3. One to Many (1:N) — The 'Parent-Child' Bond" />
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p>
              <TextHighlighter text="This is the most common relationship. One Department has Many Employees. One Customer places Many Orders. The golden rule you must never forget: The FOREIGN KEY ALWAYS goes on the MANY side." />
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/50">
                <h4 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Department (The 'One')</h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-[#0ea5e9]">dept_id (PRIMARY KEY)</div>
                  <div className="text-white">dept_name</div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/50">
                <h4 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Employee (The 'Many')</h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-[#0ea5e9]">emp_id (PRIMARY KEY)</div>
                  <div className="text-white">name</div>
                  <div className="text-[#f59e0b]">dept_id (FOREIGN KEY)</div>
                </div>
              </div>
            </div>
            
            <TrapCard 
              trap="Putting the FK on the wrong side"
              reason="Students think 'Department has employees, so Department gets the emp_id'. But a single column can't hold multiple IDs cleanly."
              correct="The FOREIGN KEY belongs on the 'N' side (Employee). Employee gets the dept_id."
              trick="Gold goes to the Many. FK = Many side."
            />
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <SectionHeader title="4. Many to Many (M:N) — The Rule Breaker" />
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p>
              <TextHighlighter text="Students take Courses. Courses have many Students. You CANNOT implement a M:N relationship directly in a relational database. It is physically impossible. You must decompose it using a JUNCTION TABLE." />
            </p>
            
            <div className="flex flex-col items-center my-10 p-8 border border-purple-500/30 bg-purple-500/5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
              <h3 className="text-purple-400 font-bold mb-6 font-outfit text-2xl">The Junction Table Solution</h3>
              
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full justify-center">
                <div className="p-4 rounded-lg border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 text-center w-full md:w-1/3">
                  <div className="font-bold text-white mb-2">STUDENT</div>
                  <div className="text-xs font-mono text-[#0ea5e9]">student_id (PK)</div>
                </div>
                
                <div className="text-zinc-500 flex flex-col items-center">
                   <span>1</span>
                   <ArrowRight className="w-5 h-5" />
                   <span>M</span>
                </div>
                
                <div className="p-4 rounded-lg border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-purple-500/20 text-center w-full md:w-1/3 z-10 scale-110">
                  <div className="font-bold text-purple-300 mb-2">ENROLLMENT (Junction)</div>
                  <div className="text-xs font-mono text-[#0ea5e9]">enrollment_id (PK)</div>
                  <div className="text-xs font-mono text-[#f59e0b] mt-1">student_id (FK)</div>
                  <div className="text-xs font-mono text-[#f59e0b] mt-1">course_id (FK)</div>
                </div>

                <div className="text-zinc-500 flex flex-col items-center">
                   <span>M</span>
                   <ArrowRight className="w-5 h-5 rotate-180 md:rotate-0" />
                   <span>1</span>
                </div>
                
                <div className="p-4 rounded-lg border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 text-center w-full md:w-1/3">
                  <div className="font-bold text-white mb-2">COURSE</div>
                  <div className="text-xs font-mono text-[#0ea5e9]">course_id (PK)</div>
                </div>
              </div>
            </div>

            <TrapCard 
              trap="Forgetting the Junction Table has its own PK"
              reason="Students make a junction table with just two FKs. While this works as a COMPOSITE KEY, it's safer and cleaner to give it a surrogate PRIMARY KEY (like enrollment_id)."
              correct="Give the JUNCTION TABLE an auto-incrementing PRIMARY KEY, plus the two FOREIGN KEYs."
              trick="Every table needs an identity. Even bridge tables."
            />
          </div>
        </section>

        {/* Trap Zone */}
        <section>
          <div className="p-1 rounded-3xl bg-gradient-to-b from-red-500/30 to-transparent">
            <div className="bg-black p-8 md:p-12 rounded-[22px]">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-4xl font-black font-outfit text-red-500 text-glow">The Trap Zone</h2>
              </div>
              <p className="text-zinc-400 mb-8"><TextHighlighter text="Pulled directly from `exam finale.md`. If you fall for these, you lose marks instantly."/></p>
              
              <div className="space-y-6">
                <TrapCard 
                  trap="Total Participation vs NOT NULL"
                  reason="Students see a double line (Total Participation) in an ERD and don't know how to code it in SQL."
                  correct="Total Participation means every entity MUST be involved. In SQL, this translates to a NOT NULL constraint on the FOREIGN KEY."
                  trick="Double line = NOT NULL."
                />
                <TrapCard 
                  trap="Derived Attributes in Tables"
                  reason="Students see 'Age' as a dashed oval (derived attribute) in the ERD and create a column for it."
                  correct="Derived attributes are NEVER stored in the database. You calculate them on the fly (e.g., using date_of_birth)."
                  trick="Dashed line = Do not store."
                />
                <TrapCard 
                  trap="Weak Entities and Keys"
                  reason="Students try to give a WEAK ENTITY its own independent primary key."
                  correct="A WEAK ENTITY borrows the PRIMARY KEY of its parent. Its true PK is a COMPOSITE KEY of the parent's PK + its own partial key."
                  trick="Weak = Needs Parent's ID."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mini Exam */}
        <section className="text-center pt-10 border-t border-white/10">
          <h3 className="text-3xl font-bold font-outfit mb-4">Ready to test your knowledge?</h3>
          <p className="text-zinc-400 mb-8">Take the 10-question rapid fire relationship exam. Passing score unlocks the next phase.</p>
          
          {!examStarted ? (
            <button onClick={startExam} className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary-hover transition-colors shadow-[0_0_30px_rgba(14,165,233,0.3)]">
              Start Mini-Exam
            </button>
          ) : !examScore ? (
            <div className="p-12 border border-white/10 rounded-2xl bg-zinc-900/50">
              <div className="animate-pulse flex flex-col items-center">
                <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                <p className="text-zinc-400">Exam simulator booting...</p>
                <button onClick={finishExam} className="mt-8 px-6 py-2 bg-white/10 rounded hover:bg-white/20 transition-colors text-sm">
                  [Dev: Force Finish Exam]
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 border border-green-500/30 rounded-2xl bg-green-500/5 flex flex-col items-center">
              <ShieldCheck className="w-16 h-16 text-green-500 mb-4" />
              <h4 className="text-3xl font-black text-white mb-2">CLEAN.</h4>
              <p className="text-green-400 mb-6">You scored {examScore}% on Relationships.</p>
              <Link href="/modules" className="px-6 py-3 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors">
                Return to Modules
              </Link>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
