"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Music, ArrowRight, ArrowLeft } from "lucide-react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">RoyaltyFlow</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Let's Get Started</CardTitle>
              <CardDescription>
                Tell us about yourself so we can set up your publishing administration account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: PRO Information */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Performance Rights Organization</CardTitle>
              <CardDescription>
                Which PRO are you currently registered with? This helps us avoid duplicate registrations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pro">Current PRO</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your PRO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ascap">ASCAP</SelectItem>
                    <SelectItem value="bmi">BMI</SelectItem>
                    <SelectItem value="sesac">SESAC</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="none">Not registered yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proNumber">PRO Member Number (if applicable)</Label>
                <Input id="proNumber" placeholder="Enter your member number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publisherName">Publisher Name (if you have one)</Label>
                <Input id="publisherName" placeholder="Leave blank if none" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="selfPublished" />
                <Label htmlFor="selfPublished" className="text-sm">
                  I am self-published and want RoyaltyFlow to handle my publisher share
                </Label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Song Information */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Music</CardTitle>
              <CardDescription>Tell us about your songs so we can start collecting royalties for them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="songCount">Approximately how many songs do you have?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 songs</SelectItem>
                    <SelectItem value="11-50">11-50 songs</SelectItem>
                    <SelectItem value="51-100">51-100 songs</SelectItem>
                    <SelectItem value="100+">100+ songs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>What types of royalties are you currently missing?</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="publisher" />
                    <Label htmlFor="publisher" className="text-sm">
                      Publisher share (50% of performance royalties)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mechanical" />
                    <Label htmlFor="mechanical" className="text-sm">
                      Mechanical royalties (streaming, downloads)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="international" />
                    <Label htmlFor="international" className="text-sm">
                      International royalties
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sync" />
                    <Label htmlFor="sync" className="text-sm">
                      Sync licensing opportunities
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="genres">Primary Genres</Label>
                <Input id="genres" placeholder="e.g., Pop, Rock, Electronic" />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Plan Selection */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>Select the plan that best fits your needs. You can change this anytime.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="border-2 border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Standard</h3>
                      <p className="text-sm text-muted-foreground">Perfect for most songwriters</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">15%</div>
                      <div className="text-sm text-muted-foreground">commission</div>
                    </div>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Global royalty collection</li>
                    <li>• Monthly payments</li>
                    <li>• Detailed reporting</li>
                  </ul>
                </div>

                <div className="border-2 border-primary bg-secondary rounded-lg p-6 cursor-pointer relative">
                  <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Pro</h3>
                      <p className="text-sm text-muted-foreground">For serious music professionals</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">12%</div>
                      <div className="text-sm text-muted-foreground">commission</div>
                    </div>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Everything in Standard</li>
                    <li>• Priority support</li>
                    <li>• Advanced analytics</li>
                    <li>• Sync licensing opportunities</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
