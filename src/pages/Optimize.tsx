import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Route, 
  Play, 
  Clock, 
  MapPin, 
  TrendingUp,
  CheckCircle,
  Settings,
  Target,
  Truck,
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Optimize = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const [selectedOrdersDataset, setSelectedOrdersDataset] = useState("");
  const [selectedVehiclesDataset, setSelectedVehiclesDataset] = useState("");
  const [objective, setObjective] = useState("");
  const [constraints, setConstraints] = useState({
    maxDistance: true,
    maxDuration: true,
    timeWindows: true,
    vehicleCapacity: true
  });

  const datasets = {
    orders: [
      { id: "orders-001", name: "Downtown Orders - Jan 15", count: 47, uploaded: "2024-01-15" },
      { id: "orders-002", name: "Citywide Orders - Jan 14", count: 38, uploaded: "2024-01-14" },
      { id: "orders-003", name: "Express Orders - Jan 13", count: 25, uploaded: "2024-01-13" }
    ],
    vehicles: [
      { id: "vehicles-001", name: "Main Fleet", count: 12, uploaded: "2024-01-15" },
      { id: "vehicles-002", name: "Downtown Hub", count: 8, uploaded: "2024-01-14" },
      { id: "vehicles-003", name: "Express Fleet", count: 5, uploaded: "2024-01-13" }
    ]
  };

  const optimizationResults = {
    totalDistance: "1,247 km",
    totalCost: "$3,847",
    totalTime: "18.5 hours",
    distanceSaved: "23%",
    costSaved: "$1,200",
    vehiclesUsed: 8,
    ordersAssigned: 47
  };

  const handleOptimize = async () => {
    if (!selectedOrdersDataset || !selectedVehiclesDataset || !objective) {
      toast({
        title: "Missing Selection",
        description: "Please select datasets and optimization objective",
        variant: "destructive"
      });
      return;
    }

    setIsOptimizing(true);
    setProgress(0);

    // Simulate optimization process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          setOptimizationComplete(true);
          toast({
            title: "Optimization Complete",
            description: "Routes have been optimized successfully!"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const steps = [
    { id: 1, title: "Select Datasets", description: "Choose orders and vehicles" },
    { id: 2, title: "Define Constraints", description: "Set optimization parameters" },
    { id: 3, title: "Run Optimization", description: "Process and generate routes" },
    { id: 4, title: "View Results", description: "Review optimized routes" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Route Optimization</h1>
              <p className="text-muted-foreground">Create efficient delivery routes</p>
            </div>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Route className="h-5 w-5 mr-2 text-primary" />
              Optimization Workflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    optimizationComplete || currentStep > step.id 
                      ? 'bg-success text-success-foreground' 
                      : currentStep === step.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {optimizationComplete || currentStep > step.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-px bg-border ml-6 mr-6"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Select Datasets */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-primary" />
                  Select Orders Dataset
                </CardTitle>
                <CardDescription>Choose the orders to optimize</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedOrdersDataset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose orders dataset" />
                  </SelectTrigger>
                  <SelectContent>
                    {datasets.orders.map((dataset) => (
                      <SelectItem key={dataset.id} value={dataset.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{dataset.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {dataset.count} orders
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedOrdersDataset && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Selected: {datasets.orders.find(d => d.id === selectedOrdersDataset)?.name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-accent" />
                  Select Vehicles Dataset
                </CardTitle>
                <CardDescription>Choose the fleet to use</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedVehiclesDataset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose vehicles dataset" />
                  </SelectTrigger>
                  <SelectContent>
                    {datasets.vehicles.map((dataset) => (
                      <SelectItem key={dataset.id} value={dataset.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{dataset.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {dataset.count} vehicles
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedVehiclesDataset && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Selected: {datasets.vehicles.find(d => d.id === selectedVehiclesDataset)?.name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Define Constraints */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Optimization Objective
                </CardTitle>
                <CardDescription>Choose your primary optimization goal</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setObjective}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select optimization objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shortest">Shortest Distance</SelectItem>
                    <SelectItem value="lowest-cost">Lowest Cost</SelectItem>
                    <SelectItem value="fastest">Fastest Route (Time Priority)</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-accent" />
                  Constraints & Parameters
                </CardTitle>
                <CardDescription>Define operational constraints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="maxDistance"
                        checked={constraints.maxDistance}
                        onCheckedChange={(checked) => 
                          setConstraints(prev => ({...prev, maxDistance: checked as boolean}))
                        }
                      />
                      <Label htmlFor="maxDistance">Max Route Distance</Label>
                    </div>
                    {constraints.maxDistance && (
                      <Input placeholder="Enter max distance (km)" />
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="maxDuration"
                        checked={constraints.maxDuration}
                        onCheckedChange={(checked) => 
                          setConstraints(prev => ({...prev, maxDuration: checked as boolean}))
                        }
                      />
                      <Label htmlFor="maxDuration">Max Route Duration</Label>
                    </div>
                    {constraints.maxDuration && (
                      <Input placeholder="Enter max duration (hours)" />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="timeWindows"
                        checked={constraints.timeWindows}
                        onCheckedChange={(checked) => 
                          setConstraints(prev => ({...prev, timeWindows: checked as boolean}))
                        }
                      />
                      <Label htmlFor="timeWindows">Delivery Time Windows</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="vehicleCapacity"
                        checked={constraints.vehicleCapacity}
                        onCheckedChange={(checked) => 
                          setConstraints(prev => ({...prev, vehicleCapacity: checked as boolean}))
                        }
                      />
                      <Label htmlFor="vehicleCapacity">Vehicle Capacity Limits</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Run Optimization */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="h-5 w-5 mr-2 text-primary" />
                Run Optimization
              </CardTitle>
              <CardDescription>Process your data and generate optimal routes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isOptimizing && !optimizationComplete && (
                <div className="text-center space-y-4">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="font-medium mb-2">Ready to Optimize</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This will process your selected datasets with the defined constraints
                    </p>
                    <Button onClick={handleOptimize} className="w-full max-w-xs">
                      <Play className="h-4 w-4 mr-2" />
                      Start Optimization
                    </Button>
                  </div>
                </div>
              )}

              {isOptimizing && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-medium mb-2">Optimizing Routes...</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Processing {datasets.orders.find(d => d.id === selectedOrdersDataset)?.count} orders 
                      with {datasets.vehicles.find(d => d.id === selectedVehiclesDataset)?.count} vehicles
                    </p>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-center text-sm text-muted-foreground">
                    {progress}% Complete
                  </p>
                </div>
              )}

              {optimizationComplete && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Optimization Complete!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your routes have been successfully optimized
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{optimizationResults.totalDistance}</p>
                      <p className="text-xs text-muted-foreground">Total Distance</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-success">{optimizationResults.distanceSaved}</p>
                      <p className="text-xs text-muted-foreground">Distance Saved</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-warning">{optimizationResults.totalCost}</p>
                      <p className="text-xs text-muted-foreground">Total Cost</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-accent">{optimizationResults.vehiclesUsed}</p>
                      <p className="text-xs text-muted-foreground">Vehicles Used</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <div className="space-x-2">
            {optimizationComplete ? (
              <Button onClick={() => navigate("/routes")}>
                View Route Details
              </Button>
            ) : currentStep < 3 ? (
              <Button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={
                  (currentStep === 1 && (!selectedOrdersDataset || !selectedVehiclesDataset)) ||
                  (currentStep === 2 && !objective)
                }
              >
                Next
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optimize;