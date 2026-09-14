"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { EcosystemSubnav } from "@/components/EcosystemSubnav";
import { Footer } from "@/components/Footer";
import { fmtCompact } from "@/lib/format";
import { Rocket, CheckCircle2, Clock, ArrowUpRight, Filter } from "lucide-react";

export default function LaunchesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "graduated" | "bonding">("all");

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

  const launches = [
    {
      name: "FLAME Protocol",
      symbol: "FLAME",
      createdAgo: "2h ago",
      bondingProgress: 100,
      graduated: true,
      mcap: 12400000,
      volume24h: 4210000,
      creator: "7xK...9Qm",
      dexTarget: "Meteora DLMM",
      pairAddress: "FLAME...1",
    },
    {
      name: "Super Lotto",
      symbol: "LOTTO",
      createdAgo: "5h ago",
      bondingProgress: 100,
      graduated: true,
      mcap: 8400000,
      volume24h: 2150000,
      creator: "3Wp...8Ta",
      dexTarget: "Meteora DLMM",
      pairAddress: "LOTTO...2",
    },
    {
      name: "Solana Phoenix",
      symbol: "PHOENIX",
      createdAgo: "12m ago",
      bondingProgress: 78,
      graduated: false,
      mcap: 58000,
      volume24h: 340000,
      creator: "9Lq...4Jk",
      dexTarget: "EmberCurve Curve",
      pairAddress: "PHX...3",
    },
    {
      name: "Charmander Inu",
      symbol: "CHARM",
      createdAgo: "1d ago",
      bondingProgress: 100,
      graduated: true,
      mcap: 2100000,
      volume24h: 1140000,
      creator: "5Rf...2Vb",
      dexTarget: "Meteora DLMM",
      pairAddress: "CHARM...4",
    },
    {
      name: "Ember Dragon",
      symbol: "EDRAG",
      createdAgo: "34m ago",
      bondingProgress: 42,
      graduated: false,
      mcap: 29000,
      volume24h: 125000,
      creator: "4Pm...1Zt",
      dexTarget: "EmberCurve Curve",
      pairAddress: "EDRAG...5",
    },
    {
      name: "Burn Engine Bot",
      symbol: "BBOT",
      createdAgo: "4h ago",
      bondingProgress: 91,
      graduated: false,
      mcap: 72000,
      volume24h: 410000,
      creator: "8Vx...7Np",
      dexTarget: "EmberCurve Curve",
      pairAddress: "BBOT...6",
    },
  ];

  const filteredLaunches = launches.filter((item) => {
    if (filterStatus === "graduated") return item.graduated;
    if (filterStatus === "bonding") return !item.graduated;
    return true;
  });

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
        dailyFees={data?.dailyFeesGenerated || 101090}
      />

      <EcosystemSubnav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Rocket className="w-6 h-6 text-orange-400" />
              Launches Feed
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              New tokens launched on EmberCurve bonding curve · 50% of trading tax routes to $EMBER burns
            </p>
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1 bg-[#111622] p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                filterStatus === "all" ? "bg-orange-500 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              All ({launches.length})
            </button>
            <button
              onClick={() => setFilterStatus("graduated")}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                filterStatus === "graduated" ? "bg-green-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Graduated (3)
            </button>
            <button
              onClick={() => setFilterStatus("bonding")}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                filterStatus === "bonding" ? "bg-slate-800 text-orange-400 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Bonding Curve (3)
            </button>
          </div>
        </div>

        {/* Launches Table */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono">
                  <th className="pb-2.5 font-medium">Token</th>
                  <th className="pb-2.5 font-medium">Status</th>
                  <th className="pb-2.5 font-medium">Bonding Curve Progress</th>
                  <th className="pb-2.5 text-right font-medium">Market Cap</th>
                  <th className="pb-2.5 text-right font-medium">24h Volume</th>
                  <th className="pb-2.5 text-right font-medium">Creator</th>
                  <th className="pb-2.5 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredLaunches.map((l, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-orange-400">
                          {l.symbol[0]}
                        </div>
                        <div>
                          <div className="font-bold text-white hover:text-orange-400 cursor-pointer">{l.name}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                            <span>{l.symbol}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <Clock className="w-2.5 h-2.5" />
                              {l.createdAgo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      {l.graduated ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          Graduated
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold text-[11px]">
                          Bonding Curve
                        </span>
                      )}
                    </td>

                    <td className="py-3">
                      <div className="w-44">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-400">{l.dexTarget}</span>
                          <span className={l.graduated ? "text-green-400 font-bold" : "text-orange-400 font-bold"}>
                            {l.bondingProgress}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              l.graduated ? "bg-green-500" : "bg-gradient-to-r from-amber-500 to-orange-500"
                            }`}
                            style={{ width: `${l.bondingProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 text-right font-bold text-white">
                      {fmtCompact(l.mcap)}
                    </td>

                    <td className="py-3 text-right text-slate-300">
                      {fmtCompact(l.volume24h)}
                    </td>

                    <td className="py-3 text-right text-slate-400">
                      {l.creator}
                    </td>

                    <td className="py-3 text-right">
                      <a
                        href="https://dexscreener.com/solana/6e4ewhhgzrbmiskkat7qcx28dytjdnyrobnxwrpl5wfn"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-orange-400 hover:bg-orange-500 hover:text-white transition font-medium text-[11px]"
                      >
                        <span>Trade</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
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
