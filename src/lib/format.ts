export function fmtNum(num: number | undefined | null, digits = 2): string {
  if (num === undefined || num === null || isNaN(num)) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(num);
}

export function fmtCompact(num: number | undefined | null, prefix = "$"): string {
  if (num === undefined || num === null || isNaN(num)) return "—";
  if (num >= 1_000_000_000) return `${prefix}${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${prefix}${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${prefix}${(num / 1_000).toFixed(1)}K`;
  return `${prefix}${num.toFixed(2)}`;
}
