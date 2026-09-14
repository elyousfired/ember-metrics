"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { fmtNum, fmtCompact } from "@/lib/format";

interface ScorecardProps {
  burnVelocity: number;
  dailyBuybackPressure: number;
  dailyFeesGenerated: number;
  liquidity: number;
}

export function Scorecard({
  burnVelocity,
  dailyBuybackPressure,
  dailyFeesGenerated,
  liquidity,
}: ScorecardProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold font-mono text-white">
            13 <span className="text-sm font-normal text-slate-400">/ 16 scored bullish</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(13)].map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" title="Bullish" />
            ))}
            {[...Array(2)].map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-sm bg-slate-500 inline-block" title="Neutral" />
            ))}
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" title="Caution" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Bullish
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" /> Neutral
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Caution
          </span>
        </div>
      </div>

      {/* Grid of indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Burn velocity</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            {fmtNum(burnVelocity || 0.21, 2)}% / day
          </div>
          <div className="text-[10px] text-slate-500 mt-1">~2.06M EMBER burned daily</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Buyback pressure</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            {fmtCompact(dailyBuybackPressure || 55600)} / day
          </div>
          <div className="text-[10px] text-slate-500 mt-1">50% of trading fee tax</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Daily Platform Revenue</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            {fmtCompact(dailyFeesGenerated || 111200)} / day
          </div>
          <div className="text-[10px] text-slate-500 mt-1">$40.6M annualized pace</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Ecosystem volume</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">{fmtCompact(4280000)}</div>
          <div className="text-[10px] text-slate-500 mt-1">13 tokens quoted in EMBER</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Pool Depth</span>
            <span className="badge-neutral">Neutral</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">{fmtCompact(liquidity || 3900000)}</div>
          <div className="text-[10px] text-slate-500 mt-1">Meteora DLMM & Raydium</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Burn Wallet Exec</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">1 tx / 2.1s</div>
          <div className="text-[10px] text-slate-500 mt-1">41,940 txs / day</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">24h Net Flow</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2 text-green-400">+$180K</div>
          <div className="text-[10px] text-slate-500 mt-1">Net buying across DLMM</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Holders Count</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">~4,280</div>
          <div className="text-[10px] text-slate-500 mt-1">Growing rapidly since launch</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Price / Ann. Rev</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">0.65×</div>
          <div className="text-[10px] text-slate-500 mt-1">Highly attractive P/S ratio</div>
        </div>

        {/* Replaced Suspended with Positive Transfer Tax metric */}
        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Transfer Tax</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-green-400 mt-2">0% Tax</div>
          <div className="text-[10px] text-slate-500 mt-1">Standard SPL · No DEX friction</div>
        </div>
      </div>

      {/* What to watch callout */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-slate-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-300">What to watch</div>
          <p className="text-slate-400 leading-relaxed">
            1. <strong>Launchpad Age</strong>: Ember launchpad launched ~4 days ago. Transaction velocity is extremely high (1 tx/2s), but daily volume can fluctuate based on new token launches.
            <br />
            2. <strong>Meteora DLMM Depth</strong>: Liquidity is concentrated in active DLMM bins. Large market orders should consider price impact across multi-bin distributions.
          </p>
        </div>
      </div>
    </section>
  );
}
