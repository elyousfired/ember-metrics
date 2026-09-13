"use client";

import React from "react";
import { fmtNum, fmtCompact } from "@/lib/format";

interface TickerBarProps {
  price: number;
  priceChange: number;
  mcap: number;
  vol24h: number;
  burnedPct: number;
  liquidity: number;
  burnWalletPending: number;
  dailyFees: number;
}

export function TickerBar({
  price,
  priceChange,
  mcap,
  vol24h,
  burnedPct,
  liquidity,
  burnWalletPending,
  dailyFees,
}: TickerBarProps) {
  return (
    <div className="border-b border-slate-800/80 bg-slate-950/60 text-xs py-2 px-4 sm:px-6 overflow-x-auto select-none">
      <div className="max-w-7xl mx-auto ticker !gap-6 flex items-center">
        <span>
          <span className="k">EMBER/USDC</span>
          <b>${fmtNum(price, 4)}</b>
          <span className={priceChange >= 0 ? "text-up font-semibold" : "text-down font-semibold"}>
            {priceChange >= 0 ? `+${fmtNum(priceChange, 1)}%` : `${fmtNum(priceChange, 1)}%`}
          </span>
        </span>
        <span>
          <span className="k">MCAP</span>
          <b>{fmtCompact(mcap)}</b>
        </span>
        <span>
          <span className="k">24H VOL</span>
          <b>{fmtCompact(vol24h)}</b>
        </span>
        <span>
          <span className="k">BURNED</span>
          <b className="text-orange-400">{fmtNum(burnedPct, 3)}%</b>
        </span>
        <span>
          <span className="k">LAST BURN</span>
          <b className="text-white">4,617</b>
          <span className="k">· $142.20 · 2m ago</span>
        </span>
        <span>
          <span className="k">POOL TVL</span>
          <b>{fmtCompact(liquidity)}</b>
        </span>
        <span>
          <span className="k">PENDING IN WALLET</span>
          <b className="text-amber-400">{fmtCompact(burnWalletPending, "")} EMBER</b>
        </span>
        <span>
          <span className="k">DAILY FEES</span>
          <b>{fmtCompact(dailyFees)}</b>
        </span>
      </div>
    </div>
  );
}
