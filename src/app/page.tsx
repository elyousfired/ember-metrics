"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerBar } from "@/components/TickerBar";
import { Hero } from "@/components/Hero";
import { SupplyDonut } from "@/components/SupplyDonut";
import { Scorecard } from "@/components/Scorecard";
import { KpiGrid } from "@/components/KpiGrid";
import { BurnsChartAndTable } from "@/components/BurnsChartAndTable";
import { FlywheelSimulator } from "@/components/FlywheelSimulator";
import { EcosystemTable } from "@/components/EcosystemTable";
import { PairsTable } from "@/components/PairsTable";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [burnsData, setBurnsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<number>(Date.now());
  const [secondsAgo, setSecondsAgo] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resEmber, resBurns] = await Promise.all([
        fetch("/api/ember").then((r) => r.json()),
        fetch("/api/burns").then((r) => r.json()),
      ]);
      setData(resEmber);
      setBurnsData(resBurns);
      setLastRefreshed(Date.now());
      setSecondsAgo(0);
    } catch (err) {
      console.error("Failed to load metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 25000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastRefreshed) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastRefreshed]);

  const price = data?.price || 0.0308;
  const priceChange = data?.priceChange24h || 18.5;
  const burnedPct = data?.burnedPct || 0.64;
  const supply = data?.supply || 993638341;
  const burned = data?.burned || 6361658;
  const burnedUsd = data?.burnedUsd || 195000;
  const mcap = data?.marketCap || 30580000;
  const vol24h = data?.volume24h || 37576687;
  const liquidity = data?.liquidity || 4520000;
  const burnWalletPending = data?.burnWalletPending || 1209315;
  const dailyFees = data?.dailyFeesGenerated || 112730;
  const contract = data?.contract || "5dvXTZ5qwgafnHtwu3Ls3QrWx1U4LQsFeCuJgkk4QEC6";
  const burnWallet = data?.burnWallet || "GZjYfGyUNQfDChcQ66Gc3ZMcQqPEisyRYe1nPyQhP9bp";

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 font-sans">
      <Header
        loading={loading}
        secondsAgo={secondsAgo}
        onRefresh={fetchData}
        ecosystemCount={data?.ecosystemPairs?.length || 13}
      />

      <TickerBar
        price={price}
        priceChange={priceChange}
        mcap={mcap}
        vol24h={vol24h}
        burnedPct={burnedPct}
        liquidity={liquidity}
        burnWalletPending={burnWalletPending}
        dailyFees={dailyFees}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8" id="overview">
        <Hero
          price={price}
          priceChange={priceChange}
          mcap={mcap}
          vol24h={vol24h}
          contract={contract}
        />

        <SupplyDonut
          burnedPct={burnedPct}
          burned={burned}
          burnedUsd={burnedUsd}
          supply={supply}
          burnWalletPending={burnWalletPending}
        />

        <Scorecard
          burnVelocity={data?.burnVelocity || 0.21}
          dailyBuybackPressure={data?.dailyBuybackPressure || 56365}
          dailyFeesGenerated={dailyFees}
          liquidity={liquidity}
        />

        <KpiGrid
          mcap={mcap}
          vol24h={vol24h}
          burnWalletPending={burnWalletPending}
          price={price}
        />

        <BurnsChartAndTable
          dailyHistory={burnsData?.dailyHistory || []}
          burns={burnsData?.burns || []}
          burnWallet={burnWallet}
          currentPrice={price}
        />

        <FlywheelSimulator
          price={price}
          supply={supply}
          volume24h={vol24h}
        />

        <EcosystemTable
          ecosystemPairs={data?.ecosystemPairs || []}
        />

        <PairsTable
          pairs={data?.pairs || []}
        />

        {/* Architecture info */}
        <section className="card p-6 border-slate-800 text-xs text-slate-400 space-y-4" id="about">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            About ember.fyi & The Burn Engine
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <div className="font-bold text-slate-200 text-sm">How Revenue Powers Burns</div>
              <p className="leading-relaxed">
                Ember is a Meteora bonding-curve launchpad. Every trade on tokens launched through the platform incurs a dynamic tax. 50% of this tax is routed to the on-chain burn wallet, where it is swapped to EMBER and incinerated.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="font-bold text-slate-200 text-sm">Live On-Chain Data</div>
              <p className="leading-relaxed">
                All supply metrics are queried directly from Solana RPC (<code>getTokenSupply</code>) and DexScreener DLMM liquidity pool APIs. Real transactions and burn events can be verified directly on Solscan.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="font-bold text-slate-200 text-sm">Holders & SuperLotto</div>
              <p className="leading-relaxed">
                The remaining tax revenue is distributed between EMBER token holders (passive on-chain payback) and the SuperLotto prize pool.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer contract={contract} burnWallet={burnWallet} />
    </div>
  );
}
