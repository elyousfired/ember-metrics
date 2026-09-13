"use client";

import React, { useState, useMemo } from "react";
import { Sliders } from "lucide-react";
import { fmtNum, fmtCompact } from "@/lib/format";

interface FlywheelSimulatorProps {
  price: number;
  supply: number;
  volume24h: number;
}

export function FlywheelSimulator({ price, supply, volume24h }: FlywheelSimulatorProps) {
  const [growthPerDay, setGrowthPerDay] = useState(10);
  const [horizonDays, setHorizonDays] = useState(7);
  const [poolDepth, setPoolDepth] = useState(1200000);

  const sim = useMemo(() => {
    const startPrice = price || 0.0308;
    const circulating = supply || 993638341;
    const dailyBaseRev = (volume24h || 37576687) * 0.003;
    const buybackRatio = 0.5;

    let totalRevenue = 0;
    let currDailyRev = dailyBaseRev;

    for (let d = 0; d < horizonDays; d++) {
      totalRevenue += currDailyRev;
      currDailyRev *= 1 + growthPerDay / 100;
    }

    const totalBuybacks = totalRevenue * buybackRatio;
    const avgPrice = startPrice * 1.05;
    const emberRemoved = totalBuybacks / avgPrice;
    const supplyCutPct = (emberRemoved / circulating) * 100;

    const floorPrice = startPrice * (circulating / Math.max(1, circulating - emberRemoved));
    const ceilingMultiplier = 1 + (totalBuybacks / Math.max(1, poolDepth)) * 4.5;
    const ceilingPrice = startPrice * ceilingMultiplier;

    return {
      totalRevenue,
      totalBuybacks,
      emberRemoved,
      supplyCutPct,
      floorPrice,
      ceilingPrice,
    };
  }, [price, supply, volume24h, growthPerDay, horizonDays, poolDepth]);

  return (
    <section className="card p-6" id="simulator">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-orange-400" />
            Flywheel Projection Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Models burn rate against constant-product pool curves. Not a guaranteed forecast.
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
          Interactive Model
        </span>
      </div>

      {/* Interactive Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
        <div>
          <div className="flex justify-between font-mono mb-1.5">
            <span className="text-slate-400">Daily Revenue Growth</span>
            <span className="text-orange-400 font-bold">{growthPerDay}%</span>
          </div>
          <input
            type="range"
            min="-20"
            max="50"
            value={growthPerDay}
            onChange={(e) => setGrowthPerDay(Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between font-mono mb-1.5">
            <span className="text-slate-400">Horizon</span>
            <span className="text-orange-400 font-bold">{horizonDays} days</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={horizonDays}
            onChange={(e) => setHorizonDays(Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between font-mono mb-1.5">
            <span className="text-slate-400">Quote Pool Depth</span>
            <span className="text-orange-400 font-bold">${fmtCompact(poolDepth, "")}</span>
          </div>
          <input
            type="range"
            min="200000"
            max="5000000"
            step="100000"
            value={poolDepth}
            onChange={(e) => setPoolDepth(Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Projected KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-semibold uppercase">Projected Buybacks</div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {fmtCompact(sim.totalBuybacks)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Over {horizonDays} days</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-semibold uppercase">EMBER Removed</div>
          <div className="text-xl font-bold font-mono text-orange-400 mt-1">
            {fmtCompact(sim.emberRemoved, "")}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">{fmtNum(sim.supplyCutPct, 2)}% of supply</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-semibold uppercase">Price Floor (Supply)</div>
          <div className="text-xl font-bold font-mono text-green-400 mt-1">
            ${fmtNum(sim.floorPrice, 4)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            +{fmtNum(((sim.floorPrice - (price || 0.03)) / (price || 0.03)) * 100, 1)}%
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-semibold uppercase">Price Ceiling (AMM)</div>
          <div className="text-xl font-bold font-mono text-green-400 mt-1">
            ${fmtNum(sim.ceilingPrice, 4)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            +{fmtNum(((sim.ceilingPrice - (price || 0.03)) / (price || 0.03)) * 100, 0)}%
          </div>
        </div>
      </div>
    </section>
  );
}
