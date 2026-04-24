import ThreeHero from "@/components/layout/ThreeHero";
import { ArrowRight, PlayCircle, BookOpen, PenTool, Database, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ThreeHero />
      
      <div className="relative z-10 p-6 md:p-12 lg:p-20 flex-1 flex flex-col">
        {/* Header section */}
        <header className="max-w-4xl pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            UDST DBMS Command Center
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-outfit tracking-tight mb-6 leading-tight">
            Master Databases at the <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 text-glow">
              Speed of Intelligence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 font-inter leading-relaxed">
            The definitive exam demolisher. Interactive MySQL and MongoDB labs, AI-driven practice, and lossless curriculum compression. Everything you need to pass with distinction.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/modules"
              className="px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary-hover transition-colors flex items-center gap-2 border-glow shadow-[0_0_30px_rgba(14,165,233,0.3)]"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="/lab"
              className="px-8 py-4 rounded-full bg-surface border border-white/10 font-bold text-lg hover:bg-zinc-900 transition-colors flex items-center gap-2"
            >
              <Database className="w-5 h-5 text-primary" />
              Query Lab
            </Link>
          </div>
        </header>

        {/* Dashboard Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-6 rounded-2xl group hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded-md text-zinc-400">MODULES</span>
            </div>
            <div className="text-3xl font-bold font-outfit mb-1">0 / 5</div>
            <div className="text-sm text-zinc-500">Modules Completed</div>
            <div className="w-full bg-zinc-900 h-1.5 mt-4 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-0 transition-all duration-1000"></div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl group hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded-md text-zinc-400">XP SCORE</span>
            </div>
            <div className="text-3xl font-bold font-outfit mb-1">0</div>
            <div className="text-sm text-zinc-500">Total Experience Points</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl group hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                <PenTool className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded-md text-zinc-400">PRACTICE</span>
            </div>
            <div className="text-3xl font-bold font-outfit mb-1">0 / 150</div>
            <div className="text-sm text-zinc-500">Questions Answered</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-surface to-zinc-900 border-primary/20 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 rounded-xl bg-primary/20 text-primary">
                <PlayCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-primary/20 rounded-md text-primary">READINESS</span>
            </div>
            <div className="text-4xl font-black font-outfit mb-1 text-white relative z-10">0%</div>
            <div className="text-sm text-zinc-400 relative z-10">Exam Readiness Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}
