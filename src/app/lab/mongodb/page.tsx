"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { executeMongoValidate, MongoValidationResult } from "@/lib/validation/mongo-engine";
import { Play, Server, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MongoLab() {
  const [code, setCode] = useState('db.patients.find({ first_name: "Mohammed" })');
  const [result, setResult] = useState<MongoValidationResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    const timer = setTimeout(() => setIsExecuting(true), 300);
    try {
      const res = await executeMongoValidate(code);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      clearTimeout(timer);
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="h-16 border-b border-white/10 glass-panel flex items-center px-6 shrink-0 justify-between">
        <div className="flex items-center gap-3">
          <Server className="w-5 h-5 text-accent" />
          <span className="font-bold font-outfit text-xl">MongoDB Lab</span>
        </div>
        <button
          onClick={handleExecute}
          disabled={isExecuting}
          className="px-6 py-2 bg-accent text-black font-bold rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isExecuting ? "Executing..." : "Execute Query"}
          <Play className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Panel */}
        <div className="w-full md:w-1/2 flex flex-col border-r border-white/10">
          <div className="bg-zinc-900 px-4 py-2 text-xs font-mono text-zinc-400 border-b border-white/10 flex justify-between">
            <span>Editor</span>
            <span>mingo (Local JS engine)</span>
          </div>
          <div className="flex-1 overflow-auto bg-[#282c34]">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[javascript()]}
              onChange={(value) => setCode(value)}
              theme="dark"
              style={{ fontSize: 16 }}
            />
          </div>
          
          {/* Reference Snippets */}
          <div className="h-48 border-t border-white/10 bg-black overflow-y-auto p-4">
            <h3 className="text-sm font-bold text-zinc-400 mb-3">Quick Reference</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                onClick={() => setCode("db.patients.find()")}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-xs font-mono text-accent"
              >
                Find All
              </button>
              <button 
                onClick={() => setCode('db.cars.find({ price: { $gt: 10000 } })')}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-xs font-mono text-accent"
              >
                Find with Filter
              </button>
              <button 
                onClick={() => setCode('db.doctors.insertOne({ name: "Dr. Who", specialty: "Time" })')}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-xs font-mono text-accent"
              >
                Insert Document
              </button>
            </div>
            
            <div className="text-xs text-zinc-400 font-mono">
               <strong>Collections:</strong> patients, doctors, cars <br/>
               <strong>Methods:</strong> find(query, projection), insertOne(doc), updateOne(query, update), deleteOne(query)
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="w-full md:w-1/2 flex flex-col bg-black">
          <div className="bg-zinc-900 px-4 py-2 text-xs font-mono text-zinc-400 border-b border-white/10">
            Results (JSON)
          </div>
          <div className="flex-1 overflow-auto p-6 font-mono text-sm">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                <Server className="w-16 h-16 mb-4 opacity-20" />
                <p>Run a query to see JSON results here</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-3 mb-6">
                  {result.success ? (
                    <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Success ({Math.round(result.timeMs)}ms)
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-sm font-bold">
                      <AlertCircle className="w-4 h-4" /> Error
                    </div>
                  )}
                </div>

                {result.error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl whitespace-pre-wrap">
                    {result.error}
                  </div>
                )}

                {result.success && (
                  <pre className="text-accent bg-white/5 p-4 rounded-xl overflow-x-auto border border-white/10">
                    {JSON.stringify(result.actual, null, 2)}
                  </pre>
                )}
                
                {result.success && result.actual.length !== undefined && (
                  <div className="mt-2 text-xs text-zinc-500">{result.actual.length} document(s) returned</div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
