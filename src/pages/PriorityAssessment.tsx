
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import PriorityAssessmentForm from "@/components/PriorityAssessmentForm";
import { PriorityLevel } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PriorityAssessment = () => {
  const [priority, setPriority] = useState<PriorityLevel | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePriorityDetermined = (determinedPriority: PriorityLevel) => {
    setPriority(determinedPriority);
    
    // Show a toast notification with the assessment result
    const priorityMessages = {
      high: "Your symptoms require prompt attention. We'll prioritize your appointment.",
      medium: "Your assessment indicates a standard priority level.",
      low: "Your assessment indicates a routine priority level."
    };
    
    toast({
      title: `Assessment Complete: ${determinedPriority.charAt(0).toUpperCase() + determinedPriority.slice(1)} Priority`,
      description: priorityMessages[determinedPriority],
    });
  };
  
  const proceedToBooking = () => {
    // In a real app, this would store the priority level somewhere
    navigate("/doctor-availability");
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Health Assessment</h2>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Automated Health Assessment</CardTitle>
          <CardDescription>
            Please answer these questions to help us determine the priority of your appointment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PriorityAssessmentForm onPriorityDetermined={handlePriorityDetermined} />
          
          {priority && (
            <div className="flex justify-end mt-6">
              <Button onClick={proceedToBooking} className="gap-2">
                View Doctor Availability
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default PriorityAssessment;
