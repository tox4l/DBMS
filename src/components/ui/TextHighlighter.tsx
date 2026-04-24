"use client";

import React from "react";
import { clsx } from "clsx";

// Mapping of exact phrases to Tailwind colors
const KEYWORD_MAP: Record<string, string> = {
  // Electric Blue
  "PRIMARY KEY": "text-[#0ea5e9] font-bold",
  "COMPOSITE KEY": "text-[#0ea5e9] font-bold",
  "CANDIDATE KEY": "text-[#0ea5e9] font-bold",
  "INNER JOIN": "text-[#0ea5e9] font-bold",
  "LEFT JOIN": "text-[#0ea5e9] font-bold",
  "RIGHT JOIN": "text-[#0ea5e9] font-bold",
  "FULL OUTER JOIN": "text-[#0ea5e9] font-bold",
  "CROSS JOIN": "text-[#0ea5e9] font-bold",
  
  // Gold
  "FOREIGN KEY CONSTRAINT": "text-[#f59e0b] font-bold",
  "FOREIGN KEY": "text-[#f59e0b] font-bold",
  "REFERENCES": "text-[#f59e0b] font-bold",
  "HAVING": "text-[#f59e0b] font-bold",
  
  // Purple
  "JUNCTION TABLE": "text-[#a855f7] font-bold",
  "BRIDGE TABLE": "text-[#a855f7] font-bold",
  "WEAK ENTITY": "text-[#a855f7] font-bold",
  
  // Orange
  "NOT NULL": "text-[#f97316] font-bold",
  "UNIQUE": "text-[#f97316] font-bold",
  "CHECK": "text-[#f97316] font-bold",
  "TRANSACTION": "text-[#f97316] font-bold",
  "COMMIT": "text-[#f97316] font-bold",
  "ROLLBACK": "text-[#f97316] font-bold",
  "SAVEPOINT": "text-[#f97316] font-bold",
};

// Generic SQL keywords (not already mapped) -> Electric Blue
const SQL_KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", "SET", 
  "DELETE", "CREATE", "TABLE", "DROP", "ALTER", "ADD", "COLUMN", "GROUP BY", 
  "ORDER BY", "ASC", "DESC", "LIMIT", "OFFSET", "AND", "OR", "NOT", "IS NULL", 
  "IS NOT NULL", "IN", "NOT IN", "EXISTS", "BETWEEN", "LIKE", "AS", "JOIN", 
  "ON", "UNION", "ALL", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX",
  "NULL"
]);

interface Props {
  text: string;
  className?: string;
}

export function TextHighlighter({ text, className }: Props) {
  if (!text) return null;
  
  // Regex to split by backticks to preserve inline code blocks. 
  // It splits keeping the delimiters using capturing groups.
  const parts = text.split(/(`[^`]+`)/g);

  // Pre-compute the regex for keywords (sort by length descending to match longest first)
  const sortedKeywords = [
    ...Object.keys(KEYWORD_MAP),
    ...Array.from(SQL_KEYWORDS)
  ].sort((a, b) => b.length - a.length);

  // Escape regex characters and allow optional word boundaries
  const escaped = sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Use \b but handle cases where keyword contains spaces
  const regex = new RegExp(`\\b(${escaped.join("|")})\\b`, 'gi');

  return (
    <span className={className}>
      {parts.map((part, i) => {
        // If it's a code block
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-zinc-300 font-mono">
              {part.substring(1, part.length - 1)}
            </code>
          );
        }

        // It's normal text. We need to find keywords.
        const textChunks = part.split(regex);

        return (
          <span key={i}>
            {textChunks.map((chunk, j) => {
              if (!chunk) return null;
              const upperChunk = chunk.toUpperCase();
              
              if (KEYWORD_MAP[upperChunk]) {
                return <span key={j} className={KEYWORD_MAP[upperChunk]}>{chunk}</span>;
              }
              
              if (SQL_KEYWORDS.has(upperChunk)) {
                return <span key={j} className="text-[#0ea5e9] font-bold">{chunk}</span>;
              }
              
              // Also catch random ALL-CAPS words that look like SQL keywords (length > 2, alphabetical)
              // Only if they are standalone words (this regex chunking helps)
              if (/^[A-Z_]{3,}$/.test(chunk)) {
                 return <span key={j} className="text-[#0ea5e9] font-medium">{chunk}</span>;
              }

              return <span key={j}>{chunk}</span>;
            })}
          </span>
        );
      })}
    </span>
  );
}
