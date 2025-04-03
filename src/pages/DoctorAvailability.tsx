
import MainLayout from "@/components/MainLayout";
import DoctorAvailabilityCalendar from "@/components/DoctorAvailabilityCalendar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorAvailability = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Doctor Availability</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => navigate("/priority-assessment")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Assessment
        </Button>
      </div>
      
      <div className="grid gap-6">
        <DoctorAvailabilityCalendar />
      </div>
    </MainLayout>
  );
};

export default DoctorAvailability;
