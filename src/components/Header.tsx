"use client";

import React from "react";
import { Flame, RefreshCw, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  loading: boolean;
  secondsAgo: number;
  onRefresh: () => void;
  ecosystemCount?: number;
}

export function Header({ loading, secondsAgo, onRefresh, ecosystemCount = 13 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#0b0e14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-white text-[17px]">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Flame className="w-5 h-5 text-white fill-white" />
            </span>
            <span>ember.fyi</span>
            <span className="border border-slate-700 bg-slate-800/60 rounded px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
              unofficial
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1 ml-4 text-[13px] text-slate-400">
            <a href="#overview" className="px-2.5 py-1.5 rounded-md bg-slate-800 text-white font-medium">
              $EMBER
            </a>
            <a href="#flywheel" className="px-2.5 py-1.5 rounded-md hover:text-white transition">
              Flywheel
            </a>
            <a href="#ecosystem" className="px-2.5 py-1.5 rounded-md hover:text-white transition">
              Ecosystem ({ecosystemCount})
            </a>
            <a href="#simulator" className="px-2.5 py-1.5 rounded-md hover:text-white transition">
              Simulator
            </a>
            <a href="#about" className="px-2.5 py-1.5 rounded-md hover:text-white transition">
              About
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 h-8 px-2.5 rounded-md border border-slate-800 bg-slate-900/60 text-xs text-slate-400 hover:text-white transition cursor-pointer"
            title="Click to refresh live on-chain metrics"
          >
            <span className="live-dot" />
            <span>{loading ? "syncing..." : `updated ${secondsAgo}s ago`}</span>
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin text-orange-400" : ""}`} />
          </button>

          <a
            href="https://dexscreener.com/solana/6e4ewhhgzrbmiskkat7qcx28dytjdnyrobnxwrpl5wfn"
            target="_blank"
            rel="noreferrer"
            className="btn-buy inline-flex items-center justify-center font-semibold text-xs h-8 px-3 rounded-md gap-1.5"
          >
            <span>Buy $EMBER</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
