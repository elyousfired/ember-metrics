"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { EcosystemSubnav } from "@/components/EcosystemSubnav";
import { Footer } from "@/components/Footer";
import { fmtCompact } from "@/lib/format";
import { Coins, Search, ArrowUpRight, ArrowUpDown, Filter } from "lucide-react";

export default function TokensPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"volume24h" | "marketCap" | "priceChange24h" | "liquidityUsd">("volume24h");

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
  const ecosystemTokens: any[] = data?.ecosystemPairs || [
    { name: "FLAME", symbol: "FLAME", priceUsd: 0.0412, priceInEmber: 1.54, volume24h: 4210000, marketCap: 12400000, liquidityUsd: 1200000, priceChange24h: 34.2, pairAddress: "FLAME...1" },
    { name: "Super Lotto", symbol: "LOTTO", priceUsd: 0.0084, priceInEmber: 0.31, volume24h: 2150000, marketCap: 8400000, liquidityUsd: 650000, priceChange24h: 12.8, pairAddress: "LOTTO...2" },
    { name: "LIT Launchpad", symbol: "LIT", priceUsd: 0.0195, priceInEmber: 0.73, volume24h: 1820000, marketCap: 4500000, liquidityUsd: 480000, priceChange24h: -5.4, pairAddress: "LIT...3" },
    { name: "Charmander", symbol: "CHARM", priceUsd: 0.0021, priceInEmber: 0.078, volume24h: 1140000, marketCap: 2100000, liquidityUsd: 310000, priceChange24h: 48.9, pairAddress: "CHARM...4" },
    { name: "Reverse Ember", symbol: "REBME", priceUsd: 0.0152, priceInEmber: 0.57, volume24h: 917000, marketCap: 1800000, liquidityUsd: 290000, priceChange24h: 8.2, pairAddress: "REBME...5" },
    { name: "Meteora Cat", symbol: "MCAT", priceUsd: 0.0064, priceInEmber: 0.24, volume24h: 680000, marketCap: 1400000, liquidityUsd: 195000, priceChange24h: -11.2, pairAddress: "MCAT...6" },
  ];

  // Filtering & Sorting
  const filteredTokens = ecosystemTokens
    .filter(
      (t) =>
        t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 font-sans">
      <Header
        loading={loading}
        secondsAgo={0}
        onRefresh={() => {}}
        ecosystemCount={ecosystemTokens.length}
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
              <Coins className="w-6 h-6 text-orange-400" />
              Tokens & Yield
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tokens that chose $EMBER as their quote asset. Trading fees are paid directly in $EMBER.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search token name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111622] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition font-mono"
            />
          </div>
        </div>

        {/* Sort Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono pb-1">
          <span className="text-slate-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" /> Sort:
          </span>
          {(
            [
              { key: "volume24h", label: "Volume 24h" },
              { key: "marketCap", label: "Market Cap" },
              { key: "liquidityUsd", label: "Liquidity" },
              { key: "priceChange24h", label: "24h Gainers" },
            ] as const
          ).map((s) => (
            <button
              key={s.key}
              onClick={() => setSortBy(s.key)}
              className={`px-3 py-1 rounded transition cursor-pointer shrink-0 ${
                sortBy === s.key
                  ? "bg-orange-500 text-white font-bold"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Tokens Table */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono">
                  <th className="pb-2.5 font-medium">#</th>
                  <th className="pb-2.5 font-medium">Token</th>
                  <th className="pb-2.5 text-right font-medium">Price (USD)</th>
                  <th className="pb-2.5 text-right font-medium">Price (EMBER)</th>
                  <th className="pb-2.5 text-right font-medium">24h Change</th>
                  <th className="pb-2.5 text-right font-medium">24h Volume</th>
                  <th className="pb-2.5 text-right font-medium">Liquidity</th>
                  <th className="pb-2.5 text-right font-medium">Market Cap</th>
                  <th className="pb-2.5 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredTokens.map((t, idx) => {
                  const isUp = (t.priceChange24h || 0) >= 0;
                  return (
                    <tr key={t.pairAddress || idx} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 text-slate-500">{String(idx + 1).padStart(2, "0")}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center font-bold text-orange-400 text-xs border border-slate-700">
                            {t.symbol?.[0] || "E"}
                          </div>
                          <div>
                            <div className="font-bold text-white hover:text-orange-400 cursor-pointer">{t.name}</div>
                            <div className="text-[11px] text-slate-500">{t.symbol} / EMBER</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right text-slate-200 font-semibold">
                        ${typeof t.priceUsd === "number" ? t.priceUsd.toFixed(4) : t.priceUsd}
                      </td>
                      <td className="py-3 text-right text-orange-400 font-semibold">
                        {typeof t.priceInEmber === "number" ? t.priceInEmber.toFixed(3) : t.priceInEmber} 🔥
                      </td>
                      <td className={`py-3 text-right font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? "+" : ""}{Number(t.priceChange24h || 0).toFixed(2)}%
                      </td>
                      <td className="py-3 text-right font-bold text-white">
                        {fmtCompact(t.volume24h)}
                      </td>
                      <td className="py-3 text-right text-slate-300">
                        {fmtCompact(t.liquidityUsd)}
                      </td>
                      <td className="py-3 text-right text-slate-300">
                        {fmtCompact(t.marketCap)}
                      </td>
                      <td className="py-3 text-right">
                        <a
                          href={`https://dexscreener.com/solana/${t.pairAddress || "6e4ewhhgzrbmiskkat7qcx28dytjdnyrobnxwrpl5wfn"}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-orange-400 hover:bg-orange-500 hover:text-white transition font-medium text-[11px]"
                        >
                          <span>Trade</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
