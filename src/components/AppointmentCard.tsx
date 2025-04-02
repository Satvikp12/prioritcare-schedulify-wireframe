
import { Appointment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PriorityBadge from "./PriorityBadge";
import { Calendar, Clock, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AppointmentCardProps {
  appointment: Appointment;
  isAdminView?: boolean;
}

const AppointmentCard = ({ appointment, isAdminView = false }: AppointmentCardProps) => {
  const { role } = useAuth();
  
  // Determine if we should mask sensitive information
  const shouldMaskData = role === "patient" && !isAdminView;
  
  // Get masked patient name if needed
  const getPatientName = () => {
    if (shouldMaskData && appointment.patientId !== role) {
      return "Patient";  // Hide other patient names from patients
    }
    return appointment.patientName;
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          {isAdminView ? getPatientName() : appointment.doctorName}
        </CardTitle>
        <PriorityBadge 
          priority={appointment.priorityLevel} 
          role={role}
          hideDetails={shouldMaskData}
        />
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-medical-blue" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-medical-blue" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-medical-blue" />
            <span>
              {isAdminView ? appointment.doctorName : getPatientName()}
            </span>
          </div>
          {appointment.notes && !shouldMaskData && (
            <div className="mt-2 text-sm text-gray-600">
              <p className="font-medium">Notes:</p>
              <p>{appointment.notes}</p>
            </div>
          )}
          {appointment.notes && shouldMaskData && (
            <div className="mt-2 text-sm text-gray-600">
              <p className="font-medium">Notes:</p>
              <p className="italic text-gray-500">[Private medical information]</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
