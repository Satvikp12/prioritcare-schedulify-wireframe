
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import PriorityAssessmentForm from "@/components/PriorityAssessmentForm";
import { PriorityLevel } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PriorityAssessment = () => {
  const [priority, setPriority] = useState<PriorityLevel | null>(null);
  const navigate = useNavigate();
  
  const handlePriorityDetermined = (determinedPriority: PriorityLevel) => {
    setPriority(determinedPriority);
  };
  
  const proceedToBooking = () => {
    // In a real app, this would store the priority level somewhere
    navigate("/book-appointment");
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Health Priority Assessment</h2>
      </div>
      
      <div className="grid gap-6">
        <PriorityAssessmentForm onPriorityDetermined={handlePriorityDetermined} />
        
        {priority && (
          <div className="flex justify-end">
            <Button onClick={proceedToBooking} className="gap-2">
              Proceed to Book Appointment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PriorityAssessment;
