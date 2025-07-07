"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, Archive } from 'lucide-react';

export default function StatementsPage() {
  const features = [
    {
      icon: <FileText className="h-6 w-6" style={{ color: "var(--color-primary)" }} />,
      title: "Statement Templates",
      description: "Build customizable statement templates"
    },
    {
      icon: <Calendar className="h-6 w-6" style={{ color: "var(--color-primary)" }} />,
      title: "Batch Delivery",
      description: "Schedule batch statement delivery"
    },
    {
      icon: <Archive className="h-6 w-6" style={{ color: "var(--color-primary)" }} />,
      title: "Historical Archive",
      description: "Archive all historical statements for audit"
    }
  ];

  return (
    <div className="p-8" style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-sans)" }}>
      {/* Header */}
      <header className="mb-8">
        <nav className="mb-4">
          <span style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>
            Dashboard / Statements
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
              Issue payments and reports
            </h1>
            <p style={{ 
              fontSize: "var(--font-size-body)", 
              color: "var(--icon-color)",
              lineHeight: "var(--line-height-normal)"
            }}>
              Send clear statements to rights holders
            </p>
          </div>
          <Button 
            style={{ 
              borderRadius: "var(--radius-medium)",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-foreground)"
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Statement
          </Button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="mb-8">
        <h2 style={{ 
          fontSize: "var(--font-size-heading)", 
          fontWeight: "var(--font-weight-bold)", 
          color: "var(--color-foreground)",
          marginBottom: "16px"
        }}>
          Available Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              style={{ 
                backgroundColor: "var(--color-card)", 
                borderRadius: "var(--radius-large)", 
                boxShadow: "var(--shadow-card)",
                border: `1px solid var(--color-border)`
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: "var(--font-size-heading)", 
                  fontWeight: "var(--font-weight-bold)", 
                  color: "var(--color-foreground)",
                  marginBottom: "8px"
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  fontSize: "var(--font-size-body)", 
                  color: "var(--icon-color)"
                }}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Coming Soon Message */}
      <Card style={{ 
        backgroundColor: "var(--color-muted)", 
        borderRadius: "var(--radius-medium)", 
        border: `1px solid var(--color-border)`
      }}>
        <CardContent className="p-6 text-center">
          <h3 style={{ 
            fontSize: "var(--font-size-heading)", 
            fontWeight: "var(--font-weight-bold)", 
            color: "var(--color-foreground)",
            marginBottom: "8px"
          }}>
            Coming Soon
          </h3>
          <p style={{ 
            fontSize: "var(--font-size-body)", 
            color: "var(--icon-color)"
          }}>
            The statements feature is currently under development. You'll be able to preview, approve, and schedule statement delivery soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
