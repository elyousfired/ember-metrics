"use client";

import React from "react";
import { Activity } from "lucide-react";
import { fmtNum, fmtCompact } from "@/lib/format";

interface PairsTableProps {
  pairs: any[];
}

export function PairsTable({ pairs = [] }: PairsTableProps) {
  return (
    <section className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-400" />
            All EMBER Pools & Pairs
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Active liquidity pools across Meteora DLMM, Raydium CLMM, and Orca Whirlpools.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
          {pairs.length} pools active
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono">
              <th className="pb-3 font-medium">Pool</th>
              <th className="pb-3 font-medium">DEX</th>
              <th className="pb-3 text-right font-medium">Price</th>
              <th className="pb-3 text-right font-medium">24h Change</th>
              <th className="pb-3 text-right font-medium">24h Volume</th>
              <th className="pb-3 text-right font-medium">Liquidity</th>
              <th className="pb-3 text-right font-medium">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 font-mono">
            {pairs.slice(0, 10).map((p: any, idx: number) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition">
                <td className="py-3">
                  <div className="font-bold text-white">
                    {p.baseToken}/{p.quoteToken}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[130px]">
                    {p.pairAddress?.slice(0, 6)}…{p.pairAddress?.slice(-4)}
                  </div>
                </td>
                <td className="py-3">
                  <span className="bg-slate-800 border border-slate-700 text-slate-300 px-1.5 py-0.5 rounded text-[10px] uppercase">
                    {p.dexId} {p.labels?.[0] || ""}
                  </span>
                </td>
                <td className="py-3 text-right font-semibold text-slate-200">
                  ${fmtNum(p.priceUsd, 4)}
                </td>
                <td className="py-3 text-right">
                  <span className={p.priceChange24h >= 0 ? "text-up font-bold" : "text-down font-bold"}>
                    {p.priceChange24h >= 0 ? `+${fmtNum(p.priceChange24h, 1)}%` : `${fmtNum(p.priceChange24h, 1)}%`}
                  </span>
                </td>
                <td className="py-3 text-right font-bold text-white">{fmtCompact(p.volume24h)}</td>
                <td className="py-3 text-right text-slate-300">{fmtCompact(p.liquidityUsd)}</td>
                <td className="py-3 text-right">
                  <a href={p.url} target="_blank" rel="noreferrer" className="text-orange-400 hover:underline">
                    DEX ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
