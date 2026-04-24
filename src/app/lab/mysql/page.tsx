"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { executeAndValidate, ValidationResult } from "@/lib/validation/sql-engine";
import { Play, Database, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import queriesData from "@/data/queries.json";

export default function MySQLLab() {
  const [code, setCode] = useState("SELECT * FROM patient;");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // We can show some queries from the queriesData as reference
  const basicQueries = queriesData.basic.split('----------------------------------------------------------------')
    .filter((q: string) => q.includes('SELECT') || q.includes('CREATE'))
    .slice(1, 5) // just take a few
    .map((q: string) => {
      const match = q.match(/-- (.*?)\n([\s\S]*?);/);
      if (match) return { title: match[1], sql: match[2].trim() + ';' };
      return null;
    }).filter(Boolean);

  const handleExecute = async () => {
    setIsExecuting(true);
    // Give UI time to update
    setTimeout(async () => {
      const res = await executeAndValidate(code);
      setResult(res);
      setIsExecuting(false);
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="h-16 border-b border-white/10 glass-panel flex items-center px-6 shrink-0 justify-between">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-primary" />
          <span className="font-bold font-outfit text-xl">MySQL Lab</span>
        </div>
        <button
          onClick={handleExecute}
          disabled={isExecuting}
          className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50"
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
            <span>sql.js (WebAssembly)</span>
          </div>
          <div className="flex-1 overflow-auto bg-[#282c34]">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[sql()]}
              onChange={(value) => setCode(value)}
              theme="dark"
              style={{ fontSize: 16 }}
            />
          </div>
          
          {/* Reference Snippets */}
          <div className="h-48 border-t border-white/10 bg-black overflow-y-auto p-4">
            <h3 className="text-sm font-bold text-zinc-400 mb-3">Quick Reference</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setCode("SELECT * FROM patient;")}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-xs font-mono text-primary"
              >
                SELECT * FROM patient
              </button>
              <button 
                onClick={() => setCode("SELECT first_name, last_name FROM patient WHERE pid > 300;")}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-xs font-mono text-primary"
              >
                SELECT WHERE
              </button>
              <button 
                onClick={() => setCode("SELECT p.first_name, a.start_time FROM patient p JOIN appointment a ON p.pid = a.pid;")}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-xs font-mono text-primary"
              >
                JOIN Tables
              </button>
            </div>
            
            <div className="mt-4">
               <h3 className="text-xs font-bold text-zinc-500 mb-2">Available Tables:</h3>
               <p className="text-xs text-zinc-400 font-mono">patient (pid, first_name, last_name, phone, date_of_birth)<br/>
               doctor (id, name, specialty)<br/>
               appointment (apid, pid, doctor, start_time, duration)<br/>
               product (prod_code, name, regular_price, attribute1)</p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="w-full md:w-1/2 flex flex-col bg-black">
          <div className="bg-zinc-900 px-4 py-2 text-xs font-mono text-zinc-400 border-b border-white/10">
            Results
          </div>
          <div className="flex-1 overflow-auto p-6">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                <Database className="w-16 h-16 mb-4 opacity-20" />
                <p>Run a query to see results here</p>
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
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl font-mono text-sm whitespace-pre-wrap">
                    {result.error}
                  </div>
                )}

                {result.success && result.actual.length === 0 && (
                  <div className="text-zinc-400 italic">Query executed successfully. (No rows returned)</div>
                )}

                {result.success && result.actual.map((resSet, idx) => (
                  <div key={idx} className="mb-8 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr>
                          {resSet.columns.map((col, i) => (
                            <th key={i} className="border-b border-white/10 p-3 text-primary font-bold bg-primary/5 text-sm">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {resSet.values.map((row, i) => (
                          <tr key={i} className="hover:bg-white/5 border-b border-white/5">
                            {row.map((val, j) => (
                              <td key={j} className="p-3 text-zinc-300 text-sm">
                                {val === null ? <span className="text-zinc-600 italic">NULL</span> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-2 text-xs text-zinc-500">{resSet.values.length} rows returned</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
