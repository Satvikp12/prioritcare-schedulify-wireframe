
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Wireframe demo credentials
    if (userType === "admin" && email === "") {
      setEmail("admin@prioritycare.com");
    } else if (userType === "doctor" && email === "") {
      setEmail("sarah.johnson@prioritycare.com");
    } else if (userType === "patient" && email === "") {
      setEmail("john.smith@email.com");
    }

    const success = login(email, password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: `Welcome back to PriorityCare.`,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-light">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-medical-blue">PriorityCare</h1>
          <p className="text-gray-600 mt-2">Book an Appointment Quickly</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Access the PriorityCare system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="mb-6" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patient">Patient</TabsTrigger>
                <TabsTrigger value="doctor">Doctor</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    userType === "admin"
                      ? "admin@prioritycare.com"
                      : userType === "doctor"
                      ? "doctor@prioritycare.com"
                      : "patient@email.com"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  (For this wireframe, any password will work)
                </p>
              </div>
              <Button type="submit" className="w-full bg-medical-blue hover:bg-medical-blue/90">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
