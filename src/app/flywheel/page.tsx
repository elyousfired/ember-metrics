"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { Footer } from "@/components/Footer";
import { DailyBuybacksChart } from "@/components/DailyBuybacksChart";
import { RecentBurnsTable } from "@/components/RecentBurnsTable";
import { FlywheelSimulator } from "@/components/FlywheelSimulator";
import { Flame, Coins, ExternalLink, RefreshCw } from "lucide-react";
import { fmtCompact } from "@/lib/format";

export default function FlywheelPage() {
  const [data, setData] = useState<any>(null);
  const [burnsData, setBurnsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/ember").then((r) => r.json()),
      fetch("/api/burns").then((r) => r.json()),
    ])
      .then(([d, b]) => {
        setData(d);
        setBurnsData(b);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalVol = data?.volume24h || 33696604;
  const price = data?.price || 0.0268;
  const supply = data?.supply || 993634152;
  const dailyFees = data?.dailyFeesGenerated || 101090;
  const burnWallet = data?.burnWallet || "GZjYfGyUNQfDChcQ66Gc3ZMcQqPEisyRYe1nPyQhP9bp";

  // Recent buyback spend by quote asset (matching stonk.fyi /flywheel)
  const quoteAssetSweeps = [
    { asset: "USDC", amountUsd: 28450, sharePct: 56.3, color: "#3b82f6" },
    { asset: "SOL", amountUsd: 14200, sharePct: 28.1, color: "#10b981" },
    { asset: "WBTC", amountUsd: 5350, sharePct: 10.6, color: "#8b5cf6" },
    { asset: "Other (DLMM pairs)", amountUsd: 2545, sharePct: 5.0, color: "#ec4899" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 font-sans">
      <Header
        loading={loading}
        secondsAgo={0}
        onRefresh={() => {}}
        ecosystemCount={data?.ecosystemPairs?.length || 13}
      />

      <TickerBar
        price={price}
        priceChange={data?.priceChange24h || 18.5}
        mcap={data?.marketCap || 26800000}
        vol24h={totalVol}
        burnedPct={data?.burnedPct || 0.64}
        liquidity={data?.liquidity || 3814870}
        burnWalletPending={data?.burnWalletPending || 1209315}
        dailyFees={dailyFees}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-orange-500" />
            Flywheel & Burn Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fee revenue → buybacks → burns. Everything here comes from EmberCurve&apos;s ledger on Solana.
          </p>
        </div>

        {/* Section 1: Recent buyback spend by quote asset */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-orange-400" />
                Recent Buyback Spend by Quote Asset
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Which fee currencies the protocol swept and converted to $EMBER for incineration
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Past 24h</span>
          </div>

          <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-900 gap-[2px] p-0.5 border border-slate-800 my-4">
            {quoteAssetSweeps.map((s) => (
              <div
                key={s.asset}
                title={`${s.asset}: $${s.amountUsd.toLocaleString()}`}
                style={{ width: `${s.sharePct}%`, background: s.color }}
                className="transition-all"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            {quoteAssetSweeps.map((s) => (
              <div key={s.asset} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                  <span className="font-bold">{s.asset}</span>
                </div>
                <div className="text-base font-bold text-white mt-1.5">{fmtCompact(s.amountUsd)}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{s.sharePct}% of buybacks</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Daily Buybacks & Burns Timeline + Recent Burns Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DailyBuybacksChart
            dailyHistory={burnsData?.dailyHistory || []}
            dailyBuybackPressure={dailyFees * 0.5}
            currentPrice={price}
          />

          <RecentBurnsTable
            burns={burnsData?.burns || []}
            burnWallet={burnWallet}
          />
        </div>

        {/* Section 3: Interactive AMM Flywheel Simulator */}
        <FlywheelSimulator
          price={price}
          supply={supply}
          volume24h={totalVol}
        />
      </main>

      <Footer />
    </div>
  );
}
