"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { EcosystemSubnav } from "@/components/EcosystemSubnav";
import { Footer } from "@/components/Footer";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { fmtCompact } from "@/lib/format";
import { Gift, DollarSign, Percent, Users, TrendingUp } from "lucide-react";

export default function RewardsPage() {
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
  const todayRewards = dailyFees * 0.25;

  const payoutsHistory = [
    { date: "Sep 10", payout: 1700 },
    { date: "Sep 11", payout: 20300 },
    { date: "Sep 12", payout: 14400 },
    { date: "Sep 13", payout: 22750 },
    { date: "Sep 14 (Today)", payout: Math.round(todayRewards) },
  ];

  const rewardPools = [
    { pair: "EMBER / USDC", dex: "Meteora DLMM", volume24h: 15548697, feeShare: "0.3%", dailyRewards: 11661, apyEst: "42.5%" },
    { pair: "FLAME / EMBER", dex: "Meteora DLMM", volume24h: 4210000, feeShare: "0.5%", dailyRewards: 5262, apyEst: "36.8%" },
    { pair: "EMBER / SOL", dex: "Raydium CLMM", volume24h: 3100000, feeShare: "0.25%", dailyRewards: 1937, apyEst: "28.4%" },
    { pair: "LOTTO / EMBER", dex: "Meteora DLMM", volume24h: 2150000, feeShare: "0.5%", dailyRewards: 2687, apyEst: "34.1%" },
    { pair: "LIT / EMBER", dex: "Meteora DLMM", volume24h: 1820000, feeShare: "0.4%", dailyRewards: 1820, apyEst: "29.7%" },
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

      <EcosystemSubnav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Gift className="w-6 h-6 text-emerald-400" />
            Holder Rewards & Payback
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            25% of all EmberCurve launchpad trading fees are streamed on-chain directly to $EMBER holders
          </p>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Today&apos;s Reward Pool
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              {fmtCompact(todayRewards)}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">25% of platform fees</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-orange-400" />
              Estimated APY
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              34.8%
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Real fee yield</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              Total Distributed
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              $84.5K
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Since launch</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              Earning Wallets
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              2,180
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Active recipients</div>
          </div>
        </div>

        {/* Payout Timeline Chart */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Daily Holder Payouts Timeline (USD)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Summed across all trading fee splits at payout time</p>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              25% Fee Allocation
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payoutsHistory}>
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
                  formatter={(val: any) => [`$${Number(val).toLocaleString()} USD`, "Holders Payback"]}
                />
                <Bar dataKey="payout" fill="#10b981" radius={[4, 4, 0, 0]}>
                  {payoutsHistory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.date.includes("Today") ? "#34d399" : "#10b981"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Top Reward Pools Table */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <h2 className="text-sm font-bold text-white mb-3">Top Fee Generating Pools for Payback</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono">
                  <th className="pb-2 font-medium">Pool</th>
                  <th className="pb-2 font-medium">Venue</th>
                  <th className="pb-2 text-right font-medium">24h Volume</th>
                  <th className="pb-2 text-right font-medium">Fee Rate</th>
                  <th className="pb-2 text-right font-medium">Daily Payback Pool</th>
                  <th className="pb-2 text-right font-medium">Est. APR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {rewardPools.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition">
                    <td className="py-2.5 font-bold text-white">{r.pair}</td>
                    <td className="py-2.5 text-slate-400">{r.dex}</td>
                    <td className="py-2.5 text-right text-slate-200">{fmtCompact(r.volume24h)}</td>
                    <td className="py-2.5 text-right text-slate-400">{r.feeShare}</td>
                    <td className="py-2.5 text-right font-bold text-emerald-400">${r.dailyRewards.toLocaleString()}</td>
                    <td className="py-2.5 text-right font-bold text-green-400">{r.apyEst}</td>
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
