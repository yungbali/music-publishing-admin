"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Music, DollarSign, Globe, Shield, TrendingUp, Users, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function HomePage() {
  // Redirect authenticated users to /dashboard
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("isAuthenticated") === "true") {
        window.location.href = "/dashboard";
      }
    }
  }, []);

  const features = [
    {
      icon: <Globe className="h-8 w-8" style={{ color: "var(--color-primary)" }} />, 
      title: "Global Collection", 
      desc: "Collect from 200+ territories including performance, mechanical, and sync royalties"
    },
    {
      icon: <Shield className="h-8 w-8" style={{ color: "var(--color-primary)" }} />, 
      title: "Rights Protection", 
      desc: "Register and protect your copyrights with PROs and MROs worldwide"
    },
    {
      icon: <TrendingUp className="h-8 w-8" style={{ color: "var(--color-primary)" }} />, 
      title: "Detailed Analytics", 
      desc: "Track your earnings with detailed reports and real-time analytics"
    },
    {
      icon: <DollarSign className="h-8 w-8" style={{ color: "var(--color-primary)" }} />, 
      title: "Fast Payments", 
      desc: "Get paid monthly with transparent reporting and no hidden fees"
    },
    {
      icon: <Users className="h-8 w-8" style={{ color: "var(--color-primary)" }} />, 
      title: "Expert Support", 
      desc: "Dedicated support team with deep music industry expertise"
    },
    {
      icon: <Music className="h-8 w-8" style={{ color: "var(--color-primary)" }} />, 
      title: "Easy Registration", 
      desc: "Simple song registration process with bulk upload capabilities"
    }
  ];

  const stats = [
    { value: "$15.2M+", label: "Royalties Collected", trend: "+20.1%" },
    { value: "200+", label: "Territories Covered", trend: "+8.2%" },
    { value: "25K+", label: "Active Songwriters", trend: "+15.3%" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-sans)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: "var(--color-card)", borderBottom: `1px solid var(--color-border)`, boxShadow: "var(--shadow-sm)" }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center" 
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <Music className="h-6 w-6" style={{ color: "var(--color-foreground)" }} />
            </div>
            <span style={{ fontSize: "var(--font-size-title)", fontWeight: "var(--font-weight-bold)", color: "var(--color-foreground)" }}>RoyaltyFlow</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" style={{ color: "var(--icon-color)", fontSize: "var(--font-size-body)" }} className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" style={{ color: "var(--icon-color)", fontSize: "var(--font-size-body)" }} className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#about" style={{ color: "var(--icon-color)", fontSize: "var(--font-size-body)" }} className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/login">
              <Button variant="outline" style={{ borderRadius: "var(--radius-medium)" }}>Sign In</Button>
            </Link>
            <Link href="/login">
              <Button style={{ borderRadius: "var(--radius-medium)", backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)" }}>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge 
            className="mb-6" 
            style={{ 
              backgroundColor: "var(--color-accent)", 
              color: "var(--color-foreground)",
              borderRadius: "var(--radius-large)",
              padding: "8px 16px"
            }}
          >
            Collect 100% of Your Publishing Royalties
          </Badge>
          <h1 
            className="mb-6 leading-tight" 
            style={{ 
              fontSize: "48px", 
              fontWeight: "var(--font-weight-bold)", 
              color: "var(--color-foreground)",
              lineHeight: "var(--line-height-tight)"
            }}
          >
            Stop Losing Money on Uncollected Royalties
          </h1>
          <p 
            className="mb-8 leading-relaxed" 
            style={{ 
              fontSize: "var(--font-size-heading)", 
              color: "var(--icon-color)",
              lineHeight: "var(--line-height-normal)",
              maxWidth: "600px",
              margin: "0 auto 32px"
            }}
          >
            Most songwriters only collect 50% of their royalties. We help you collect both your writer share AND publisher share from over 200 territories worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button 
                size="lg" 
                style={{ 
                  borderRadius: "var(--radius-medium)",
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-primary-foreground)",
                  padding: "12px 24px"
                }}
              >
                Start Collecting Royalties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              style={{ 
                borderRadius: "var(--radius-medium)",
                border: `1px solid var(--color-border)`,
                padding: "12px 24px"
              }}
            >
              See How It Works
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
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
                  <div 
                    style={{ 
                      fontSize: "32px", 
                      fontWeight: "var(--font-weight-bold)", 
                      color: "var(--color-foreground)",
                      marginBottom: "8px"
                    }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    style={{ 
                      fontSize: "var(--font-size-body)", 
                      color: "var(--icon-color)",
                      marginBottom: "8px"
                    }}
                  >
                    {stat.label}
                  </div>
                  <div 
                    style={{ 
                      fontSize: "var(--font-size-caption)", 
                      color: "var(--color-primary)",
                      fontWeight: "var(--font-weight-medium)"
                    }}
                  >
                    {stat.trend} this year
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "var(--color-muted)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 
              style={{ 
                fontSize: "var(--font-size-title)", 
                fontWeight: "var(--font-weight-bold)", 
                color: "var(--color-foreground)",
                marginBottom: "16px"
              }}
            >
              The Publishing Royalty Problem
            </h2>
            <p 
              style={{ 
                fontSize: "var(--font-size-heading)", 
                color: "var(--icon-color)"
              }}
            >
              Your royalties are split into two parts - and most writers only collect one
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card 
              style={{ 
                backgroundColor: "var(--color-card)", 
                borderRadius: "var(--radius-large)", 
                boxShadow: "var(--shadow-card)",
                border: `1px solid var(--color-border)`
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: "var(--color-foreground)" }}>
                  <X className="h-6 w-6 mr-3" style={{ color: "#DC6B19" }} />
                  What Most Writers Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3" style={{ color: "var(--icon-color)" }}>
                  <li>• Only register as a writer with PRO (ASCAP, BMI, SESAC)</li>
                  <li>• Collect writer share only (50% of total royalties)</li>
                  <li>• Leave publisher share unclaimed</li>
                  <li>• Miss out on mechanical royalties</li>
                  <li style={{ fontWeight: "var(--font-weight-bold)", color: "#DC6B19" }}>• Lose thousands in uncollected royalties</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              style={{ 
                backgroundColor: "var(--color-card)", 
                borderRadius: "var(--radius-large)", 
                boxShadow: "var(--shadow-card)",
                border: `1px solid var(--color-border)`
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: "var(--color-primary)" }}>
                  <CheckCircle className="h-6 w-6 mr-3" style={{ color: "var(--color-primary)" }} />
                  What RoyaltyFlow Does
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3" style={{ color: "var(--icon-color)" }}>
                  <li>• Collect both writer AND publisher shares</li>
                  <li>• Register with MLC for mechanical royalties</li>
                  <li>• Monitor 200+ territories worldwide</li>
                  <li>• Handle all paperwork and registrations</li>
                  <li style={{ fontWeight: "var(--font-weight-bold)", color: "var(--color-primary)" }}>• Maximize your royalty income</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 
              style={{ 
                fontSize: "var(--font-size-title)", 
                fontWeight: "var(--font-weight-bold)", 
                color: "var(--color-foreground)",
                marginBottom: "16px"
              }}
            >
              Complete Royalty Collection
            </h2>
            <p style={{ fontSize: "var(--font-size-heading)", color: "var(--icon-color)" }}>
              We handle every aspect of music publishing administration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 
                    style={{ 
                      fontSize: "var(--font-size-heading)", 
                      fontWeight: "var(--font-weight-bold)", 
                      color: "var(--color-foreground)",
                      marginBottom: "8px"
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: "var(--font-size-body)", color: "var(--icon-color)" }}>
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4" style={{ backgroundColor: "var(--color-muted)" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 
              style={{ 
                fontSize: "var(--font-size-title)", 
                fontWeight: "var(--font-weight-bold)", 
                color: "var(--color-foreground)",
                marginBottom: "16px"
              }}
            >
              Pricing
            </h2>
            <p style={{ fontSize: "var(--font-size-heading)", color: "var(--icon-color)", marginBottom: "24px" }}>
              Check out our affordable pricing plans
            </p>
          </div>

          {/* Single Plan Card */}
          <div className="max-w-2xl mx-auto">
            <Card 
              className="relative"
              style={{ 
                backgroundColor: "var(--color-card)", 
                borderRadius: "var(--radius-large)", 
                boxShadow: "var(--shadow-card)",
                border: `2px solid var(--color-primary)`
              }}
            >
              <Badge 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2" 
                style={{ 
                  backgroundColor: "var(--color-primary)", 
                  color: "var(--color-primary-foreground)",
                  borderRadius: "var(--radius-large)",
                  padding: "8px 16px"
                }}
              >
                Professional Plan
              </Badge>
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 style={{ 
                    fontSize: "var(--font-size-title)", 
                    fontWeight: "var(--font-weight-bold)", 
                    color: "var(--color-foreground)",
                    marginBottom: "8px"
                  }}>
                    Complete Publishing Administration
                  </h3>
                  <p style={{ 
                    fontSize: "var(--font-size-body)", 
                    color: "var(--icon-color)",
                    marginBottom: "24px"
                  }}>
                    Everything you need to maximize your royalty collection
                  </p>
                  
                  {/* Pricing Display */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div 
                      className="p-6 rounded-lg text-center" 
                      style={{ 
                        backgroundColor: "var(--color-accent)",
                        borderRadius: "var(--radius-medium)"
                      }}
                    >
                      <div style={{ 
                        fontSize: "48px", 
                        fontWeight: "var(--font-weight-bold)", 
                        color: "var(--color-foreground)",
                        lineHeight: "1"
                      }}>
                        $500
                      </div>
                      <div style={{ 
                        fontSize: "var(--font-size-body)", 
                        color: "var(--icon-color)",
                        marginTop: "8px"
                      }}>
                        One-time setup fee
                      </div>
                    </div>
                    
                    <div 
                      className="p-6 rounded-lg text-center" 
                      style={{ 
                        backgroundColor: "var(--color-highlight)",
                        borderRadius: "var(--radius-medium)"
                      }}
                    >
                      <div style={{ 
                        fontSize: "48px", 
                        fontWeight: "var(--font-weight-bold)", 
                        color: "var(--color-foreground)",
                        lineHeight: "1"
                      }}>
                        10%
                      </div>
                      <div style={{ 
                        fontSize: "var(--font-size-body)", 
                        color: "var(--icon-color)",
                        marginTop: "8px"
                      }}>
                        Admin fee on royalties
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 style={{ 
                      fontSize: "var(--font-size-heading)", 
                      fontWeight: "var(--font-weight-bold)", 
                      color: "var(--color-foreground)",
                      marginBottom: "16px"
                    }}>
                      What's Included:
                    </h4>
                    <ul className="space-y-3" style={{ color: "var(--icon-color)" }}>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: "var(--color-primary)" }} />
                        Global royalty collection (200+ territories)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: "var(--color-primary)" }} />
                        Performance & mechanical royalties
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: "var(--color-primary)" }} />
                        Copyright registration & protection
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: "var(--color-primary)" }} />
                        Monthly payment processing
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style={{ 
                      fontSize: "var(--font-size-heading)", 
                      fontWeight: "var(--font-weight-bold)", 
                      color: "var(--color-foreground)",
                      marginBottom: "16px"
                    }}>
                      Premium Support:
                    </h4>
                    <ul className="space-y-3" style={{ color: "var(--icon-color)" }}>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: "var(--color-primary)" }} />
                        Detailed analytics & reporting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: "var(--color-primary)" }} />
                        Dedicated account manager
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: "var(--color-primary)" }} />
                        Sync licensing opportunities
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: "var(--color-primary)" }} />
                        Priority customer support
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <div 
                    className="p-4 rounded-lg mb-6" 
                    style={{ 
                      backgroundColor: "var(--color-muted)",
                      borderRadius: "var(--radius-medium)"
                    }}
                  >
                    <p style={{ 
                      fontSize: "var(--font-size-body)", 
                      color: "var(--color-foreground)",
                      fontWeight: "var(--font-weight-medium)"
                    }}>
                      <strong>Simple & Transparent:</strong> Pay once to get started, then we only take 10% when you earn royalties. No monthly fees, no hidden costs.
                    </p>
                  </div>
                  
                  <Link href="/login">
                    <Button 
                      size="lg"
                      style={{ 
                        borderRadius: "var(--radius-medium)",
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-foreground)",
                        padding: "16px 32px",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)"
                      }}
                    >
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <p style={{ 
                    fontSize: "var(--font-size-caption)", 
                    color: "var(--icon-color)",
                    marginTop: "12px"
                  }}>
                    Start collecting 100% of your publishing royalties
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "var(--color-primary)" }}>
        <div className="container mx-auto text-center max-w-3xl">
          <h2 
            style={{ 
              fontSize: "var(--font-size-title)", 
              fontWeight: "var(--font-weight-bold)", 
              color: "var(--color-primary-foreground)",
              marginBottom: "24px"
            }}
          >
            Ready to Collect 100% of Your Royalties?
          </h2>
          <p 
            style={{ 
              fontSize: "var(--font-size-heading)", 
              color: "var(--color-primary-foreground)",
              opacity: 0.9,
              marginBottom: "32px"
            }}
          >
            Join thousands of songwriters who trust RoyaltyFlow to maximize their publishing income.
          </p>
          <Link href="/login">
            <Button 
              size="lg" 
              style={{ 
                borderRadius: "var(--radius-medium)",
                backgroundColor: "var(--color-card)",
                color: "var(--color-primary)",
                padding: "12px 24px"
              }}
            >
              Start Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center" 
                  style={{ backgroundColor: "var(--color-primary-foreground)" }}
                >
                  <Music className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
                </div>
                <span style={{ fontSize: "var(--font-size-heading)", fontWeight: "var(--font-weight-bold)" }}>RoyaltyFlow</span>
              </div>
              <p style={{ fontSize: "var(--font-size-body)", opacity: 0.8 }}>
                Helping songwriters collect 100% of their publishing royalties worldwide.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "var(--font-size-body)", fontWeight: "var(--font-weight-bold)", marginBottom: "16px" }}>Product</h4>
              <ul className="space-y-2" style={{ fontSize: "var(--font-size-body)", opacity: 0.8 }}>
                <li><Link href="#features" className="hover:opacity-100 transition-opacity">Features</Link></li>
                <li><Link href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:opacity-100 transition-opacity">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "var(--font-size-body)", fontWeight: "var(--font-weight-bold)", marginBottom: "16px" }}>Support</h4>
              <ul className="space-y-2" style={{ fontSize: "var(--font-size-body)", opacity: 0.8 }}>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Help Center</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "var(--font-size-body)", fontWeight: "var(--font-weight-bold)", marginBottom: "16px" }}>Company</h4>
              <ul className="space-y-2" style={{ fontSize: "var(--font-size-body)", opacity: 0.8 }}>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">About</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Blog</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center" style={{ fontSize: "var(--font-size-body)", opacity: 0.8 }}>
            <p>&copy; 2024 RoyaltyFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
