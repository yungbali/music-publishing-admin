import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Music, Globe, Calendar, Download, Plus, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">RoyaltyFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Songs
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,847.32</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,247.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+8.2%</span> vs last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Songs</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Across 23 territories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <Progress value={94.2} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="royalties">Royalties</TabsTrigger>
            <TabsTrigger value="territories">Territories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Earnings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Recent Earnings
                  </CardTitle>
                  <CardDescription>Your latest royalty payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Performance Royalties</p>
                        <p className="text-sm text-muted-foreground">ASCAP - Q4 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$847.32</p>
                        <Badge variant="secondary">Paid</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mechanical Royalties</p>
                        <p className="text-sm text-muted-foreground">MLC - December</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$234.67</p>
                        <Badge variant="secondary">Paid</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">International Royalties</p>
                        <p className="text-sm text-muted-foreground">GEMA - November</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$165.90</p>
                        <Badge variant="outline">Processing</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Songs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Top Performing Songs
                  </CardTitle>
                  <CardDescription>Your highest earning tracks this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Summer Nights</p>
                        <p className="text-sm text-muted-foreground">Pop • 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$342.18</p>
                        <p className="text-sm text-primary">+15.2%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">City Lights</p>
                        <p className="text-sm text-muted-foreground">Electronic • 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$287.45</p>
                        <p className="text-sm text-primary">+8.7%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Midnight Drive</p>
                        <p className="text-sm text-muted-foreground">Rock • 2022</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$198.76</p>
                        <p className="text-sm text-red-600">-3.1%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Royalty Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Royalty Breakdown</CardTitle>
                <CardDescription>How your earnings are distributed across different sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">48%</div>
                    <div className="text-sm font-medium mb-1">Performance Rights</div>
                    <div className="text-xs text-muted-foreground">Radio, TV, Streaming</div>
                    <Progress value={48} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">26%</div>
                    <div className="text-sm font-medium mb-1">Synchronization</div>
                    <div className="text-xs text-muted-foreground">Film, TV, Ads</div>
                    <Progress value={26} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">20%</div>
                    <div className="text-sm font-medium mb-1">Mechanical Rights</div>
                    <div className="text-xs text-muted-foreground">Digital Downloads, CDs</div>
                    <Progress value={20} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="songs">
            <Card>
              <CardHeader>
                <CardTitle>Your Songs</CardTitle>
                <CardDescription>Manage your registered compositions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Song management interface would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="royalties">
            <Card>
              <CardHeader>
                <CardTitle>Royalty History</CardTitle>
                <CardDescription>Detailed breakdown of all your earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Detailed royalty reports would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="territories">
            <Card>
              <CardHeader>
                <CardTitle>Territory Coverage</CardTitle>
                <CardDescription>Your royalty collection across different regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Territory map and statistics would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
