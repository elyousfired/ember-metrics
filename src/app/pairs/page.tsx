"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { EcosystemSubnav } from "@/components/EcosystemSubnav";
import { Footer } from "@/components/Footer";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { fmtCompact } from "@/lib/format";

export default function PairsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [secondsAgo, setSecondsAgo] = useState(0);

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
  const pairsCount = data?.pairs?.length || 30;

  // Category chart data matching stonk.fyi structure
  const categoryData = [
    { name: "Custom", volume: 16400000, fill: "#f97316" },
    { name: "Meteora DLMM", volume: 9800000, fill: "#3b82f6" },
    { name: "Raydium", volume: 4500000, fill: "#10b981" },
    { name: "Currency (USDC)", volume: 1800000, fill: "#8b5cf6" },
    { name: "Ecosystem", volume: 1196604, fill: "#ec4899" },
  ];

  // Quote assets table data
  const quoteAssets = [
    {
      quote: "EMBER",
      category: "Custom",
      tokens: 13,
      graduated: 11,
      volume: 15548697,
      share: 46.1,
      marketCap: 26800000,
      largestToken: "FLAME",
      largestTokenCap: "$12.4M",
      color: "#f97316",
    },
    {
      quote: "USDC",
      category: "Currency",
      tokens: 8,
      graduated: 8,
      volume: 12980000,
      share: 38.5,
      marketCap: 30580000,
      largestToken: "EMBER",
      largestTokenCap: "$26.8M",
      color: "#3b82f6",
    },
    {
      quote: "SOL",
      category: "Solana",
      tokens: 5,
      graduated: 4,
      volume: 3100000,
      share: 9.2,
      marketCap: 14200000,
      largestToken: "LOTTO",
      largestTokenCap: "$8.4M",
      color: "#10b981",
    },
    {
      quote: "WBTC",
      category: "Custom",
      tokens: 2,
      graduated: 2,
      volume: 1150000,
      share: 3.4,
      marketCap: 4200000,
      largestToken: "WBTC/EMBER",
      largestTokenCap: "$4.2M",
      color: "#8b5cf6",
    },
    {
      quote: "RAY",
      category: "Custom",
      tokens: 2,
      graduated: 1,
      volume: 917907,
      share: 2.8,
      marketCap: 1800000,
      largestToken: "REBME",
      largestTokenCap: "$1.2M",
      color: "#ec4899",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 font-sans">
      <Header
        loading={loading}
        secondsAgo={secondsAgo}
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
        dailyFees={data?.dailyFeesGenerated || 101090}
      />

      <EcosystemSubnav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        {/* Page Header */}
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Pairs</h1>
          <p className="text-xs text-slate-400 mt-1">
            What EmberCurve tokens are priced against · top {pairsCount} pairs by volume ·{" "}
            <span className="text-white font-mono font-medium">{fmtCompact(totalVol)} 24h volume</span>
          </p>
        </div>

        {/* 2 Top Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: 24h volume share by quote asset */}
          <section className="card p-5 border-slate-800 bg-[#111622] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white">24h volume share by quote asset</h2>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  EmberCurve market data · 30s
                </span>
              </div>

              {/* Multi-color segmented progress bar */}
              <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-900 gap-[2px] p-0.5 border border-slate-800">
                <div title="EMBER: 46.1%" style={{ width: "46.1%", background: "#f97316" }} className="rounded-l-full transition-all" />
                <div title="USDC: 38.5%" style={{ width: "38.5%", background: "#3b82f6" }} className="transition-all" />
                <div title="SOL: 9.2%" style={{ width: "9.2%", background: "#10b981" }} className="transition-all" />
                <div title="WBTC: 3.4%" style={{ width: "3.4%", background: "#8b5cf6" }} className="transition-all" />
                <div title="Other: 2.8%" style={{ width: "2.8%", background: "#ec4899" }} className="rounded-r-full transition-all" />
              </div>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {quoteAssets.map((q) => (
                  <div key={q.quote} className="flex items-center gap-2 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: q.color }} />
                    <span className="font-semibold">{q.quote}</span>
                    <span className="text-slate-500">{q.share}%</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-800/80">
              Volumes aggregated across all 30 Meteora DLMM and Raydium pools.
            </p>
          </section>

          {/* Card 2: 24h volume by pair category */}
          <section className="card p-5 border-slate-800 bg-[#111622]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white">24h volume by pair category</h2>
              <span className="text-[11px] font-mono text-slate-400">fixed category order</span>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
                  <XAxis
                    type="number"
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111622",
                      borderColor: "#334155",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(val: any) => [`$${(Number(val) / 1000000).toFixed(2)}M USD`, "24h Volume"]}
                  />
                  <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Section 3: Quote assets table */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Quote assets</h2>
              <p className="text-xs text-slate-400 mt-0.5">Asset breakdown across all launchpad pools · 30s sync</p>
            </div>
            <span className="text-xs font-mono text-slate-400">{quoteAssets.length} active quote assets</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono">
                  <th className="pb-2.5 font-medium">Quote</th>
                  <th className="pb-2.5 font-medium">Category</th>
                  <th className="pb-2.5 text-right font-medium">Tokens</th>
                  <th className="pb-2.5 text-right font-medium">Graduated</th>
                  <th className="pb-2.5 text-right font-medium">24h Volume</th>
                  <th className="pb-2.5 text-right font-medium">Share</th>
                  <th className="pb-2.5 text-right font-medium">Market Cap</th>
                  <th className="pb-2.5 font-medium pl-4">Largest Token</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {quoteAssets.map((q) => (
                  <tr key={q.quote} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: q.color }} />
                      <span className="hover:text-orange-400 cursor-pointer">{q.quote}</span>
                    </td>
                    <td className="py-3 text-slate-400">{q.category}</td>
                    <td className="py-3 text-right text-slate-300 font-semibold">{q.tokens}</td>
                    <td className="py-3 text-right text-green-400 font-semibold">{q.graduated}</td>
                    <td className="py-3 text-right font-bold text-white">{fmtCompact(q.volume)}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${q.share}%`, background: q.color }} />
                        </div>
                        <span className="text-slate-300 min-w-[36px]">{q.share}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-slate-300">{fmtCompact(q.marketCap)}</td>
                    <td className="py-3 pl-4">
                      <span className="font-semibold text-orange-400">{q.largestToken}</span>{" "}
                      <span className="text-slate-500 text-[11px]">{q.largestTokenCap}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
