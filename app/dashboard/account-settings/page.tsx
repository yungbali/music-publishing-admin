"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Shield, Palette, Link as LinkIcon, Save } from 'lucide-react';

export default function AccountSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Yung Bali",
    email: "yung@example.com",
    company: "Afromuse Digital",
    role: "Administrator"
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    royaltyAlerts: true,
    weeklyReports: false
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const settingsSections = [
    {
      icon: <User className="h-6 w-6" style={{ color: "var(--color-primary)" }} />,
      title: "Profile Settings",
      description: "Manage your personal information"
    },
    {
      icon: <Bell className="h-6 w-6" style={{ color: "var(--color-primary)" }} />,
      title: "Notifications",
      description: "Control email and alert preferences"
    },
    {
      icon: <Shield className="h-6 w-6" style={{ color: "var(--color-primary)" }} />,
      title: "Security",
      description: "Password and security settings"
    },
    {
      icon: <Palette className="h-6 w-6" style={{ color: "var(--color-primary)" }} />,
      title: "Appearance",
      description: "Customize your workspace theme"
    },
    {
      icon: <LinkIcon className="h-6 w-6" style={{ color: "var(--color-primary)" }} />,
      title: "Integrations",
      description: "Connect external services and APIs"
    }
  ];

  return (
    <div className="p-8" style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-sans)" }}>
      {/* Header */}
      <header className="mb-8">
        <nav className="mb-4">
          <span style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>
            Dashboard / Account Settings
          </span>
        </nav>
        <div>
          <h1 style={{ 
            fontSize: "var(--font-size-title)", 
            fontWeight: "var(--font-weight-bold)", 
            color: "var(--color-foreground)",
            lineHeight: "var(--line-height-tight)",
            marginBottom: "8px"
          }}>
            Configure your workspace
          </h1>
          <p style={{ 
            fontSize: "var(--font-size-body)", 
            color: "var(--icon-color)",
            lineHeight: "var(--line-height-normal)"
          }}>
            Control users, roles, and preferences
          </p>
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Profile Settings Card */}
        <Card style={{ 
          borderRadius: "var(--radius-large)", 
          boxShadow: "var(--shadow-card)",
          border: `1px solid var(--color-border)`,
          backgroundColor: "var(--color-card)"
        }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
              <span style={{ 
                fontSize: "var(--font-size-heading)", 
                fontWeight: "var(--font-weight-bold)", 
                color: "var(--color-foreground)"
              }}>
                Profile Information
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label style={{ 
                fontSize: "var(--font-size-caption)", 
                fontWeight: "var(--font-weight-medium)", 
                color: "var(--color-foreground)",
                marginBottom: "4px",
                display: "block"
              }}>
                Full Name
              </label>
              <input 
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
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
                Email Address
              </label>
              <input 
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
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
                Company
              </label>
              <input 
                value={profile.company}
                onChange={(e) => handleProfileChange('company', e.target.value)}
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
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings Card */}
        <Card style={{ 
          borderRadius: "var(--radius-large)", 
          boxShadow: "var(--shadow-card)",
          border: `1px solid var(--color-border)`,
          backgroundColor: "var(--color-card)"
        }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
              <span style={{ 
                fontSize: "var(--font-size-heading)", 
                fontWeight: "var(--font-weight-bold)", 
                color: "var(--color-foreground)"
              }}>
                Notification Preferences
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p style={{ 
                  fontSize: "var(--font-size-body)", 
                  fontWeight: "var(--font-weight-medium)", 
                  color: "var(--color-foreground)"
                }}>
                  Email Updates
                </p>
                <p style={{ 
                  fontSize: "var(--font-size-caption)", 
                  color: "var(--icon-color)"
                }}>
                  Receive general updates via email
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={notifications.emailUpdates}
                onChange={(e) => handleNotificationChange('emailUpdates', e.target.checked)}
                style={{ width: "16px", height: "16px" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ 
                  fontSize: "var(--font-size-body)", 
                  fontWeight: "var(--font-weight-medium)", 
                  color: "var(--color-foreground)"
                }}>
                  Royalty Alerts
                </p>
                <p style={{ 
                  fontSize: "var(--font-size-caption)", 
                  color: "var(--icon-color)"
                }}>
                  Get notified about new royalty payments
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={notifications.royaltyAlerts}
                onChange={(e) => handleNotificationChange('royaltyAlerts', e.target.checked)}
                style={{ width: "16px", height: "16px" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ 
                  fontSize: "var(--font-size-body)", 
                  fontWeight: "var(--font-weight-medium)", 
                  color: "var(--color-foreground)"
                }}>
                  Weekly Reports
                </p>
                <p style={{ 
                  fontSize: "var(--font-size-caption)", 
                  color: "var(--icon-color)"
                }}>
                  Receive weekly summary reports
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={notifications.weeklyReports}
                onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                style={{ width: "16px", height: "16px" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Overview Grid */}
      <section>
        <h2 style={{ 
          fontSize: "var(--font-size-heading)", 
          fontWeight: "var(--font-weight-bold)", 
          color: "var(--color-foreground)",
          marginBottom: "16px"
        }}>
          Additional Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {settingsSections.slice(2).map((section, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: "var(--color-card)", 
                borderRadius: "var(--radius-large)", 
                boxShadow: "var(--shadow-card)",
                border: `1px solid var(--color-border)`
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {section.icon}
                </div>
                <h3 style={{ 
                  fontSize: "var(--font-size-heading)", 
                  fontWeight: "var(--font-weight-bold)", 
                  color: "var(--color-foreground)",
                  marginBottom: "8px"
                }}>
                  {section.title}
                </h3>
                <p style={{ 
                  fontSize: "var(--font-size-body)", 
                  color: "var(--icon-color)"
                }}>
                  {section.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  style={{ borderRadius: "var(--radius-medium)" }}
                >
                  Configure
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
