
import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { mockPatients } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import PriorityBadge from "@/components/PriorityBadge";
import { Switch } from "@/components/ui/switch";

const PatientProfile = () => {
  const { currentUser, role } = useAuth();
  const { toast } = useToast();
  
  // Find patient from mock data based on user id
  const patientData = mockPatients.find(p => currentUser && p.id === currentUser.id);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showPrivateInfo, setShowPrivateInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: patientData?.name || "",
    email: patientData?.email || "",
    medicalHistory: patientData?.medicalHistory || ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's data in the database
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated."
    });
    setIsEditing(false);
  };
  
  if (!patientData) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Patient Profile Not Found</h2>
          <p className="text-gray-500">Unable to retrieve your patient information.</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Patient Profile</h2>
        <div className="flex gap-3">
          {role === "patient" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="show-private-info"
                checked={showPrivateInfo}
                onCheckedChange={setShowPrivateInfo}
              />
              <Label htmlFor="show-private-info">Show Sensitive Information</Label>
            </div>
          )}
          <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
            Edit Profile
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <PriorityBadge 
              priority={patientData.priorityLevel} 
              role={role}
              hideDetails={!showPrivateInfo && role === "patient"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medical-history">Medical History</Label>
            {(!showPrivateInfo && role === "patient") ? (
              <div className="p-2 bg-gray-100 rounded border border-gray-200">
                <p className="text-gray-500 italic">To view your medical history, toggle "Show Sensitive Information" above.</p>
              </div>
            ) : (
              <Textarea
                id="medical-history"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                disabled={!isEditing}
              />
            )}
          </div>
          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-medical-blue hover:bg-medical-blue/90">
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default PatientProfile;
