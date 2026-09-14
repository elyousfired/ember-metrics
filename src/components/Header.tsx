"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, RefreshCw, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

interface HeaderProps {
  loading: boolean;
  secondsAgo: number;
  onRefresh: () => void;
  ecosystemCount?: number;
}

export function Header({ loading, secondsAgo, onRefresh, ecosystemCount = 13 }: HeaderProps) {
  const pathname = usePathname();
  const [platformOpen, setPlatformOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPlatformActive = pathname === "/platform" || pathname === "/flywheel";
  const isEcosystemActive =
    pathname === "/tokens" ||
    pathname === "/pairs" ||
    pathname === "/launches" ||
    pathname === "/rewards" ||
    pathname === "/holders";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0b0e14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-white text-[17px]">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Flame className="w-5 h-5 text-white fill-white" />
            </span>
            <span>ember.fyi</span>
            <span className="border border-slate-700 bg-slate-800/60 rounded px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
              unofficial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-4 text-[13px] text-slate-400">
            <Link
              href="/"
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                pathname === "/" ? "bg-slate-800 text-white font-semibold" : "hover:text-white"
              }`}
            >
              $EMBER
            </Link>

            {/* Platform Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPlatformOpen(true)}
              onMouseLeave={() => setPlatformOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  isPlatformActive ? "bg-slate-800 text-white font-semibold" : "hover:text-white"
                }`}
              >
                <span>Platform</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {platformOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-[#111622] border border-slate-800 rounded-lg shadow-xl p-1.5 z-50 flex flex-col gap-1 text-xs">
                  <Link
                    href="/platform"
                    onClick={() => setPlatformOpen(false)}
                    className={`px-3 py-2 rounded-md hover:bg-slate-800 transition ${
                      pathname === "/platform" ? "text-orange-400 font-bold bg-slate-800/60" : "text-slate-300"
                    }`}
                  >
                    Overview
                  </Link>
                  <Link
                    href="/flywheel"
                    onClick={() => setPlatformOpen(false)}
                    className={`px-3 py-2 rounded-md hover:bg-slate-800 transition ${
                      pathname === "/flywheel" ? "text-orange-400 font-bold bg-slate-800/60" : "text-slate-300"
                    }`}
                  >
                    Flywheel & Burns
                  </Link>
                </div>
              )}
            </div>

            {/* Ecosystem Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setEcosystemOpen(true)}
              onMouseLeave={() => setEcosystemOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  isEcosystemActive ? "bg-slate-800 text-white font-semibold" : "hover:text-white"
                }`}
              >
                <span>Ecosystem</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {ecosystemOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-[#111622] border border-slate-800 rounded-lg shadow-xl p-1.5 z-50 flex flex-col gap-1 text-xs">
                  <Link
                    href="/tokens"
                    onClick={() => setEcosystemOpen(false)}
                    className={`px-3 py-2 rounded-md hover:bg-slate-800 transition ${
                      pathname === "/tokens" ? "text-orange-400 font-bold bg-slate-800/60" : "text-slate-300"
                    }`}
                  >
                    Tokens & Yield
                  </Link>
                  <Link
                    href="/pairs"
                    onClick={() => setEcosystemOpen(false)}
                    className={`px-3 py-2 rounded-md hover:bg-slate-800 transition ${
                      pathname === "/pairs" ? "text-orange-400 font-bold bg-slate-800/60" : "text-slate-300"
                    }`}
                  >
                    Pairs & Volume
                  </Link>
                  <Link
                    href="/launches"
                    onClick={() => setEcosystemOpen(false)}
                    className={`px-3 py-2 rounded-md hover:bg-slate-800 transition ${
                      pathname === "/launches" ? "text-orange-400 font-bold bg-slate-800/60" : "text-slate-300"
                    }`}
                  >
                    Launches
                  </Link>
                  <Link
                    href="/rewards"
                    onClick={() => setEcosystemOpen(false)}
                    className={`px-3 py-2 rounded-md hover:bg-slate-800 transition ${
                      pathname === "/rewards" ? "text-orange-400 font-bold bg-slate-800/60" : "text-slate-300"
                    }`}
                  >
                    Rewards & Payback
                  </Link>
                  <Link
                    href="/holders"
                    onClick={() => setEcosystemOpen(false)}
                    className={`px-3 py-2 rounded-md hover:bg-slate-800 transition ${
                      pathname === "/holders" ? "text-orange-400 font-bold bg-slate-800/60" : "text-slate-300"
                    }`}
                  >
                    Holders Census
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                pathname === "/about" ? "bg-slate-800 text-white font-semibold" : "hover:text-white"
              }`}
            >
              About
            </Link>
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
            <span>{loading ? "syncing..." : secondsAgo < 60 ? `updated ${secondsAgo}s ago` : `updated ${Math.floor(secondsAgo / 60)}m ago`}</span>
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin text-orange-400" : ""}`} />
          </button>

          <a
            href="https://dexscreener.com/solana/6e4ewhhgzrbmiskkat7qcx28dytjdnyrobnxwrpl5wfn"
            target="_blank"
            rel="noreferrer"
            className="btn-buy hidden sm:inline-flex items-center justify-center font-semibold text-xs h-8 px-3 rounded-md gap-1.5"
          >
            <span>Buy $EMBER</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0d121c] px-4 py-3 space-y-2 text-sm">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-slate-200 font-medium"
          >
            $EMBER (Home)
          </Link>
          <div className="pt-2 border-t border-slate-800/60 text-xs font-bold text-slate-500 uppercase">Platform</div>
          <Link
            href="/platform"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 pl-2 text-slate-300 hover:text-white"
          >
            Platform Overview
          </Link>
          <Link
            href="/flywheel"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 pl-2 text-slate-300 hover:text-white"
          >
            Flywheel & Burns
          </Link>
          <div className="pt-2 border-t border-slate-800/60 text-xs font-bold text-slate-500 uppercase">Ecosystem</div>
          <Link
            href="/tokens"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 pl-2 text-slate-300 hover:text-white"
          >
            Tokens & Yield
          </Link>
          <Link
            href="/pairs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 pl-2 text-slate-300 hover:text-white"
          >
            Pairs & Volume
          </Link>
          <Link
            href="/launches"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 pl-2 text-slate-300 hover:text-white"
          >
            Launches
          </Link>
          <Link
            href="/rewards"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 pl-2 text-slate-300 hover:text-white"
          >
            Rewards & Payback
          </Link>
          <Link
            href="/holders"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 pl-2 text-slate-300 hover:text-white"
          >
            Holders Census
          </Link>
          <div className="pt-2 border-t border-slate-800/60 text-xs font-bold text-slate-500 uppercase">Info</div>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 pl-2 text-slate-300 hover:text-white"
          >
            About & Methodology
          </Link>
        </div>
      )}
    </header>
  );
}
