"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Users, Music, FileText, Settings, Search, HelpCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Writers", href: "/dashboard/writers", icon: Users },
  { label: "Songs", href: "/dashboard/songs", icon: Music },
  { label: "Statements", href: "/dashboard/statements", icon: FileText },
  { label: "Account Settings", href: "/dashboard/account-settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "var(--font-sans)", backgroundColor: "var(--color-background)" }}>
      {/* Sidebar */}
      <aside 
        className="fixed left-0 top-0 h-full flex flex-col py-6 px-4" 
        style={{ 
          width: "260px", 
          backgroundColor: "var(--color-background)", 
          borderRight: `1px solid var(--color-border)`,
          boxShadow: "var(--shadow-card)"
        }}
      >
        {/* Company Logo & Name */}
        <div className="mb-8 px-2">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center" 
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <Music className="h-6 w-6" style={{ color: "var(--color-foreground)" }} />
            </div>
            <div>
              <h1 
                className="font-bold" 
                style={{ 
                  fontSize: "var(--font-size-heading)", 
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-foreground)"
                }}
              >
                RoyaltyFlow
              </h1>
              <p 
                style={{ 
                  fontSize: "var(--font-size-caption)", 
                  color: "var(--icon-color)"
                }}
              >
                Publishing Admin
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center px-3 py-2 transition-all duration-200"
                style={{
                  color: isActive ? "var(--color-foreground)" : "var(--icon-color)",
                  backgroundColor: isActive ? "var(--color-accent)" : "transparent",
                  borderRadius: "var(--radius-medium)",
                  fontSize: "var(--font-size-body)",
                  fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)"
                }}
              >
                <item.icon className="mr-3 h-4 w-4" style={{ color: isActive ? "var(--color-foreground)" : "var(--icon-color)" }} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Summary */}
        <div 
          className="p-3 mb-4" 
          style={{ 
            backgroundColor: "var(--color-highlight)", 
            borderRadius: "var(--radius-medium)"
          }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <span style={{ fontSize: "var(--font-size-caption)", fontWeight: "var(--font-weight-bold)" }}>YB</span>
            </div>
            <div>
              <p style={{ fontSize: "var(--font-size-body)", fontWeight: "var(--font-weight-medium)" }}>Yung Bali</p>
              <p style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>Premium Plan</p>
            </div>
          </div>
        </div>

        {/* Settings / Help / Search */}
        <div className="space-y-2">
          <button 
            className="w-full flex items-center px-3 py-2 transition-all duration-200 hover:bg-gray-50" 
            style={{ 
              borderRadius: "var(--radius-medium)",
              fontSize: "var(--font-size-body)",
              color: "var(--icon-color)"
            }}
          >
            <Search className="mr-3 h-4 w-4" />
            Search
          </button>
          <button 
            className="w-full flex items-center px-3 py-2 transition-all duration-200 hover:bg-gray-50" 
            style={{ 
              borderRadius: "var(--radius-medium)",
              fontSize: "var(--font-size-body)",
              color: "var(--icon-color)"
            }}
          >
            <HelpCircle className="mr-3 h-4 w-4" />
            Help
          </button>
          <button
            onClick={() => {
              localStorage.setItem("isAuthenticated", "false");
              router.push("/");
            }}
            className="w-full flex items-center px-3 py-2 transition-all duration-200 hover:bg-red-50"
            style={{
              borderRadius: "var(--radius-medium)",
              fontSize: "var(--font-size-body)",
              color: "#dc2626"
            }}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1" style={{ marginLeft: "260px", backgroundColor: "var(--color-background)" }}>{children}</main>
    </div>
  );
} 