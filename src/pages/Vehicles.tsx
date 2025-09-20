import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Truck, 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  Upload,
  Download,
  Filter,
  Fuel,
  Gauge
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Vehicles = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock vehicles data
  const vehicles = [
    {
      id: "VH-001",
      type: "Truck",
      startLocation: "Main Depot - Downtown",
      coordinates: "40.7128, -74.0060",
      capacity: 1000,
      currentLoad: 0,
      operatingHours: "08:00 - 18:00",
      maxDistance: 200,
      costPerKm: 1.5,
      costPerHour: 25,
      status: "available"
    },
    {
      id: "VH-002",
      type: "Van", 
      startLocation: "North Hub - Uptown",
      coordinates: "40.7831, -73.9712",
      capacity: 500,
      currentLoad: 150,
      operatingHours: "09:00 - 17:00",
      maxDistance: 150,
      costPerKm: 1.2,
      costPerHour: 20,
      status: "active"
    },
    {
      id: "VH-003",
      type: "Bike",
      startLocation: "City Center Hub",
      coordinates: "40.7589, -73.9851",
      capacity: 50,
      currentLoad: 0,
      operatingHours: "10:00 - 16:00",
      maxDistance: 50,
      costPerKm: 0.5,
      costPerHour: 15,
      status: "maintenance"
    },
    {
      id: "VH-004",
      type: "Truck",
      startLocation: "East Depot - Riverside",
      coordinates: "40.7505, -73.9934",
      capacity: 1200,
      currentLoad: 300,
      operatingHours: "07:00 - 19:00",
      maxDistance: 250,
      costPerKm: 1.8,
      costPerHour: 30,
      status: "active"
    }
  ];

  const handleFileUpload = () => {
    toast({
      title: "Vehicles uploaded successfully",
      description: "Processing 12 vehicles..."
    });
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case "available": return "bg-success/10 text-success border-success/20";
      case "active": return "bg-primary/10 text-primary border-primary/20";
      case "maintenance": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "Truck": return "bg-accent/10 text-accent border-accent/20";
      case "Van": return "bg-primary/10 text-primary border-primary/20";
      case "Bike": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Fleet Management</h1>
              <p className="text-muted-foreground">Manage your delivery vehicles and depots</p>
            </div>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vehicles">View Fleet</TabsTrigger>
            <TabsTrigger value="upload">Add Vehicles</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-primary" />
                    Bulk Upload
                  </CardTitle>
                  <CardDescription>Upload vehicles via CSV or Excel file</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your fleet data file here
                    </p>
                    <Button onClick={handleFileUpload}>
                      Choose File
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Required columns: Vehicle ID, Type, Start Location, Capacity, Operating Hours
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-accent" />
                    Add Vehicle
                  </CardTitle>
                  <CardDescription>Register a new vehicle manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Vehicle ID" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Vehicle Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="bike">Bike</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Starting Location/Depot" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Capacity (kg)" />
                      <Input placeholder="Current Load (kg)" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Start Time" type="time" />
                      <Input placeholder="End Time" type="time" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Cost per KM" />
                      <Input placeholder="Cost per Hour" />
                    </div>
                  </div>
                  <Button className="w-full">
                    Add Vehicle
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6">
            {/* Fleet Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-xs text-muted-foreground">Total Vehicles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-8 w-8 text-success" />
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-8 w-8 text-warning" />
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-xs text-muted-foreground">Maintenance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-8 w-8 text-accent" />
                    <div>
                      <p className="text-2xl font-bold">87%</p>
                      <p className="text-xs text-muted-foreground">Utilization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-primary" />
                      Fleet List
                    </CardTitle>
                    <CardDescription>Manage your vehicle fleet</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search vehicles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Start Location</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Current Load</TableHead>
                        <TableHead>Operating Hours</TableHead>
                        <TableHead>Cost (KM/Hr)</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-medium">{vehicle.id}</TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(vehicle.type)}>
                              {vehicle.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              {vehicle.startLocation}
                            </div>
                          </TableCell>
                          <TableCell>{vehicle.capacity} kg</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{vehicle.currentLoad} kg</span>
                              <div className="w-12 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${(vehicle.currentLoad / vehicle.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              {vehicle.operatingHours}
                            </div>
                          </TableCell>
                          <TableCell>
                            ${vehicle.costPerKm} / ${vehicle.costPerHour}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(vehicle.status)}>
                              {vehicle.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredVehicles.length} of {vehicles.length} vehicles
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
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

export default Vehicles;