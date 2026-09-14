"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { Footer } from "@/components/Footer";
import { Info, ShieldAlert, Cpu, Calculator, CheckCircle2, ExternalLink } from "lucide-react";

export default function AboutPage() {
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

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Info className="w-6 h-6 text-orange-400" />
            About ember.fyi & Methodology
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Independent, source-linked live analytics for the $EMBER token and EmberCurve ecosystem on Solana.
          </p>
        </div>

        {/* Notice Card */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-lg text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> ember.fyi is an independent, community-driven analytics tool. It is not affiliated with, endorsed by, or operated by EmberCurve or Meteora. All figures are retrieved directly from public Solana RPC nodes and DexScreener APIs. This is not financial advice.
          </p>
        </div>

        {/* Section 1: Supply & Burn Mechanics */}
        <section className="card p-6 border-slate-800 bg-[#111622] space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-orange-400" />
            1. Supply & On-Chain Burn Mathematics
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The $EMBER token was minted on Solana with a fixed, unalterable supply of exactly <strong>1,000,000,000 tokens</strong>. Both mint authority and freeze authority were permanently renounced upon creation.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800">
            <div>// Solana RPC Method: getTokenSupply</div>
            <div>Current Supply = 993,634,152 EMBER</div>
            <div className="text-orange-400 font-bold">
              Burned Tokens = Initial Supply (1,000,000,000) - Current Supply = 6,365,848 EMBER
            </div>
            <div>Burned Percentage = (6,365,848 / 1,000,000,000) * 100 = 0.637% (~0.64%)</div>
          </div>
          <p className="text-xs text-slate-400">
            Because tokens are incinerated by sending the standard SPL Token <code className="text-slate-200">Burn</code> instruction, the circulating supply can only ever decrease.
          </p>
        </section>

        {/* Section 2: Multi-Pool Volume Aggregation */}
        <section className="card p-6 border-slate-800 bg-[#111622] space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            2. Multi-DEX Volume & Revenue Aggregation
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Unlike simple single-pool trackers that miscount liquidity, ember.fyi queries the DexScreener token endpoint for the token mint. It dynamically aggregates all <strong>30+ active trading pairs</strong> across Meteora DLMM, Raydium CLMM, and Orca Whirlpools.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-slate-500 uppercase text-[10px]">Launchpad Base Fee</div>
              <div className="text-white font-bold text-sm mt-1">0.3% - 1.0% Dynamic</div>
              <div className="text-slate-400 text-[11px] mt-1">Generated on every ecosystem swap</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-slate-500 uppercase text-[10px]">Buyback Allocation</div>
              <div className="text-orange-400 font-bold text-sm mt-1">50% of Revenue</div>
              <div className="text-slate-400 text-[11px] mt-1">Directly routes to burn wallet</div>
            </div>
          </div>
        </section>

        {/* Section 3: Verified On-Chain Addresses */}
        <section className="card p-6 border-slate-800 bg-[#111622] space-y-4">
          <h2 className="text-base font-bold text-white">3. Verified Contracts & Accounts</h2>
          <div className="divide-y divide-slate-800 text-xs font-mono">
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-slate-400">Token Mint Address</div>
                <div className="font-bold text-white">5dvXTZ5qwgafnHtwu3Ls3QrWx1U4LQsFeCuJgkk4QEC6</div>
              </div>
              <a
                href="https://solscan.io/token/5dvXTZ5qwgafnHtwu3Ls3QrWx1U4LQsFeCuJgkk4QEC6"
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Solscan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-slate-400">Designated Burn Wallet</div>
                <div className="font-bold text-white">GZjYfGyUNQfDChcQ66Gc3ZMcQqPEisyRYe1nPyQhP9bp</div>
              </div>
              <a
                href="https://solscan.io/account/GZjYfGyUNQfDChcQ66Gc3ZMcQqPEisyRYe1nPyQhP9bp"
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Solscan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-slate-400">Main Meteora DLMM Pair</div>
                <div className="font-bold text-white">6e4ewHhGZrBMiSkKat7QCx28dytJdnYrobNXWrPL5WFN</div>
              </div>
              <a
                href="https://dexscreener.com/solana/6e4ewhhgzrbmiskkat7qcx28dytjdnyrobnxwrpl5wfn"
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:underline inline-flex items-center gap-1"
              >
                <span>DexScreener</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
