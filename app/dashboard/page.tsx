"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Plus } from 'lucide-react';

const user = {
  name: "Yung Bali",
};

const stats = [
  {
    label: "Total Royalties",
    value: "$15,231.89",
    trend: "+20.1% from last month",
    trendDirection: "up",
    chartData: [62, 65, 58, 72, 78, 85, 92]
  },
  {
    label: "New Registrations",
    value: "+2,350",
    trend: "+180.1% from last month",
    trendDirection: "up",
    chartData: [45, 52, 48, 61, 55, 67, 73]
  },
  {
    label: "Songs Registered",
    value: "245",
    trend: "+8.2% from last month",
    trendDirection: "up",
    chartData: [230, 235, 238, 242, 245]
  },
  {
    label: "Active Writers",
    value: "28",
    trend: "+4 this month",
    trendDirection: "up",
    chartData: [24, 25, 26, 27, 28]
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

const keyMetrics = ["Performance", "Mechanical", "Sync", "Public Performance"];

export default function DashboardPage() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("Last 30 days");

  const renderTrendIcon = (direction) => {
    return direction === "up" ? 
      <ArrowUp className="h-4 w-4" style={{ color: "#8B7355" }} /> : 
      <ArrowDown className="h-4 w-4" style={{ color: "#DC6B19" }} />;
  };

  const MiniChart = ({ data }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = range === 0 ? 50 : ((max - value) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="80" height="40" className="mt-2">
        <polyline
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="p-8" style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-sans)" }}>
      {/* Header with Breadcrumbs */}
      <header className="mb-8">
        <nav className="mb-4">
          <span style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>
            Dashboard / Overview
          </span>
        </nav>
        <div className="flex justify-between items-center">
          <div>
            <h1 style={{ 
              fontSize: "var(--font-size-title)", 
              fontWeight: "var(--font-weight-bold)", 
              color: "var(--color-foreground)",
              lineHeight: "var(--line-height-tight)"
            }}>
              Welcome back, {user.name}!
            </h1>
            <p style={{ 
              fontSize: "var(--font-size-body)", 
              color: "var(--icon-color)",
              lineHeight: "var(--line-height-normal)"
            }}>
              Here's what's happening with your music today
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              style={{ 
                borderRadius: "var(--radius-medium)",
                border: `1px solid var(--color-border)`,
                backgroundColor: "transparent"
              }}
            >
              Export
            </Button>
            <Button 
              style={{ 
                borderRadius: "var(--radius-medium)",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-foreground)"
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Cards Summary */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card 
              key={stat.label} 
              className="group transition-all duration-200 hover:shadow-lg" 
              style={{ 
                borderRadius: "var(--radius-large)", 
                boxShadow: "var(--shadow-card)",
                border: `1px solid var(--color-border)`,
                backgroundColor: "var(--color-card)"
              }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p 
                      style={{ 
                        fontSize: "var(--font-size-caption)", 
                        fontWeight: "var(--font-weight-medium)", 
                        color: "var(--icon-color)",
                        marginBottom: "8px"
                      }}
                    >
                      {stat.label}
                    </p>
                    <div 
                      style={{ 
                        fontSize: "28px", 
                        fontWeight: "var(--font-weight-bold)", 
                        color: "var(--color-foreground)",
                        lineHeight: "1"
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                  <MiniChart data={stat.chartData} />
                </div>
                <div className="flex items-center space-x-1">
                  {renderTrendIcon(stat.trendDirection)}
                  <span 
                    style={{ 
                      color: stat.trendDirection === "up" ? 'var(--color-primary)' : '#DC6B19', 
                      fontSize: "var(--font-size-caption)", 
                      fontWeight: "var(--font-weight-medium)" 
                    }}
                  >
                    {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Analytics Graph Placeholder */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 
            style={{ 
              fontSize: "var(--font-size-heading)", 
              fontWeight: "var(--font-weight-bold)", 
              color: "var(--color-foreground)" 
            }}
          >
            Analytics Overview
          </h2>
          {/* Time Range Selector */}
          <div className="flex space-x-2">
            {timeFilters.map((filter) => (
              <Button 
                key={filter}
                variant={selectedTimeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeFilter(filter)}
                style={{ 
                  borderRadius: "var(--radius-large)",
                  fontSize: "var(--font-size-caption)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: selectedTimeFilter === filter ? "var(--color-accent)" : "transparent",
                  color: selectedTimeFilter === filter ? "var(--color-foreground)" : "var(--icon-color)",
                  border: `1px solid var(--color-border)`
                }}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Chart Area */}
        <Card 
          style={{ 
            borderRadius: "var(--radius-large)", 
            boxShadow: "var(--shadow-card)",
            border: `1px solid var(--color-border)`
          }}
        >
          <CardContent className="p-6">
            <div 
              className="h-64 flex items-center justify-center"
              style={{ 
                backgroundColor: "var(--color-highlight)",
                borderRadius: "var(--radius-medium)",
                color: "var(--icon-color)"
              }}
            >
              <p style={{ fontSize: "var(--font-size-body)" }}>
                Chart visualization will be implemented here
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tag Filters */}
      <section className="mb-8">
        <h3 
          style={{ 
            fontSize: "var(--font-size-heading)", 
            fontWeight: "var(--font-weight-bold)", 
            color: "var(--color-foreground)",
            marginBottom: "16px"
          }}
        >
          Key Metrics
        </h3>
        <div className="flex flex-wrap gap-3">
          {keyMetrics.map((metric) => (
            <Button 
              key={metric}
              variant="outline"
              size="sm"
              style={{ 
                borderRadius: "var(--radius-large)",
                fontSize: "var(--font-size-caption)",
                fontWeight: "var(--font-weight-medium)",
                backgroundColor: "transparent",
                color: "var(--color-foreground)",
                border: `1px solid var(--color-border)`,
                padding: "8px 16px"
              }}
            >
              {metric}
            </Button>
          ))}
        </div>
      </section>

      {/* Two Column Layout for Additional Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Goal Card */}
        <Card style={{ 
          borderRadius: "var(--radius-large)", 
          boxShadow: "var(--shadow-card)",
          border: `1px solid var(--color-border)`,
          backgroundColor: "var(--color-card)"
        }}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 style={{ 
                  fontSize: "var(--font-size-heading)", 
                  fontWeight: "var(--font-weight-bold)", 
                  color: "var(--color-foreground)",
                  marginBottom: "4px"
                }}>
                  Monthly Goal
                </h3>
                <p style={{ 
                  fontSize: "var(--font-size-caption)", 
                  color: "var(--icon-color)"
                }}>
                  Set your monthly royalty target
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                style={{ 
                  borderRadius: "var(--radius-medium)",
                  fontSize: "var(--font-size-caption)"
                }}
              >
                Set Goal
              </Button>
            </div>
            <div className="text-center mb-4">
              <div style={{ 
                fontSize: "48px", 
                fontWeight: "var(--font-weight-bold)", 
                color: "var(--color-foreground)",
                lineHeight: "1"
              }}>
                $25K
              </div>
              <p style={{ 
                fontSize: "var(--font-size-caption)", 
                color: "var(--icon-color)",
                marginTop: "4px"
              }}>
                TARGET/MONTH
              </p>
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end justify-center space-x-1 h-16">
              {[40, 60, 35, 80, 45, 70, 55, 90, 65, 75, 50, 85].map((height, i) => (
                <div 
                  key={i}
                  className="w-2 rounded-sm" 
                  style={{ 
                    height: `${height}%`, 
                    backgroundColor: i === 5 ? 'var(--color-primary)' : 'var(--color-muted)'
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Add Form Card */}
        <Card style={{ 
          borderRadius: "var(--radius-large)", 
          boxShadow: "var(--shadow-card)",
          border: `1px solid var(--color-border)`,
          backgroundColor: "var(--color-card)"
        }}>
          <CardContent className="p-6">
            <h3 style={{ 
              fontSize: "var(--font-size-heading)", 
              fontWeight: "var(--font-weight-bold)", 
              color: "var(--color-foreground)",
              marginBottom: "16px"
            }}>
              Quick Add
            </h3>
            <div className="space-y-4">
              <div>
                <label style={{ 
                  fontSize: "var(--font-size-caption)", 
                  fontWeight: "var(--font-weight-medium)", 
                  color: "var(--color-foreground)",
                  marginBottom: "4px",
                  display: "block"
                }}>
                  Song Title
                </label>
                <input 
                  placeholder="Enter song title..."
                  style={{ 
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "var(--radius-medium)",
                    border: `1px solid var(--color-border)`,
                    fontSize: "var(--font-size-body)"
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  fontSize: "var(--font-size-caption)", 
                  fontWeight: "var(--font-weight-medium)", 
                  color: "var(--color-foreground)",
                  marginBottom: "4px",
                  display: "block"
                }}>
                  Writer Name
                </label>
                <input 
                  placeholder="Enter writer name..."
                  style={{ 
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "var(--radius-medium)",
                    border: `1px solid var(--color-border)`,
                    fontSize: "var(--font-size-body)"
                  }}
                />
              </div>
              <Button 
                className="w-full"
                style={{ 
                  borderRadius: "var(--radius-medium)",
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-primary-foreground)",
                  marginTop: "16px"
                }}
              >
                Add Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <section>
        <h3 
          style={{ 
            fontSize: "var(--font-size-heading)", 
            fontWeight: "var(--font-weight-bold)", 
            color: "var(--color-foreground)",
            marginBottom: "16px"
          }}
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="flex items-center justify-center py-6"
            style={{ 
              borderRadius: "var(--radius-medium)",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              fontSize: "var(--font-size-body)",
              fontWeight: "var(--font-weight-medium)"
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Song
          </Button>
          <Button 
            variant="outline"
            className="flex items-center justify-center py-6"
            style={{ 
              borderRadius: "var(--radius-medium)",
              backgroundColor: "transparent",
              color: "var(--color-foreground)",
              fontSize: "var(--font-size-body)",
              fontWeight: "var(--font-weight-medium)",
              border: `1px solid var(--color-border)`
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Writer
          </Button>
          <Button 
            variant="outline"
            className="flex items-center justify-center py-6"
            style={{ 
              borderRadius: "var(--radius-medium)",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-foreground)",
              fontSize: "var(--font-size-body)",
              fontWeight: "var(--font-weight-medium)",
              border: `1px solid var(--color-border)`
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </section>
    </div>
  );
}
