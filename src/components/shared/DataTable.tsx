"use client";

import { useState, useMemo } from "react";
import { Search, Printer, AlertTriangle, Skull, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export type TableColumn = {
  key: string;
  label: string;
};

export type TableRow = {
  id: string;
  isExamCritical?: boolean;
  isTrap?: boolean;
  [key: string]: any;
};

type DataTableProps = {
  columns: TableColumn[];
  data: TableRow[];
  title?: string;
  searchable?: boolean;
  exportable?: boolean;
};

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

export default function DataTable({ 
  columns, 
  data, 
  title, 
  searchable = true, 
  exportable = true 
}: DataTableProps) {
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    // 1. Filter
    let result = data;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = data.filter((row) => {
        return columns.some((col) => {
          const val = row[col.key];
          return val && String(val).toLowerCase().includes(q);
        });
      });
    }

    // 2. Sort
    if (sortConfig !== null) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, query, sortConfig, columns]);

  const handleExport = () => {
    // To export, we print the current window.
    // CSS print media queries should handle hiding non-table elements.
    window.print();
  };

  return (
    <div className="flex flex-col mb-8 mt-4 rounded-xl border border-white/10 bg-zinc-950/50 backdrop-blur-md overflow-hidden shadow-2xl print:shadow-none print:border-black print:bg-white print:text-black">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-white/5 bg-zinc-900/50 print:hidden">
        {title ? (
          <h3 className="text-lg font-bold text-white font-outfit">{title}</h3>
        ) : (
          <div /> // Spacer
        )}
        
        <div className="flex items-center gap-3">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Filter table..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-primary/50 transition-colors w-full sm:w-64"
              />
            </div>
          )}
          {exportable && (
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-zinc-300 transition-colors"
              title="Export as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px] print:min-w-0">
          <thead className="bg-black/40 sticky top-0 backdrop-blur-md print:bg-gray-100 print:text-black">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className="p-4 text-primary font-bold text-sm border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors select-none print:border-black print:text-black"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortConfig?.key === col.key ? (
                      sortConfig.direction === "asc" ? <ArrowUp className="w-3 h-3 text-primary" /> : <ArrowDown className="w-3 h-3 text-primary" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredAndSortedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center text-zinc-500 italic">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredAndSortedData.map((row, idx) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={clsx(
                      "border-b border-white/5 transition-colors group print:border-gray-300",
                      idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.02] print:bg-gray-50",
                      row.isTrap ? "bg-red-500/5 hover:bg-red-500/10" : "hover:bg-white/5"
                    )}
                  >
                    {columns.map((col, colIdx) => (
                      <td key={col.key} className="p-4 text-sm text-zinc-300 group-hover:text-white print:text-black">
                        <div className="flex items-start gap-2">
                          {colIdx === 0 && row.isExamCritical && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5 print:border-black print:text-black">
                              <AlertTriangle className="w-3 h-3" /> EXAM CRITICAL
                            </span>
                          )}
                          {colIdx === 0 && row.isTrap && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 shrink-0 mt-0.5 print:border-black print:text-black">
                              <Skull className="w-3 h-3" /> TRAP
                            </span>
                          )}
                          <span className={clsx(row.isTrap && colIdx === 0 && "text-red-200")}>
                            {row[col.key]}
                          </span>
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
