
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { mockPatients } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PriorityBadge from "@/components/PriorityBadge";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Find the current patient from mock data
  const currentPatient = mockPatients.find(p => p.email === user?.email);
  
  const [medicalHistory, setMedicalHistory] = useState(currentPatient?.medicalHistory || "");
  
  const handleSaveProfile = () => {
    // In a real app, this would update the database
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <Button onClick={() => navigate("/book-appointment")} className="bg-medical-blue hover:bg-medical-blue/90">
          Book New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={currentPatient?.name || ""} disabled />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={currentPatient?.email || ""} disabled />
            </div>
            <div>
              <Label htmlFor="priority">Current Priority Level</Label>
              <div className="mt-2">
                {currentPatient ? (
                  <PriorityBadge priority={currentPatient.priorityLevel} />
                ) : (
                  "Not set"
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Your priority level is set by healthcare administrators based on your medical condition
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="medical-history">Medical History</Label>
              <Textarea 
                id="medical-history" 
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="Enter any relevant medical history..."
                className="min-h-[150px]"
              />
            </div>
            <Button onClick={handleSaveProfile} className="bg-medical-blue hover:bg-medical-blue/90">
              Save Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PatientProfile;
