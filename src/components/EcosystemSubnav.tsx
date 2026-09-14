"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function EcosystemSubnav() {
  const pathname = usePathname();

  const links = [
    { name: "Tokens & yield", href: "/tokens" },
    { name: "Pairs", href: "/pairs" },
    { name: "Launches", href: "/launches" },
    { name: "Rewards", href: "/rewards" },
    { name: "Holders", href: "/holders" },
  ];

  return (
    <div className="border-b border-slate-800 bg-[#0d121c]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-2 h-10 overflow-x-auto text-xs font-mono scrollbar-none" aria-label="Ecosystem pages">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2 shrink-0">
          Ecosystem
        </span>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded transition shrink-0 font-medium ${
                isActive
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/30 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
