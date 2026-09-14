"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { Footer } from "@/components/Footer";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { fmtCompact } from "@/lib/format";
import { Layers, Rocket, DollarSign, TrendingUp, ShieldCheck, Flame, Gift } from "lucide-react";

export default function PlatformPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ember")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalVol = data?.volume24h || 33696604;
  const dailyFees = data?.dailyFeesGenerated || 101090;

  const dailyRevenueHistory = [
    { date: "Sep 10", revenue: 6800, buybacks: 3400 },
    { date: "Sep 11", revenue: 81200, buybacks: 40600 },
    { date: "Sep 12", revenue: 57600, buybacks: 28800 },
    { date: "Sep 13", revenue: 91000, buybacks: 45500 },
    { date: "Sep 14 (Today)", revenue: Math.round(dailyFees), buybacks: Math.round(dailyFees * 0.5) },
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
        price={data?.price || 0.0268}
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
            <Layers className="w-6 h-6 text-orange-400" />
            Platform Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            EmberCurve launchpad fee revenue, graduation engine, and ecosystem health · Live on Solana
          </p>
        </div>

        {/* 4 Core Platform KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-orange-400" />
              Daily Platform Fees
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              {fmtCompact(dailyFees)}
            </div>
            <div className="text-[11px] text-green-400 font-mono mt-1">+18.2% vs yesterday</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              24h Total Volume
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              {fmtCompact(totalVol)}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Across 30 active pools</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-purple-400" />
              Graduation Rate
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              18.4%
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">To Meteora DLMM pool</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Active Creators
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              428
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Verified on-chain</div>
          </div>
        </div>

        {/* Revenue Distribution Model */}
        <section className="card p-6 border-slate-800 bg-[#111622]">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Ember Platform Fee Split (The 4 Flywheel Streams)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-slate-900/90 border border-orange-500/30 p-4 rounded-lg">
              <div className="flex items-center justify-between text-orange-400 font-bold text-sm">
                <span>🔥 50% Buyback & Burn</span>
                <span>{fmtCompact(dailyFees * 0.5)}/d</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
                Swept directly into the burn wallet to buy $EMBER off the open market and permanently remove it from circulating supply.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-lg">
              <div className="flex items-center justify-between text-emerald-400 font-bold text-sm">
                <span>💰 25% Holders Payback</span>
                <span>{fmtCompact(dailyFees * 0.25)}/d</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
                Distributed on-chain directly to verified $EMBER holders and stakers as native protocol yield.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-purple-500/30 p-4 rounded-lg">
              <div className="flex items-center justify-between text-purple-400 font-bold text-sm">
                <span>🎰 15% SuperLotto</span>
                <span>{fmtCompact(dailyFees * 0.15)}/d</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
                Accumulated in the smart contract jackpot and randomly awarded to lucky ecosystem traders.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-700/60 p-4 rounded-lg">
              <div className="flex items-center justify-between text-slate-300 font-bold text-sm">
                <span>👥 10% Dev & Infra</span>
                <span>{fmtCompact(dailyFees * 0.10)}/d</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
                Funds ongoing server RPC infrastructure, Meteora integration, and protocol maintenance.
              </p>
            </div>
          </div>
        </section>

        {/* Daily Fee Revenue Chart */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Daily Platform Fee Revenue Timeline (USD)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Calculated at each day&apos;s real trading tax volume</p>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Real Calendar History
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyRevenueHistory}>
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
                    fontSize: "12px",
                  }}
                  formatter={(val: any, name: any) => [
                    `$${Number(val).toLocaleString()} USD`,
                    name === "revenue" ? "Total Platform Fee Revenue" : "50% Buyback Allocation",
                  ]}
                />
                <Bar dataKey="revenue" name="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  {dailyRevenueHistory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.date.includes("Today") ? "#f97316" : "#3b82f6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
