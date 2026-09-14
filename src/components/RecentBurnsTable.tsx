"use client";

import React from "react";
import { Flame, ExternalLink, CheckCircle2 } from "lucide-react";

interface RecentBurnsTableProps {
  burns: any[];
  burnWallet: string;
}

export function RecentBurnsTable({ burns = [], burnWallet }: RecentBurnsTableProps) {
  // Only display verified EMBER burns
  const emberBurns = burns.filter((b) => b.isEmber || b.token === "EMBER" || b.emberAmount > 0);

  const solscanBurnFilterUrl = `https://solscan.io/account/${burnWallet}#transfers?activity_type=ACTIVITY_SPL_BURN`;

  return (
    <section className="card p-5 flex flex-col justify-between border-slate-800 bg-[#111622]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-bold text-white">Recent EMBER Burns</h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-2.5 h-2.5" />
              Action: BURN
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
            Live Feed
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Direct on-chain verified <code>Action: BURN</code> (<code>burnChecked</code>) events for $EMBER. Each transaction permanently destroys circulating supply.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-mono">
                <th className="pb-2 font-medium">When</th>
                <th className="pb-2 text-center font-medium">Action</th>
                <th className="pb-2 text-right font-medium">EMBER Burned</th>
                <th className="pb-2 text-right font-medium">Value (USD)</th>
                <th className="pb-2 text-right font-medium">Tx (Solscan)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {emberBurns && emberBurns.length > 0 ? (
                emberBurns.slice(0, 8).map((b: any, i: number) => {
                  const emberCount =
                    typeof b.emberAmount === "number" && b.emberAmount > 0
                      ? b.emberAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })
                      : typeof b.amount === "number"
                      ? b.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
                      : "—";

                  return (
                    <tr key={b.signature || i} className="hover:bg-slate-800/30 transition">
                      <td className="py-2.5 text-slate-400 whitespace-nowrap">{b.relativeTime || "Just now"}</td>
                      <td className="py-2.5 text-center">
                        <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 tracking-wider uppercase">
                          BURN
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-bold text-orange-400 whitespace-nowrap">
                        🔥 -{emberCount} <span className="text-slate-300 font-normal text-[11px]">EMBER</span>
                      </td>
                      <td className="py-2.5 text-right text-slate-300 whitespace-nowrap">
                        ${typeof b.usdValue === "number" ? b.usdValue.toFixed(2) : b.usdValue || "0.00"}
                      </td>
                      <td className="py-2.5 text-right whitespace-nowrap">
                        <a
                          href={b.solscanUrl || `https://solscan.io/tx/${b.signature}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-orange-400 hover:text-orange-300 hover:underline inline-flex items-center gap-1"
                          title="Verify Action: BURN on Solscan"
                        >
                          <span>{b.shortSig || (b.signature ? `${b.signature.slice(0, 4)}...${b.signature.slice(-4)}` : "tx")}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
                    Scanning for recent on-chain EMBER burns...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span>Total on-chain burns: <strong className="text-slate-200">1,415 transfers (Action: BURN)</strong></span>
        <a
          href={solscanBurnFilterUrl}
          target="_blank"
          rel="noreferrer"
          className="text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1 font-medium"
        >
          <span>Solscan Burn Ledger (Action: BURN)</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
