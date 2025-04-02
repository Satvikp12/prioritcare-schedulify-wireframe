
import { Appointment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PriorityBadge from "./PriorityBadge";
import { Calendar, Clock, User } from "lucide-react";

interface AppointmentCardProps {
  appointment: Appointment;
  isAdminView?: boolean;
}

const AppointmentCard = ({ appointment, isAdminView = false }: AppointmentCardProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          {isAdminView ? appointment.patientName : appointment.doctorName}
        </CardTitle>
        <PriorityBadge priority={appointment.priorityLevel} />
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
              {isAdminView ? appointment.doctorName : appointment.patientName}
            </span>
          </div>
          {appointment.notes && (
            <div className="mt-2 text-sm text-gray-600">
              <p className="font-medium">Notes:</p>
              <p>{appointment.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
