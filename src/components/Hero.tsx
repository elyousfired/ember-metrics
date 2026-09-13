"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, Copy, Check, ExternalLink } from "lucide-react";
import { fmtNum, fmtCompact } from "@/lib/format";

interface HeroProps {
  price: number;
  priceChange: number;
  mcap: number;
  vol24h: number;
  contract: string;
}

export function Hero({ price, priceChange, mcap, vol24h, contract }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    if (contract) {
      navigator.clipboard.writeText(contract);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-end pb-2">
      <div>
        <div className="text-xs uppercase tracking-wider font-semibold text-orange-400 mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
          Platform token · EmberCurve launchpad · Solana
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white flex items-baseline gap-3 flex-wrap">
          $EMBER <span className="text-sm md:text-base font-normal text-slate-400">paired with USDC & SOL</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2.5 max-w-2xl leading-relaxed">
          Launchpad trading fee revenue automatically buys EMBER and burns it, on-chain.
          Half of every trade tax fuels continuous deflation.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-mono text-xs bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-300">
            {contract}
          </span>
          <button
            onClick={copyContract}
            className="p-1.5 rounded border border-slate-800 bg-slate-900/60 hover:text-white text-slate-400 transition cursor-pointer"
            title="Copy contract"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <a
            href={`https://solscan.io/token/${contract}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-orange-400 flex items-center gap-1 transition ml-1"
          >
            Solscan <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end md:text-right gap-1.5">
        <div className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white font-mono">
          ${fmtNum(price, 4)}
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
          <span className={`inline-flex items-center gap-0.5 font-bold ${priceChange >= 0 ? "text-up" : "text-down"}`}>
            {priceChange >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {priceChange >= 0 ? `+${fmtNum(priceChange, 1)}%` : `${fmtNum(priceChange, 1)}%`}
          </span>
          <span>24h change · Meteora DLMM pool</span>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Market Cap: <span className="text-slate-300 font-semibold">{fmtCompact(mcap)}</span> · 24h Vol:{" "}
          <span className="text-slate-300 font-semibold">{fmtCompact(vol24h)}</span>
        </div>
      </div>
    </div>
  );
}
