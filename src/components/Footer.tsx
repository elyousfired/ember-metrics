"use client";

import React from "react";
import { Flame } from "lucide-react";

interface FooterProps {
  contract: string;
  burnWallet: string;
}

export function Footer({ contract, burnWallet }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-[#080b10] text-xs text-slate-500 py-6 px-4 sm:px-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-slate-300 font-semibold">ember.fyi</span>
          <span>— Unofficial live metrics for $EMBER. Not financial advice.</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px]">
          <a
            href={`https://solscan.io/token/${contract}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 transition"
          >
            Token on Solscan ↗
          </a>
          <a
            href={`https://solscan.io/account/${burnWallet}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 transition"
          >
            Burn Wallet ↗
          </a>
          <a
            href="https://embercurve.fun"
            target="_blank"
            rel="noreferrer"
            className="text-orange-400 hover:underline transition"
          >
            EmberCurve.fun ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
