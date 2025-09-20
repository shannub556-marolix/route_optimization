import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Route, 
  MapPin, 
  Clock, 
  Truck, 
  Navigation,
  Download,
  Printer,
  AlertCircle,
  CheckCircle,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Routes = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState("VH-001");

  // Mock optimized routes data
  const vehicleRoutes = [
    {
      vehicleId: "VH-001",
      vehicleType: "Truck",
      totalDistance: "156 km",
      totalTime: "4.2 hours",
      totalCost: "$287",
      capacityUsed: "85%",
      ordersCount: 12,
      status: "completed"
    },
    {
      vehicleId: "VH-002",
      vehicleType: "Van", 
      totalDistance: "89 km",
      totalTime: "2.8 hours",
      totalCost: "$156",
      capacityUsed: "72%",
      ordersCount: 8,
      status: "in-progress"
    },
    {
      vehicleId: "VH-004",
      vehicleType: "Truck",
      totalDistance: "203 km",
      totalTime: "5.1 hours",
      totalCost: "$398",
      capacityUsed: "91%",
      ordersCount: 15,
      status: "pending"
    }
  ];

  const routeStops = [
    {
      sequence: 1,
      type: "depot",
      orderId: "DEPOT",
      address: "Main Depot - Downtown",
      eta: "08:00",
      serviceTime: "0 min",
      weight: 0,
      status: "completed"
    },
    {
      sequence: 2,
      type: "delivery",
      orderId: "ORD-001",
      address: "123 Main St, Downtown",
      eta: "08:25",
      serviceTime: "15 min",
      weight: 25,
      status: "completed"
    },
    {
      sequence: 3,
      type: "delivery",
      orderId: "ORD-007",
      address: "456 Oak Ave, Midtown",
      eta: "09:15",
      serviceTime: "10 min", 
      weight: 18,
      status: "completed"
    },
    {
      sequence: 4,
      type: "delivery",
      orderId: "ORD-012",
      address: "789 Pine Rd, Uptown",
      eta: "10:30",
      serviceTime: "25 min",
      weight: 42,
      status: "in-progress"
    },
    {
      sequence: 5,
      type: "delivery",
      orderId: "ORD-018",
      address: "321 Elm St, Eastside",
      eta: "11:45",
      serviceTime: "20 min",
      weight: 33,
      status: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "bg-success/10 text-success border-success/20";
      case "in-progress": return "bg-primary/10 text-primary border-primary/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "in-progress": return <Navigation className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const selectedRouteData = vehicleRoutes.find(route => route.vehicleId === selectedRoute);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Route Details</h1>
              <p className="text-muted-foreground">Detailed breakdown of optimized routes</p>
            </div>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Vehicle Routes List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-primary" />
                  Vehicle Routes
                </CardTitle>
                <CardDescription>Select a route to view details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {vehicleRoutes.map((route) => (
                  <div
                    key={route.vehicleId}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRoute === route.vehicleId 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedRoute(route.vehicleId)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{route.vehicleId}</span>
                      <Badge className={getStatusColor(route.status)} variant="outline">
                        {route.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {route.ordersCount} orders • {route.totalDistance}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Route Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Route Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Route className="h-5 w-5 mr-2 text-primary" />
                      Route Summary - {selectedRoute}
                    </CardTitle>
                    <CardDescription>
                      {selectedRouteData?.vehicleType} • {selectedRouteData?.ordersCount} stops
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{selectedRouteData?.totalDistance}</p>
                    <p className="text-xs text-muted-foreground">Total Distance</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-accent">{selectedRouteData?.totalTime}</p>
                    <p className="text-xs text-muted-foreground">Total Time</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-warning">{selectedRouteData?.totalCost}</p>
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-success">{selectedRouteData?.capacityUsed}</p>
                    <p className="text-xs text-muted-foreground">Capacity Used</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-accent" />
                  Route Map
                </CardTitle>
                <CardDescription>Interactive route visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive route map</p>
                    <p className="text-sm text-muted-foreground">
                      Showing {selectedRouteData?.ordersCount} stops with optimized path
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stop Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="h-5 w-5 mr-2 text-primary" />
                  Stop Details
                </CardTitle>
                <CardDescription>Sequential delivery stops with timing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sequence</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead>Service Time</TableHead>
                        <TableHead>Load (kg)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {routeStops.map((stop) => (
                        <TableRow key={stop.sequence}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                stop.type === 'depot' 
                                  ? 'bg-secondary text-secondary-foreground' 
                                  : 'bg-primary text-primary-foreground'
                              }`}>
                                {stop.sequence}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {stop.type === 'depot' ? (
                              <Badge variant="outline" className="bg-secondary/10">
                                {stop.orderId}
                              </Badge>
                            ) : (
                              stop.orderId
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              {stop.address}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              {stop.eta}
                            </div>
                          </TableCell>
                          <TableCell>{stop.serviceTime}</TableCell>
                          <TableCell>{stop.weight} kg</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(stop.status)} variant="outline">
                              <div className="flex items-center">
                                {getStatusIcon(stop.status)}
                                <span className="ml-1">{stop.status}</span>
                              </div>
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;