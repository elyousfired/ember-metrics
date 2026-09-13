"use client";

import React from "react";
import { fmtNum, fmtCompact } from "@/lib/format";

interface KpiGridProps {
  mcap: number;
  vol24h: number;
  burnWalletPending: number;
  price: number;
}

export function KpiGrid({ mcap, vol24h, burnWalletPending, price }: KpiGridProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="card p-4">
        <div className="text-xs font-semibold text-slate-400">Market Cap</div>
        <div className="text-2xl font-bold font-mono text-white mt-1">{fmtCompact(mcap)}</div>
        <div className="text-[11px] text-slate-500 mt-1">-20.5% from ATH ($38.5M)</div>
      </div>
      <div className="card p-4">
        <div className="text-xs font-semibold text-slate-400">24h Volume</div>
        <div className="text-2xl font-bold font-mono text-white mt-1">{fmtCompact(vol24h)}</div>
        <div className="text-[11px] text-slate-500 mt-1">123% of market cap</div>
      </div>
      <div className="card p-4">
        <div className="text-xs font-semibold text-slate-400">Average Per Holder</div>
        <div className="text-2xl font-bold font-mono text-white mt-1">
          ${fmtNum(mcap / 4280, 0)}
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Median ~$45.00</div>
      </div>
      <div className="card p-4">
        <div className="text-xs font-semibold text-slate-400">Burn Wallet Balance</div>
        <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
          {fmtCompact(burnWalletPending, "")} EMBER
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          ~${fmtNum(burnWalletPending * price, 0)} pending burn
        </div>
      </div>
    </section>
  );
}
