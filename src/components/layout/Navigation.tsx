"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenTool, Database, BarChart3, LayoutTemplate, Zap, Search } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Modules", href: "/modules", icon: BookOpen },
  { name: "Practice", href: "/practice", icon: PenTool },
  { name: "Query Lab", href: "/lab", icon: Database },
  { name: "Tables", href: "/tables", icon: LayoutTemplate },
  { name: "Cheatsheet", href: "/cheatsheet", icon: Zap },
  { name: "Progress", href: "/dashboard", icon: BarChart3 },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen glass-panel border-r border-y-0 border-l-0 sticky top-0 z-50 p-6">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center border-glow">
            <Database className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold font-outfit tracking-wider text-white">
            Velocity<span className="text-primary">DB</span>
          </span>
        </div>

        <button 
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="mb-6 flex items-center justify-between px-3 py-2 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium">Search...</span>
          </div>
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400 group-hover:text-zinc-300">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden",
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-desktop"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                
                <item.icon className={clsx("w-5 h-5 relative z-10", isActive ? "text-primary" : "")} />
                <span className="font-medium relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
            <div className="text-xs text-zinc-400 font-medium mb-2">DAILY STREAK</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-accent">12 Days</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass-panel border-t border-x-0 border-b-0 z-50 flex items-center justify-around px-2 pb-safe overflow-x-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-mobile"
                  className="absolute inset-0 bg-primary/10 border-t-2 border-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <item.icon className={clsx("w-6 h-6 mb-1 relative z-10", isActive ? "text-primary" : "text-zinc-400")} />
              <span className={clsx("text-[10px] font-medium relative z-10", isActive ? "text-primary" : "text-zinc-400")}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
