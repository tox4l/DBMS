"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Code2, Database, Search, ChevronRight, BookOpen } from "lucide-react";
import queriesData from "@/data/queries.json";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { javascript } from "@codemirror/lang-javascript";

// Parse the text into sections
const parseSections = (text: string, type: "sql" | "mongodb") => {
  if (!text) return [];
  // Split by the big separator
  const parts = text.split("----------------------------------------------------------------");
  
  const sections = [];
  
  // Skip the first part which is usually header
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (!part.trim()) continue;
    
    // The title is the first line, then there is another separator
    const lines = part.split("\n");
    const titleLine = lines.find(l => l.trim().length > 0);
    
    // We expect the next part to contain the actual code
    i++;
    if (i >= parts.length) break;
    
    const codePart = parts[i];
    
    if (titleLine && codePart) {
      sections.push({
        id: titleLine.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase(),
        title: titleLine.trim(),
        code: codePart.trim(),
        type
      });
    }
  }
  
  return sections;
};

export default function CheatsheetPage() {
  const [activeTab, setActiveTab] = useState<"sql_basic" | "sql_adv" | "mongo_basic" | "mongo_adv">("sql_basic");
  const [searchQuery, setSearchQuery] = useState("");
  
  const extractParts = (text: string) => {
    const splitIndex = text.indexOf("PART 2");
    if (splitIndex === -1) {
      return { sql: parseSections(text, "sql"), mongo: [] };
    }
    
    // Split right before the equals signs that precede PART 2
    const delimiterIndex = text.lastIndexOf("===", splitIndex);
    
    const sqlText = text.substring(0, delimiterIndex > -1 ? delimiterIndex : splitIndex);
    const mongoText = text.substring(splitIndex);
    
    return {
      sql: parseSections(sqlText, "sql"),
      mongo: parseSections(mongoText, "mongodb")
    };
  };

  const basicParts = extractParts(queriesData.basic);
  const advParts = extractParts(queriesData.advanced);

  const tabs = [
    { id: "sql_basic", label: "Basic SQL", icon: Database, data: basicParts.sql },
    { id: "sql_adv", label: "Advanced SQL", icon: Code2, data: advParts.sql },
    { id: "mongo_basic", label: "Basic MongoDB", icon: BookOpen, data: basicParts.mongo },
    { id: "mongo_adv", label: "Advanced MongoDB", icon: Zap, data: advParts.mongo }
  ] as const;

  const currentData = tabs.find(t => t.id === activeTab)?.data || [];
  
  const filteredData = currentData.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    section.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>Quick Review</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight">
            Query <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Cheatsheet</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            A comprehensive reference for SQL and MongoDB operations. Search for commands, syntax, and examples instantly.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between sticky top-0 z-40 bg-black/80 backdrop-blur-xl py-4 border-b border-white/5">
          <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/10 overflow-x-auto w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-black shadow-lg shadow-primary/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search queries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredData.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <Database className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                <p className="text-zinc-400">Try adjusting your search query.</p>
              </motion.div>
            ) : (
              filteredData.map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/5 group"
                >
                  <div className="bg-zinc-900/80 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-outfit font-medium text-lg text-white group-hover:text-primary transition-colors flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      {section.title}
                    </h3>
                  </div>
                  <div className="p-0">
                    <CodeMirror
                      value={section.code}
                      height="100%"
                      theme="dark"
                      extensions={[section.type === "sql" ? sql() : javascript()]}
                      readOnly={true}
                      editable={false}
                      className="text-sm"
                      basicSetup={{
                        lineNumbers: false,
                        foldGutter: false,
                        highlightActiveLine: false,
                      }}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
