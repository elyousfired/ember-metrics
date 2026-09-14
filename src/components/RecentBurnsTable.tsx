"use client";

import React from "react";
import { Flame, ExternalLink } from "lucide-react";

interface RecentBurnsTableProps {
  burns: any[];
  burnWallet: string;
}

export function RecentBurnsTable({ burns = [], burnWallet }: RecentBurnsTableProps) {
  return (
    <section className="card p-5 flex flex-col justify-between border-slate-800 bg-[#111622]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            Recent EMBER Burns
          </h3>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
            Live Feed (5m sync)
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Real-time on-chain transaction feed from the designated burn wallet. Each event permanently removes EMBER from the circulating supply.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-mono">
                <th className="pb-2 font-medium">When</th>
                <th className="pb-2 text-right font-medium">EMBER Burned</th>
                <th className="pb-2 text-right font-medium">Value (USD)</th>
                <th className="pb-2 text-right font-medium">Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {burns && burns.length > 0 ? (
                burns.slice(0, 7).map((b: any, i: number) => (
                  <tr key={b.signature || i} className="hover:bg-slate-800/30 transition">
                    <td className="py-2.5 text-slate-400">{b.relativeTime || "Just now"}</td>
                    <td className="py-2.5 text-right font-bold text-orange-400">
                      🔥 {typeof b.emberAmount === "number" ? b.emberAmount.toLocaleString() : b.emberAmount}
                    </td>
                    <td className="py-2.5 text-right text-slate-300">
                      ${typeof b.usdValue === "number" ? b.usdValue.toFixed(2) : b.usdValue}
                    </td>
                    <td className="py-2.5 text-right">
                      <a
                        href={b.solscanUrl || `https://solscan.io/tx/${b.signature}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-400 hover:text-orange-300 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{b.shortSig || (b.signature ? `${b.signature.slice(0, 4)}...${b.signature.slice(-4)}` : "tx")}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">
                    No recent burns detected or waiting for RPC sync...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Total on-chain burns: <strong className="text-slate-200">385.7K+ transactions</strong></span>
        <a
          href={`https://solscan.io/account/${burnWallet}`}
          target="_blank"
          rel="noreferrer"
          className="text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1 font-medium"
        >
          <span>Burn Ledger</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
