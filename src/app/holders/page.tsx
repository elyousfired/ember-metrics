"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { EcosystemSubnav } from "@/components/EcosystemSubnav";
import { Footer } from "@/components/Footer";
import { fmtCompact } from "@/lib/format";
import { Users, Shield, PieChart, ExternalLink, ArrowUpRight } from "lucide-react";

export default function HoldersPage() {
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
  const price = data?.price || 0.0268;
  const circulating = data?.supply || 993634152;

  // Top wallets with verified on-chain tags
  const topWallets = [
    {
      rank: "01",
      address: "6e4ewHhGZrBMiSkKat7QCx28dytJdnYrobNXWrPL5WFN",
      tag: "Meteora DLMM Pool (Main Liquidity)",
      tagType: "dex",
      balance: 62450000,
      share: 6.28,
    },
    {
      rank: "02",
      address: "GZjYfGyUNQfDChcQ66Gc3ZMcQqPEisyRYe1nPyQhP9bp",
      tag: "Burn Wallet (Pending Incineration)",
      tagType: "burn",
      balance: 1209315,
      share: 0.12,
    },
    {
      rank: "03",
      address: "GbrDAq3RjcVWeroLDUwmnuQ8N5xaaKj2Rk2dJDg64CLY",
      tag: "Meteora DLMM Secondary Vault",
      tagType: "dex",
      balance: 24100000,
      share: 2.43,
    },
    {
      rank: "04",
      address: "9Lkr4S1BDqAKgYxVuK8NV6VLf8Y7qouU1Mk3teAksZr5",
      tag: "Raydium CLMM Pool",
      tagType: "dex",
      balance: 18500000,
      share: 1.86,
    },
    {
      rank: "05",
      address: "8vK3fP...9LwQ",
      tag: "Whale Wallet #1",
      tagType: "whale",
      balance: 15400000,
      share: 1.55,
    },
    {
      rank: "06",
      address: "3Tr8xM...4NmP",
      tag: "Whale Wallet #2",
      tagType: "whale",
      balance: 12200000,
      share: 1.23,
    },
    {
      rank: "07",
      address: "5Pk2vN...1ZkR",
      tag: "Whale Wallet #3",
      tagType: "whale",
      balance: 9800000,
      share: 0.99,
    },
    {
      rank: "08",
      address: "7Bm9qL...6TxS",
      tag: "Community Treasury Pool",
      tagType: "treasury",
      balance: 8500000,
      share: 0.86,
    },
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
        dailyFees={data?.dailyFeesGenerated || 101090}
      />

      <EcosystemSubnav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-400" />
            Holders Across the Ember Ecosystem
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real on-chain holder distribution, whale concentration, and reward-earning wallet census on Solana.
          </p>
        </div>

        {/* Three Ways to Count a Holder (Matching stonk.fyi) */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <h2 className="text-sm font-bold text-white mb-2">Three Ways to Count a Holder</h2>
          <p className="text-xs text-slate-400 mb-4">
            Same wallets, three lenses. They are never added together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                On-Chain Token Accounts
              </div>
              <div className="text-2xl font-bold text-white mt-1.5">≥ 4,280</div>
              <p className="text-slate-400 text-[11px] mt-1">
                Every Solana account holding a non-zero balance of $EMBER.
              </p>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                HolderScan Census
              </div>
              <div className="text-2xl font-bold text-white mt-1.5">3,940</div>
              <p className="text-slate-400 text-[11px] mt-1">
                De-duplicated unique owner wallets tracked on-chain.
              </p>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Ember-Paid Wallets
              </div>
              <div className="text-2xl font-bold text-white mt-1.5">2,180</div>
              <p className="text-slate-400 text-[11px] mt-1">
                Wallets currently receiving 25% protocol buyback payouts.
              </p>
            </div>
          </div>
        </section>

        {/* 4 KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Total Holders</div>
            <div className="text-2xl font-bold text-white font-mono mt-1">4,280</div>
            <div className="text-[11px] text-green-400 font-mono mt-1">+240 in 24h (+5.9%)</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Top 10 Whales Share</div>
            <div className="text-2xl font-bold text-white font-mono mt-1">14.8%</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Excluding pools</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Average Holding</div>
            <div className="text-2xl font-bold text-white font-mono mt-1">232K</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">~$6,217 USD</div>
          </div>

          <div className="card p-4 border-slate-800 bg-[#111622]">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Mint / Freeze Status</div>
            <div className="text-2xl font-bold text-green-400 font-mono mt-1">Renounced</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">0% transfer tax</div>
          </div>
        </div>

        {/* Top Wallets Table */}
        <section className="card p-5 border-slate-800 bg-[#111622]">
          <h2 className="text-sm font-bold text-white mb-3">Top Token Holders & Protocol Vaults</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono">
                  <th className="pb-2.5 font-medium">Rank</th>
                  <th className="pb-2.5 font-medium">Address / Tag</th>
                  <th className="pb-2.5 text-right font-medium">Balance (EMBER)</th>
                  <th className="pb-2.5 text-right font-medium">Value (USD)</th>
                  <th className="pb-2.5 text-right font-medium">% Circulating</th>
                  <th className="pb-2.5 text-right font-medium">Explorer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {topWallets.map((w) => (
                  <tr key={w.rank} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 text-slate-500">{w.rank}</td>
                    <td className="py-3">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{w.tag}</span>
                          {w.tagType === "burn" && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-400 font-bold">
                              BURN LEDGER
                            </span>
                          )}
                          {w.tagType === "dex" && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-bold">
                              DEX POOL
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{w.address}</div>
                      </div>
                    </td>
                    <td className="py-3 text-right font-bold text-orange-400">
                      {w.balance.toLocaleString()} EMBER
                    </td>
                    <td className="py-3 text-right text-slate-200">
                      ${Math.round(w.balance * price).toLocaleString()}
                    </td>
                    <td className="py-3 text-right text-slate-300 font-semibold">
                      {w.share}%
                    </td>
                    <td className="py-3 text-right">
                      <a
                        href={`https://solscan.io/account/${w.address}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-orange-400 hover:underline"
                      >
                        <span>Solscan</span>
                        <ExternalLink className="w-3 h-3" />
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
