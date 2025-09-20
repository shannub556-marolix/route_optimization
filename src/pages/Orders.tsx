import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Upload, 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  Package,
  Download,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "ABC Electronics",
      address: "123 Main St, Downtown",
      coordinates: "40.7128, -74.0060",
      deliveryWindow: "09:00 - 12:00",
      weight: 25,
      volume: 0.5,
      serviceTime: 15,
      status: "pending"
    },
    {
      id: "ORD-002", 
      customer: "Tech Solutions Inc",
      address: "456 Oak Ave, Midtown",
      coordinates: "40.7589, -73.9851",
      deliveryWindow: "13:00 - 17:00",
      weight: 18,
      volume: 0.3,
      serviceTime: 10,
      status: "assigned"
    },
    {
      id: "ORD-003",
      customer: "Global Logistics",
      address: "789 Pine Rd, Uptown", 
      coordinates: "40.7831, -73.9712",
      deliveryWindow: "08:00 - 11:00",
      weight: 42,
      volume: 1.2,
      serviceTime: 25,
      status: "delivered"
    },
    {
      id: "ORD-004",
      customer: "Metro Supply Co",
      address: "321 Elm St, Eastside",
      coordinates: "40.7505, -73.9934",
      deliveryWindow: "14:00 - 18:00",
      weight: 33,
      volume: 0.8,
      serviceTime: 20,
      status: "pending"
    }
  ];

  const handleFileUpload = () => {
    toast({
      title: "File uploaded successfully",
      description: "Processing 47 new orders..."
    });
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "assigned": return "bg-primary/10 text-primary border-primary/20";
      case "delivered": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
              <p className="text-muted-foreground">Upload and manage delivery orders</p>
            </div>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">View Orders</TabsTrigger>
            <TabsTrigger value="upload">Upload Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-primary" />
                    Bulk Upload
                  </CardTitle>
                  <CardDescription>Upload orders via CSV or Excel file</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Button onClick={handleFileUpload}>
                      Choose File
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Supported formats: CSV, Excel (.xlsx)
                    <br />
                    Required columns: Order ID, Customer, Address, Delivery Window, Weight
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-accent" />
                    Manual Entry
                  </CardTitle>
                  <CardDescription>Add individual orders manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Customer Name" />
                    <Input placeholder="Delivery Address" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Weight (kg)" />
                      <Input placeholder="Volume (m³)" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Start Time" type="time" />
                      <Input placeholder="End Time" type="time" />
                    </div>
                  </div>
                  <Button className="w-full">
                    Add Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-primary" />
                      Orders List
                    </CardTitle>
                    <CardDescription>Manage your delivery orders</CardDescription>
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
                      placeholder="Search orders..."
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
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Delivery Window</TableHead>
                        <TableHead>Weight/Volume</TableHead>
                        <TableHead>Service Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              {order.address}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              {order.deliveryWindow}
                            </div>
                          </TableCell>
                          <TableCell>
                            {order.weight}kg / {order.volume}m³
                          </TableCell>
                          <TableCell>{order.serviceTime} min</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
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
                    Showing {filteredOrders.length} of {orders.length} orders
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

export default Orders;