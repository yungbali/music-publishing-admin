"use client";
import React, { useEffect, useState } from "react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import Link from "next/link";
import { getRoyalties, getSongs } from "@/lib/dashboardServices";
import { Royalty, Song } from "@/lib/types";

const timeRanges = [
  { label: "Last 3 months", value: 3 },
  { label: "Last 30 days", value: 1 },
  { label: "Last 7 days", value: 0.25 },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function StatCard({ label, value, sublabel }: { label: string; value: string | number; sublabel?: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white flex flex-col justify-between min-w-[180px] shadow-sm">
      <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {sublabel && <div className="text-xs text-gray-400 mt-1">{sublabel}</div>}
    </div>
  );
}

function BarChartCard({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
      <div className="text-sm font-semibold text-gray-700 mb-2">Royalties by Song</div>
      <svg width="100%" height={220} viewBox={`0 0 ${labels.length * 50} 220`} style={{ background: "#f8fafc", borderRadius: 12 }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <line
            key={i}
            x1={0}
            x2={labels.length * 50}
            y1={220 - t * 160 - 40}
            y2={220 - t * 160 - 40}
            stroke="#e5e7eb"
            strokeDasharray="4 2"
          />
        ))}
        {data.map((value, i) => (
          <g key={i}>
            <rect
              x={i * 50 + 10}
              y={220 - (value / max) * 160 - 40}
              width={30}
              height={(value / max) * 160}
              fill="url(#barGradient)"
              rx={6}
            />
            <text x={i * 50 + 25} y={210} textAnchor="middle" fontSize={12} fill="#888">
              {labels[i].length > 8 ? labels[i].slice(0, 8) + "…" : labels[i]}
            </text>
            <text x={i * 50 + 25} y={220 - (value / max) * 160 - 50} textAnchor="middle" fontSize={12} fill="#222">
              {value.toLocaleString()}
            </text>
          </g>
        ))}
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e0e7ef" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function LineChartCard({ points, labels }: { points: { x: number; y: number }[]; labels: string[] }) {
  if (points.length === 0) return null;
  const maxY = Math.max(...points.map(p => p.y), 1);
  const width = Math.max(points.length * 50, 300);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${i * 50 + 25},${220 - (p.y / maxY) * 160 - 40}`).join(" ");
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm mt-6">
      <div className="text-sm font-semibold text-gray-700 mb-2">Royalties Over Time</div>
      <svg width="100%" height={220} viewBox={`0 0 ${width} 220`} style={{ background: "#f8fafc", borderRadius: 12 }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <line
            key={i}
            x1={0}
            x2={width}
            y1={220 - t * 160 - 40}
            y2={220 - t * 160 - 40}
            stroke="#e5e7eb"
            strokeDasharray="4 2"
          />
        ))}
        <path d={path} fill="none" stroke="#6366f1" strokeWidth={3} />
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e0e7ef" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <polygon
          points={points.map((p, i) => `${i * 50 + 25},${220 - (p.y / maxY) * 160 - 40}`).join(" ") + ` ${width - 25},220 25,220`}
          fill="url(#areaGradient)"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={i * 50 + 25}
            cy={220 - (p.y / maxY) * 160 - 40}
            r={5}
            fill="#6366f1"
          />
        ))}
        {labels.map((label, i) => (
          <text key={i} x={i * 50 + 25} y={210} textAnchor="middle" fontSize={12} fill="#888">
            {label.length > 8 ? label.slice(0, 8) + "…" : label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function RoyaltiesPage() {
  const [royalties, setRoyalties] = useState<Royalty[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedRange, setSelectedRange] = useState(timeRanges[0].value);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRoyalties(getRoyalties());
    setSongs(getSongs());
    setLoaded(true);
  }, []);

  // Aggregate royalties per song
  const royaltiesBySong: { [songId: string]: number } = {};
  royalties.forEach(r => {
    royaltiesBySong[r.songId] = (royaltiesBySong[r.songId] || 0) + r.amount;
  });
  const songLabels = Object.keys(royaltiesBySong).map(id => songs.find(s => s.id === id)?.title || "Unknown");
  const songTotals = Object.values(royaltiesBySong);

  // Aggregate royalties over time (by month)
  const now = new Date();
  const royaltiesByMonth: { [month: string]: number } = {};
  royalties.forEach(r => {
    const month = r.date.slice(0, 7); // YYYY-MM
    const dateObj = new Date(month + "-01");
    const monthsAgo = (now.getFullYear() - dateObj.getFullYear()) * 12 + (now.getMonth() - dateObj.getMonth());
    if (monthsAgo <= selectedRange * 12) {
      royaltiesByMonth[month] = (royaltiesByMonth[month] || 0) + r.amount;
    }
  });
  const monthLabels = Object.keys(royaltiesByMonth).sort();
  const monthPoints = monthLabels.map((m, i) => ({ x: i, y: royaltiesByMonth[m] }));

  // Stat cards
  const totalRoyalties = royalties.reduce((sum, r) => sum + r.amount, 0);
  const numSongs = songs.length;
  const numStatements = new Set(royalties.map(r => r.date.slice(0, 7))).size;

  if (!loaded) {
    return <AnimatedContent className="max-w-5xl mx-auto py-8">Loading...</AnimatedContent>;
  }

  return (
    <AnimatedContent className="max-w-5xl mx-auto py-8">
      <Link href="/dashboard" className="text-blue-600">&larr; Back to Dashboard</Link>
      <BlurText as="h1" className="text-2xl font-bold mb-4" style={{ color: "var(--color-foreground)" }}>
        Collect and reconcile income
      </BlurText>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Royalties" value={formatCurrency(totalRoyalties)} sublabel="All time" />
        <StatCard label="Number of Songs" value={numSongs} sublabel="Catalog size" />
        <StatCard label="Royalty Statements" value={numStatements} sublabel="Unique periods" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        {timeRanges.map(range => (
          <button
            key={range.value}
            onClick={() => setSelectedRange(range.value)}
            className={`px-4 py-1 rounded border text-sm font-medium transition-colors ${selectedRange === range.value ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
            style={{ minWidth: 120 }}
          >
            {range.label}
          </button>
        ))}
      </div>
      <LineChartCard points={monthPoints} labels={monthLabels} />
      <div className="mt-8">
        <BarChartCard data={songTotals} labels={songLabels} />
      </div>
      <div className="mt-8 mb-2 font-semibold text-gray-700">You can:</div>
      <ul className="list-disc ml-6 text-gray-500 space-y-2">
        <li>Import royalty statements from PROs and DSPs</li>
        <li>Match statements to your song catalog</li>
        <li>Drill into unpaid or disputed items</li>
        <li>Generate reconciliation reports</li>
      </ul>
    </AnimatedContent>
  );
} 