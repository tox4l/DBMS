import Link from "next/link";
import { BookOpen, CheckCircle2, Lock } from "lucide-react";
import modulesData from "@/data/modules.json";

export default function ModulesPage() {
  // We'd read completed modules from client-side store, but since this is SSR, 
  // we render them all accessible and highlight completed status on client side.
  // We'll create a Client component for the list.
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black font-outfit mb-4">Course Modules</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          The complete DBMS curriculum compressed into lossless, high-impact modules. Read through the theory before jumping into the practice labs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulesData.map((mod: any, index: number) => {
          return (
            <Link 
              key={mod.id} 
              href={`/modules/${mod.id}`}
              className="glass-panel p-6 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen className="w-24 h-24 text-primary" />
              </div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="text-5xl font-black text-white/10 group-hover:text-primary/20 transition-colors">
                  0{index + 1}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold font-outfit mb-3 relative z-10 group-hover:text-primary transition-colors">
                {mod.title}
              </h2>
              
              <p className="text-zinc-400 text-sm mb-8 flex-1 relative z-10 line-clamp-3">
                {mod.content.substring(0, 120)}...
              </p>
              
              <div className="mt-auto relative z-10">
                <div className="flex items-center text-primary font-medium text-sm">
                  Start Module
                  <div className="ml-2 w-6 h-[1px] bg-primary group-hover:w-10 transition-all duration-300" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
