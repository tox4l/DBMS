"use client";

import { useEffect, useState } from "react";
import tablesData from "@/data/tables.json";
import { marked } from "marked";

export default function TablesPage() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Basic marked configuration to render the raw tables.md
    const rendered = marked.parse(tablesData.content);
    setHtml(rendered as string);
  }, []);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black font-outfit mb-4">Comparison Tables Hub</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Quick reference for key curriculum differences. From centralized vs distributed to SQL vs NoSQL.
        </p>
      </header>

      {/* 
        We use a global style override to make any table inside this container glassmorphism 
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .tables-container table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 3rem;
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }
        .tables-container th {
          background: rgba(14, 165, 233, 0.1);
          color: #0ea5e9;
          font-weight: 700;
          text-align: left;
          padding: 1rem;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .tables-container td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #d4d4d8;
        }
        .tables-container tr:last-child td {
          border-bottom: none;
        }
        .tables-container tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }
        .tables-container h2 {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(14, 165, 233, 0.3);
        }
        .tables-container pre {
          background: rgba(0,0,0,0.5);
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          color: #0ea5e9;
          font-family: monospace;
          margin-top: 0.5rem;
        }
      `}} />

      <div 
        className="tables-container overflow-x-auto pb-20"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
