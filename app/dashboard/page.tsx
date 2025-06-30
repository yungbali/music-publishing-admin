"use client";
import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  // Placeholder user info
  const user = {
    name: "Yung Bali",
    avatar: "/placeholder-user.jpg"
  };

  // Sidebar navigation items
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "🏠" },
    { label: "Writers", href: "#", icon: "≡" },
    { label: "Songs", href: "#", icon: "🔗" },
    { label: "Gigs", href: "#", icon: "🎤" },
    { label: "Opportunities", href: "#", icon: "💡" },
    { label: "Syncs", href: "#", icon: "🔄" },
    { label: "Royalties", href: "#", icon: "📈" },
    { label: "Statements", href: "#", icon: "📄" },
    { label: "Broadcasts", href: "#", icon: "📡" },
    { label: "Account Settings", href: "#", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Sidebar */}
      <aside className="flex flex-col py-8" style={{ background: "var(--color-sidebar)", width: "260px" }}>
        <div className="mb-12 flex justify-center">
          {/* Logo */}
          <span className="text-3xl font-bold" style={{ color: "var(--color-sidebar-foreground)" }}>OS</span>
        </div>
        <nav className="flex-1">
          {navItems.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-6 py-3 font-bold mb-1`}
              style={{
                color: "var(--color-sidebar-foreground)",
                background: idx === 0 ? "var(--color-sidebar-primary)" : undefined,
                borderRadius: "var(--radius-lg)"
              }}
            >
              <span className="mr-3">{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className="flex-1 p-8 mx-auto"
        style={{
          background: "var(--color-background)",
          maxWidth: "1200px"
        }}
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-foreground)" }}>
            Welcome back, {user.name}!
          </h1>
          <div className="flex items-center space-x-3">
            <span className="font-bold" style={{ color: "var(--color-foreground)" }}>{user.name}</span>
            <img src={user.avatar} alt="User" className="rounded-full w-10 h-10" />
          </div>
        </header>

        {/* Stats Cards */}
        <div className="flex gap-6 mb-8">
          <div
            className="p-6 flex-1 text-center shadow"
            style={{
              background: "var(--color-card)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-card-foreground)"
            }}
          >
            <div className="font-bold text-lg mb-2">Song suggestions</div>
            <div>(Loading...)</div>
          </div>
          <div
            className="p-6 flex-1 text-center shadow"
            style={{
              background: "var(--color-card)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-card-foreground)"
            }}
          >
            <div className="font-bold text-lg mb-2">Last writer added</div>
            <div>(Loading...)</div>
          </div>
          <div
            className="p-6 flex-1 text-center shadow"
            style={{
              background: "var(--color-card)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-card-foreground)"
            }}
          >
            <div className="font-bold text-lg mb-2">Last song added</div>
            <div>(Loading...)</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mb-8">
          <button
            className="font-bold px-6 py-4"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              borderRadius: "var(--radius-lg)"
            }}
          >
            Add a New Song
          </button>
          <button
            className="font-bold px-6 py-4"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              borderRadius: "var(--radius-lg)"
            }}
          >
            Add a New Writer
          </button>
          <button
            className="font-bold px-6 py-4"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              borderRadius: "var(--radius-lg)"
            }}
          >
            Create a New Gig Claim
          </button>
        </div>

        {/* Recent Opportunities */}
        <section>
          <h2 className="font-bold text-xl mb-4" style={{ color: "var(--color-foreground)" }}>
            Recent Opportunities
          </h2>
          <div className="flex gap-6">
            <div
              className="shadow p-4 flex items-center"
              style={{
                background: "var(--color-card)",
                borderRadius: "var(--radius-lg)"
              }}
            >
              <span
                className="px-3 py-1 text-xs mr-2"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-accent-foreground)",
                  borderRadius: "8px"
                }}
              >
                News
              </span>
              <span>Broadcast Opportunity</span>
            </div>
            <div
              className="shadow p-4 flex items-center"
              style={{
                background: "var(--color-card)",
                borderRadius: "var(--radius-lg)"
              }}
            >
              <span
                className="px-3 py-1 text-xs mr-2"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-accent-foreground)",
                  borderRadius: "8px"
                }}
              >
                Sync
              </span>
              <span>Indie Pop for Rom Com</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
