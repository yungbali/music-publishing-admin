import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Music, DollarSign, Globe, Shield, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">RoyaltyFlow</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-secondary text-primary hover:bg-secondary">
            Collect 100% of Your Publishing Royalties
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Stop Losing Money on
            <span className="text-primary"> Uncollected Royalties</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Most songwriters only collect 50% of their royalties. We help you collect both your writer share AND
            publisher share from over 200 territories worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Collecting Royalties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2.5M+</div>
              <div className="text-muted-foreground">Royalties Collected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Territories Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Songwriters</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Publishing Royalty Problem</h2>
            <p className="text-lg text-muted-foreground">
              Your royalties are split into two parts - and most writers only collect one
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-border bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-foreground/90 flex items-center">
                  <span className="text-2xl mr-2">❌</span>
                  What Most Writers Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Only register as a writer with PRO (ASCAP, BMI, SESAC)</li>
                  <li>• Collect writer share only (50% of total royalties)</li>
                  <li>• Leave publisher share unclaimed</li>
                  <li>• Miss out on mechanical royalties</li>
                  <li className="font-semibold text-foreground/90">• Lose thousands in uncollected royalties</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <span className="text-2xl mr-2">✅</span>
                  What RoyaltyFlow Does
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Collect both writer AND publisher shares</li>
                  <li>• Register with MLC for mechanical royalties</li>
                  <li>• Monitor 200+ territories worldwide</li>
                  <li>• Handle all paperwork and registrations</li>
                  <li className="font-semibold text-primary">• Maximize your royalty income</li>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Complete Royalty Collection</h2>
            <p className="text-lg text-muted-foreground">We handle every aspect of music publishing administration</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Global Collection</CardTitle>
                <CardDescription>
                  Collect from 200+ territories including performance, mechanical, and sync royalties
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Rights Protection</CardTitle>
                <CardDescription>Register and protect your copyrights with PROs and MROs worldwide</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Track your earnings with detailed reports and real-time analytics</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fast Payments</CardTitle>
                <CardDescription>Get paid monthly with transparent reporting and no hidden fees</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Expert Support</CardTitle>
                <CardDescription>Dedicated support team with deep music industry expertise</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Music className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Easy Registration</CardTitle>
                <CardDescription>Simple song registration process with bulk upload capabilities</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              No setup fees, no monthly fees. We only succeed when you do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Standard</CardTitle>
                <CardDescription>Perfect for most songwriters</CardDescription>
                <div className="text-4xl font-bold text-foreground mt-4">
                  15%
                  <span className="text-lg font-normal text-muted-foreground"> commission</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Global royalty collection</li>
                  <li>• Monthly payments</li>
                  <li>• Detailed reporting</li>
                  <li>• Copyright registration</li>
                  <li>• Email support</li>
                </ul>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-secondary/50 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>For serious music professionals</CardDescription>
                <div className="text-4xl font-bold text-foreground mt-4">
                  12%
                  <span className="text-lg font-normal text-muted-foreground"> commission</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Everything in Standard</li>
                  <li>• Priority support</li>
                  <li>• Advanced analytics</li>
                  <li>• Sync licensing opportunities</li>
                  <li>• Dedicated account manager</li>
                </ul>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90">Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Collect 100% of Your Royalties?</h2>
          <p className="text-xl text-secondary mb-8">
            Join thousands of songwriters who trust RoyaltyFlow to maximize their publishing income.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-50">
            Start Your Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="h-6 w-6 text-primary/70" />
                <span className="text-xl font-bold">RoyaltyFlow</span>
              </div>
              <p className="text-muted-foreground/70">
                Helping songwriters collect 100% of their publishing royalties worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground/70">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground/70">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground/70">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 mt-8 pt-8 text-center text-muted-foreground/70">
            <p>&copy; 2024 RoyaltyFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
