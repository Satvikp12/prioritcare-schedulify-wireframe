
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { mockAppointments, mockDoctors } from "@/data/mockData";
import AppointmentCard from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PriorityLevel } from "@/types";
import { Calendar, Clock, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Appointments = () => {
  const { role } = useAuth();
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [openDialog, setOpenDialog] = useState(false);

  // Filter appointments based on selected priority
  const filteredAppointments = mockAppointments.filter(
    (apt) =>
      filter === "all" || apt.priorityLevel === filter
  );

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <Button onClick={() => setOpenDialog(true)} className="bg-medical-blue hover:bg-medical-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-medium text-gray-500 mr-3">
                Filter by priority:
              </span>
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="mr-2"
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filter === "high" ? "default" : "outline"}
                onClick={() => setFilter("high")}
                className="mr-2 bg-priority-high text-white border-priority-high hover:bg-priority-high/90"
                size="sm"
              >
                High
              </Button>
              <Button
                variant={filter === "medium" ? "default" : "outline"}
                onClick={() => setFilter("medium")}
                className="mr-2 bg-priority-medium text-white border-priority-medium hover:bg-priority-medium/90"
                size="sm"
              >
                Medium
              </Button>
              <Button
                variant={filter === "low" ? "default" : "outline"}
                onClick={() => setFilter("low")}
                className="bg-priority-low text-white border-priority-low hover:bg-priority-low/90"
                size="sm"
              >
                Low
              </Button>
            </div>

            <Input
              placeholder="Search appointments..."
              className="max-w-xs"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          {filteredAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments
                .filter((apt) => apt.status === "scheduled")
                .map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    isAdminView={role === "admin" || role === "doctor"}
                  />
                ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No upcoming appointments found</p>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          {filteredAppointments
            .filter((apt) => apt.status === "completed")
            .length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments
                .filter((apt) => apt.status === "completed")
                .map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    isAdminView={role === "admin" || role === "doctor"}
                  />
                ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No past appointments found</p>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="canceled" className="mt-4">
          {filteredAppointments
            .filter((apt) => apt.status === "cancelled")
            .length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments
                .filter((apt) => apt.status === "cancelled")
                .map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    isAdminView={role === "admin" || role === "doctor"}
                  />
                ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No canceled appointments found</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* New Appointment Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor
              </Label>
              <Select defaultValue="doc1">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {mockDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3 flex">
                <div className="relative flex-1">
                  <Input
                    id="date"
                    type="date"
                    defaultValue="2023-08-15"
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <div className="col-span-3 flex">
                <div className="relative flex-1">
                  <Input
                    id="time"
                    type="time"
                    defaultValue="09:00"
                    className="pl-10"
                  />
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select defaultValue="medium">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                placeholder="Additional notes for the appointment"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-medical-blue hover:bg-medical-blue/90" 
              onClick={() => setOpenDialog(false)}
            >
              Book Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Appointments;
