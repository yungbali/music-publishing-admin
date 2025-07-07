"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const user = {
  name: "Yung Bali",
};

const stats = [
  {
    label: "Total Royalties",
    value: "$4,820.50",
    trend: "+12.5%",
    trendDirection: "up"
  },
  {
    label: "Streams",
    value: "1.2M",
    trend: "+8.2%",
    trendDirection: "up"
  },
  {
    label: "Songs Registered",
    value: "245",
    trend: "-1.8%",
    trendDirection: "down"
  },
  {
    label: "Sync Opportunities",
    value: "12",
    trend: "+20%",
    trendDirection: "up"
  }
];

const chartData = [
  { date: 'Jan', value: 2400 },
  { date: 'Feb', value: 1398 },
  { date: 'Mar', value: 9800 },
  { date: 'Apr', value: 3908 },
  { date: 'May', value: 4800 },
  { date: 'Jun', value: 3800 },
  { date: 'Jul', value: 4300 },
];

const timeFilters = ["Last 7 days", "Last 30 days", "Last 3 months"];

  return (
    <AnimatedContent className="flex-1 p-8 mx-auto" style={{ background: "var(--color-background)", maxWidth: "1200px" }}>
      {/* Header */}
      <header className="flex justify-between items-center mb-8 pb-6" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div>
          <SplitText as="h1" className="text-3xl font-bold mb-2" style={{ color: "var(--color-foreground)" }}>
            {`Welcome back, ${user.name}!`}
          </SplitText>
          <p style={{ color: "var(--color-muted-foreground)" }}>Here's what's happening with your music today</p>
        </div>
        <div className="flex items-center space-x-3 px-4 py-2" style={{ background: "var(--color-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" }}>
          <span className="font-medium" style={{ color: "var(--color-foreground)" }}>{user.name}</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)" }}>
            {user.name.charAt(0)}
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BounceCard className="">
          <div
            className="p-6 text-center border transition-all hover:shadow-md"
            style={{
              background: "var(--color-card)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-card-foreground)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--color-primary)" }}>12</div>
            <div className="font-medium text-sm" style={{ color: "var(--color-muted-foreground)" }}>Song Suggestions</div>
          </div>
        </BounceCard>
        <BounceCard className="">
          <div
            className="p-6 text-center border transition-all hover:shadow-md"
            style={{
              background: "var(--color-card)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-card-foreground)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--color-primary)" }}>3</div>
            <div className="font-medium text-sm" style={{ color: "var(--color-muted-foreground)" }}>Writers Added</div>
          </div>
        </BounceCard>
        <BounceCard className="">
          <div
            className="p-6 text-center border transition-all hover:shadow-md"
            style={{
              background: "var(--color-card)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-card-foreground)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--color-primary)" }}>25</div>
            <div className="font-medium text-sm" style={{ color: "var(--color-muted-foreground)" }}>Songs Registered</div>
          </div>
        </BounceCard>
      </div>

      {/* Action Buttons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-foreground)" }}>Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="font-medium px-6 py-4 transition-all hover:shadow-md border"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              borderRadius: "var(--radius-lg)",
              borderColor: "var(--color-primary)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            + Add New Song
          </button>
          <button
            className="font-medium px-6 py-4 transition-all hover:shadow-md border"
            style={{
              background: "var(--color-secondary)",
              color: "var(--color-secondary-foreground)",
              borderRadius: "var(--radius-lg)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            + Add New Writer
          </button>
          <button
            className="font-medium px-6 py-4 transition-all hover:shadow-md border"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-accent-foreground)",
              borderRadius: "var(--radius-lg)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            + Create Gig Claim
          </button>
        </div>
      </section>

      {/* Recent Opportunities */}
      <section>
        <BlurText as="h2" className="text-xl font-semibold mb-4" style={{ color: "var(--color-foreground)" }}>
          Recent Opportunities
        </BlurText>
        <AnimatedList items={opportunities}>
          {(item, i) => (
            <BounceCard key={i} className="mb-4">
              <div
                className="p-4 flex items-center justify-between border transition-all hover:shadow-md"
                style={{
                  background: "var(--color-card)",
                  borderRadius: "var(--radius-lg)",
                  borderColor: "var(--color-border)",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div className="flex items-center">
                  <span
                    className="px-3 py-1 text-xs font-medium mr-3"
                    style={{
                      background: item.type === 'News' ? "var(--color-chart-1)" : "var(--color-chart-2)",
                      color: "var(--color-primary-foreground)",
                      borderRadius: "var(--radius-md)"
                    }}
                  >
                    {item.type}
                  </span>
                  <span className="font-medium" style={{ color: "var(--color-foreground)" }}>{item.text}</span>
                </div>
                <button 
                  className="px-3 py-1 text-sm font-medium transition-colors"
                  style={{
                    background: "var(--color-secondary)",
                    color: "var(--color-secondary-foreground)",
                    borderRadius: "var(--radius-sm)"
                  }}
                >
                  View
                </button>
              </div>
            </BounceCard>
          )}
        </AnimatedList>
      </section>
    </AnimatedContent>
  );
}
