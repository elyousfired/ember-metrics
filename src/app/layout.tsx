import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ember.fyi: $EMBER metrics, scored live",
  description:
    "Live, source-linked metrics for $EMBER, the platform token of the Ember launchpad on Solana: supply and burns, revenue-funded buybacks, pool depth, demand, and a bull-case scorecard. Unofficial.",
  openGraph: {
    title: "ember.fyi: $EMBER metrics, scored live",
    description: "Live, source-linked metrics for $EMBER, the platform token of the Ember launchpad on Solana",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0b0e14] text-slate-100 antialiased selection:bg-orange-500/30 selection:text-orange-200">
        {children}
      </body>
    </html>
  );
}
