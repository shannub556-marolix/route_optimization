import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  Truck,
  Route,
  Clock,
  Leaf,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();

  // Mock analytics data
  const performanceMetrics = [
    { metric: "Distance Saved", value: "2,847 km", change: "+15%", period: "vs last month" },
    { metric: "Cost Reduction", value: "$12,450", change: "+23%", period: "monthly savings" },
    { metric: "Time Efficiency", value: "18.2%", change: "+5%", period: "improvement" },
    { metric: "Fuel Savings", value: "1,240 L", change: "+12%", period: "monthly reduction" }
  ];

  const vehiclePerformance = [
    {
      vehicleId: "VH-001",
      type: "Truck",
      deliveries: 156,
      avgTime: "4.2h",
      onTimeRate: "94%",
      efficiency: "87%",
      rating: "excellent"
    },
    {
      vehicleId: "VH-002", 
      type: "Van",
      deliveries: 124,
      avgTime: "3.8h",
      onTimeRate: "91%",
      efficiency: "83%",
      rating: "good"
    },
    {
      vehicleId: "VH-003",
      type: "Bike",
      deliveries: 89,
      avgTime: "2.1h",
      onTimeRate: "88%",
      efficiency: "79%",
      rating: "good"
    },
    {
      vehicleId: "VH-004",
      type: "Truck", 
      deliveries: 142,
      avgTime: "4.8h",
      onTimeRate: "96%",
      efficiency: "92%",
      rating: "excellent"
    }
  ];

  const optimizationTrends = [
    { date: "Jan 15", routes: 12, distance: "1,247 km", savings: "23%", cost: "$3,847" },
    { date: "Jan 14", routes: 11, distance: "1,156 km", savings: "19%", cost: "$3,456" },
    { date: "Jan 13", routes: 15, distance: "1,389 km", savings: "25%", cost: "$4,123" },
    { date: "Jan 12", routes: 9, distance: "998 km", savings: "18%", cost: "$2,987" },
    { date: "Jan 11", routes: 13, distance: "1,278 km", savings: "21%", cost: "$3,756" }
  ];

  const getRatingColor = (rating: string) => {
    switch(rating) {
      case "excellent": return "bg-success/10 text-success border-success/20";
      case "good": return "bg-primary/10 text-primary border-primary/20";
      case "average": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground">Performance insights and optimization analytics</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="30days">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => navigate("/dashboard")} variant="outline">
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.metric}
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <p className="text-xs text-success flex items-center mt-1">
                      {metric.change} {metric.period}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Distance Savings Trend
                  </CardTitle>
                  <CardDescription>Monthly distance optimization performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Distance Savings Chart</p>
                      <p className="text-sm text-muted-foreground">23% average improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-success" />
                    Cost vs Distance Analysis
                  </CardTitle>
                  <CardDescription>Optimization impact on operational costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Cost Analysis Chart</p>
                      <p className="text-sm text-muted-foreground">$12,450 monthly savings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-primary" />
                      Vehicle Performance Summary
                    </CardTitle>
                    <CardDescription>Individual vehicle metrics and efficiency ratings</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Total Deliveries</TableHead>
                        <TableHead>Avg Delivery Time</TableHead>
                        <TableHead>On-Time Rate</TableHead>
                        <TableHead>Efficiency</TableHead>
                        <TableHead>Performance Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehiclePerformance.map((vehicle) => (
                        <TableRow key={vehicle.vehicleId}>
                          <TableCell className="font-medium">{vehicle.vehicleId}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-accent/10 text-accent">
                              {vehicle.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{vehicle.deliveries}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              {vehicle.avgTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{vehicle.onTimeRate}</span>
                              <div className="w-12 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-success h-2 rounded-full" 
                                  style={{ width: vehicle.onTimeRate }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{vehicle.efficiency}</TableCell>
                          <TableCell>
                            <Badge className={getRatingColor(vehicle.rating)} variant="outline">
                              {vehicle.rating}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Daily Optimization Trends
                </CardTitle>
                <CardDescription>Historical optimization performance and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Routes Optimized</TableHead>
                        <TableHead>Total Distance</TableHead>
                        <TableHead>Distance Savings</TableHead>
                        <TableHead>Total Cost</TableHead>
                        <TableHead>Efficiency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {optimizationTrends.map((trend, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{trend.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Route className="h-4 w-4 mr-2 text-muted-foreground" />
                              {trend.routes}
                            </div>
                          </TableCell>
                          <TableCell>{trend.distance}</TableCell>
                          <TableCell>
                            <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                              {trend.savings}
                            </Badge>
                          </TableCell>
                          <TableCell>{trend.cost}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-2 text-primary" />
                              Optimized
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-success" />
                  Weekly Performance Chart
                </CardTitle>
                <CardDescription>Optimization trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Performance Trend Chart</p>
                    <p className="text-sm text-muted-foreground">Consistent 15-25% savings achieved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-success" />
                    Carbon Emissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-success">2.4 tons</p>
                    <p className="text-sm text-muted-foreground">CO₂ saved this month</p>
                    <div className="mt-2">
                      <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                        -18% reduction
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    Fuel Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">1,240 L</p>
                    <p className="text-sm text-muted-foreground">Fuel saved this month</p>
                    <div className="mt-2">
                      <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                        $1,847 savings
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-accent" />
                    Sustainability Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent">87/100</p>
                    <p className="text-sm text-muted-foreground">Environmental impact score</p>
                    <div className="mt-2">
                      <Badge className="bg-accent/10 text-accent border-accent/20" variant="outline">
                        Excellent
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-success" />
                  Environmental Impact Report
                </CardTitle>
                <CardDescription>Detailed sustainability metrics and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Carbon Footprint Reduction</span>
                      <span className="text-sm text-success">18.3%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "83%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Fuel Efficiency Improvement</span>
                      <span className="text-sm text-primary">12.7%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "77%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Monthly Impact</p>
                      <p className="text-xs text-muted-foreground">
                        2.4 tons CO₂ saved • 1,240L fuel saved • $1,847 cost reduction
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Year-to-Date</p>
                      <p className="text-xs text-muted-foreground">
                        28.9 tons CO₂ saved • 14,880L fuel saved • $22,164 cost reduction
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;