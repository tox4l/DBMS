"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Database, Code2, Zap } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import modulesData from "@/data/modules.json";
import queriesData from "@/data/queries.json";

type SearchResult = {
  id: string;
  type: "module" | "cheatsheet" | "route" | "lab";
  title: string;
  subtitle?: string;
  url: string;
  icon: any;
};

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getResults = useCallback((): SearchResult[] => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search Routes
    const routes = [
      { title: "Modules", url: "/modules", icon: FileText, type: "route" },
      { title: "Practice", url: "/practice", icon: Code2, type: "route" },
      { title: "Query Lab", url: "/lab", icon: Database, type: "lab" },
      { title: "Tables", url: "/tables", icon: Database, type: "route" },
      { title: "Cheatsheet", url: "/cheatsheet", icon: Zap, type: "route" },
    ];
    
    routes.forEach(route => {
      if (route.title.toLowerCase().includes(q)) {
        results.push({ ...route, id: `route-${route.title}` } as SearchResult);
      }
    });

    // Search Modules
    modulesData.forEach(mod => {
      if (mod.title.toLowerCase().includes(q) || mod.content.toLowerCase().includes(q)) {
        results.push({
          id: `mod-${mod.id}`,
          type: "module",
          title: mod.title,
          subtitle: "Course Module",
          url: `/modules/${mod.id}`,
          icon: FileText
        });
      }
    });
    
    // Quick Cheatsheet Search
    if (queriesData.basic.toLowerCase().includes(q) || queriesData.advanced.toLowerCase().includes(q)) {
       results.push({
         id: "cheatsheet-match",
         type: "cheatsheet",
         title: "Matches found in Cheatsheet",
         subtitle: "Query Reference",
         url: "/cheatsheet",
         icon: Zap
       });
    }

    return results.slice(0, 8); // Limit results
  }, [query]);

  const results = getResults();

  const handleSelect = (url: string) => {
    setOpen(false);
    setQuery("");
    router.push(url);
  };

  return (
    <>
      {/* Invisible trigger just to have it in the DOM if needed, though we rely on keyboard */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className="fixed left-[50%] top-[20%] z-[101] w-full max-w-2xl -translate-x-1/2 p-4"
                >
                  <div className="glass-panel border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden bg-zinc-950/90 backdrop-blur-xl">
                    <div className="flex items-center px-4 py-4 border-b border-white/10">
                      <Search className="w-5 h-5 text-zinc-400 mr-3" />
                      <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search modules, queries, tables..."
                        className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 text-lg placeholder:text-zinc-500"
                      />
                      <div className="text-xs text-zinc-500 font-mono bg-zinc-800/50 px-2 py-1 rounded">ESC</div>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto p-2">
                      {query.trim() === "" ? (
                        <div className="p-8 text-center text-zinc-500">
                          <p>Start typing to search across the platform</p>
                        </div>
                      ) : results.length === 0 ? (
                        <div className="p-8 text-center text-zinc-500">
                          <p>No results found for "{query}"</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {results.map((result) => (
                            <button
                              key={result.id}
                              onClick={() => handleSelect(result.url)}
                              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
                            >
                              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                                <result.icon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                              </div>
                              <div className="flex-1">
                                <div className="text-white font-medium group-hover:text-primary transition-colors">
                                  {result.title}
                                </div>
                                {result.subtitle && (
                                  <div className="text-sm text-zinc-500">{result.subtitle}</div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-3 bg-zinc-900/50 border-t border-white/5 text-xs text-zinc-500 flex justify-between">
                      <span>Navigate with mouse or keyboard</span>
                      <span>VelocityDB Search</span>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
