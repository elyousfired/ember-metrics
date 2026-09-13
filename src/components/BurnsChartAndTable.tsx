"use client";

import React from "react";
import { Flame, Coins, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface BurnsChartAndTableProps {
  dailyHistory: any[];
  burns: any[];
  burnWallet: string;
}

export function BurnsChartAndTable({
  dailyHistory = [],
  burns = [],
  burnWallet,
}: BurnsChartAndTableProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="flywheel">
      {/* Daily Buyback & Burn Chart */}
      <section className="card p-5 lg:col-span-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-orange-400" />
              Estimated EMBER Buybacks & Burns Per Day (USD)
            </h3>
            <span className="text-[11px] font-mono text-slate-400">On-Chain daily run rate</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Fee revenue generated × 50% buyback share. Automatically bought back and incinerated on-chain.
          </p>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyHistory}>
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickFormatter={(v) => `$${v / 1000}k`}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111622",
                  borderColor: "#334155",
                  borderRadius: "8px",
                }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Buybacks USD"]}
              />
              <Bar dataKey="buybackUsd" fill="#f97316" radius={[4, 4, 0, 0]}>
                {dailyHistory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 3 ? "#fb923c" : "#ea580c"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Burns Table */}
      <section className="card p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Recent EMBER Burns
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Live feed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono">
                  <th className="pb-2 font-medium">When</th>
                  <th className="pb-2 text-right font-medium">EMBER</th>
                  <th className="pb-2 text-right font-medium">USD</th>
                  <th className="pb-2 text-right font-medium">Tx</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {burns.slice(0, 7).map((b: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition">
                    <td className="py-2 text-slate-400">{b.relativeTime}</td>
                    <td className="py-2 text-right font-bold text-orange-400">
                      {b.emberAmount?.toLocaleString()}
                    </td>
                    <td className="py-2 text-right text-slate-300">
                      ${b.usdValue?.toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      <a
                        href={b.solscanUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-orange-400 transition inline-flex items-center gap-0.5"
                      >
                        <span>
                          {b.signature?.slice(0, 4)}…{b.signature?.slice(-4)}
                        </span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Total 385.7K+ burn txs</span>
          <a
            href={`https://solscan.io/account/${burnWallet}`}
            target="_blank"
            rel="noreferrer"
            className="text-orange-400 hover:underline flex items-center gap-1"
          >
            Burn Ledger ↗
          </a>
        </div>
      </section>
    </div>
  );
}
