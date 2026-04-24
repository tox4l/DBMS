import Link from "next/link";
import { Timer, ArrowRight } from "lucide-react";

export default function ExamsPage() {
  const exams = [
    { id: 1, title: "Module 1: Foundations", questions: 15, minutes: 15 },
    { id: 2, title: "Module 2: Database Design", questions: 20, minutes: 20 },
    { id: 3, title: "Module 3: SQL DDL/DML", questions: 25, minutes: 30 },
    { id: 4, title: "Module 4: Advanced Queries", questions: 30, minutes: 40 },
    { id: 5, title: "Module 5: MongoDB", questions: 20, minutes: 25 },
    { id: "final", title: "Comprehensive Final Exam", questions: 60, minutes: 60, isFinal: true },
  ];

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black font-outfit mb-4">Section Exams</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Test your knowledge under pressure. Simulated exams pulled from the official UDST question bank.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <Link 
            key={exam.id} 
            href={`/exams/${exam.id}`}
            className={`glass-panel p-6 rounded-2xl group transition-all duration-300 flex flex-col ${exam.isFinal ? 'border-primary shadow-[0_0_20px_rgba(14,165,233,0.1)] hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]' : 'hover:border-white/20'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className={`text-2xl font-bold font-outfit ${exam.isFinal ? 'text-primary' : ''}`}>
                {exam.title}
              </h2>
              {exam.isFinal && <div className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Crucial</div>}
            </div>
            
            <div className="flex gap-4 mt-auto mb-6 text-sm text-zinc-400">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                {exam.minutes} Minutes
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{exam.questions}</span> Questions
              </div>
            </div>
            
            <div className="flex items-center text-white font-medium text-sm group-hover:text-primary transition-colors">
              Start Exam Simulation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
