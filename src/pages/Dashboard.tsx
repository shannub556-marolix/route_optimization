import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Package, 
  Route, 
  TrendingUp, 
  Clock, 
  DollarSign,
  MapPin,
  BarChart3,
  Upload,
  Play
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const kpis = [
    {
      title: "Total Orders",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Active Vehicles",
      value: "23",
      change: "+2",
      trend: "up",
      icon: Truck,
      color: "text-accent"
    },
    {
      title: "Routes Optimized",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Route,
      color: "text-success"
    },
    {
      title: "Distance Saved",
      value: "2,847 km",
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
      color: "text-warning"
    },
    {
      title: "Cost Savings",
      value: "23.5%",
      change: "+3.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "On-time Deliveries",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      icon: Clock,
      color: "text-primary"
    }
  ];

  const quickActions = [
    {
      title: "Upload Orders",
      description: "Add new delivery orders",
      icon: Upload,
      action: () => navigate("/orders"),
      variant: "default" as const
    },
    {
      title: "Upload Vehicles",
      description: "Manage your fleet",
      icon: Truck,
      action: () => navigate("/vehicles"),
      variant: "secondary" as const
    },
    {
      title: "Optimize Routes",
      description: "Create efficient routes",
      icon: Play,
      action: () => navigate("/optimize"),
      variant: "default" as const
    },
    {
      title: "View Reports",
      description: "Analytics & insights",
      icon: BarChart3,
      action: () => navigate("/reports"),
      variant: "outline" as const
    }
  ];

  const recentOptimizations = [
    { id: "OPT-001", date: "2024-01-15", orders: 45, vehicles: 5, distance: "234 km", savings: "18%" },
    { id: "OPT-002", date: "2024-01-14", orders: 38, vehicles: 4, distance: "189 km", savings: "22%" },
    { id: "OPT-003", date: "2024-01-13", orders: 52, vehicles: 6, distance: "267 km", savings: "15%" },
    { id: "OPT-004", date: "2024-01-12", orders: 41, vehicles: 5, distance: "198 km", savings: "20%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, optimize your logistics operations</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common operations and workflows</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    className="w-full justify-start h-auto p-4"
                    onClick={action.action}
                  >
                    <action.icon className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm opacity-80">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Optimizations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Route className="h-5 w-5 mr-2 text-accent" />
                  Recent Optimizations
                </CardTitle>
                <CardDescription>Latest route optimization results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOptimizations.map((opt, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Route className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{opt.id}</div>
                          <div className="text-sm text-muted-foreground">{opt.date}</div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          {opt.orders} orders • {opt.vehicles} vehicles
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {opt.distance} • 
                          <span className="text-success ml-1">{opt.savings} saved</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Performance</CardTitle>
              <CardDescription>Vehicle utilization and efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Utilization</span>
                  <span className="text-sm text-success">87.3%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "87%" }}></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-medium text-foreground">23</div>
                    <div className="text-muted-foreground">Active</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">2</div>
                    <div className="text-muted-foreground">Maintenance</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">1</div>
                    <div className="text-muted-foreground">Idle</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>Savings and optimization impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Monthly Savings</span>
                  <span className="text-sm text-success">$12,847</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-warning">15.2%</div>
                    <div className="text-xs text-muted-foreground">Fuel Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">8.7%</div>
                    <div className="text-xs text-muted-foreground">Time Reduction</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;