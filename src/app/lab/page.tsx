import Link from "next/link";
import { Database, Server } from "lucide-react";

export default function LabHub() {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black font-outfit mb-6 text-glow">Interactive Query Lab</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Choose your database engine. Write, execute, and validate real queries in a sandboxed client-side environment.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link 
          href="/lab/mysql"
          className="glass-panel p-10 rounded-3xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center border-glow"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Database className="w-32 h-32 text-primary" />
          </div>
          
          <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
            <Database className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-3xl font-bold font-outfit mb-4 relative z-10 text-white">
            MySQL Sandbox
          </h2>
          
          <p className="text-zinc-400 relative z-10">
            Practice DDL and DML commands. Test joins, subqueries, and aggregations against a pre-seeded relational schema.
          </p>
        </Link>
        
        <Link 
          href="/lab/mongodb"
          className="glass-panel p-10 rounded-3xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] border-white/10 hover:border-accent/50"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server className="w-32 h-32 text-accent" />
          </div>
          
          <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
            <Server className="w-10 h-10 text-accent" />
          </div>
          
          <h2 className="text-3xl font-bold font-outfit mb-4 relative z-10 text-white">
            MongoDB Sandbox
          </h2>
          
          <p className="text-zinc-400 relative z-10">
            Write NoSQL document queries. Practice find(), aggregate(), and update operations against a mock JSON collection.
          </p>
        </Link>
      </div>
    </div>
  );
}
