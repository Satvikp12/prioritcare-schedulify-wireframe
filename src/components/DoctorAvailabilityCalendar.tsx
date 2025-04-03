
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDoctors } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format, addDays, startOfDay } from "date-fns";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

// Helper function to generate a schedule for a whole week
const generateWeeklySchedule = (doctorId: string) => {
  const today = startOfDay(new Date());
  const weekSchedule = [];
  
  // Generate schedule for the next 14 days
  for (let i = 0; i < 14; i++) {
    const currentDate = addDays(today, i);
    const dayOfWeek = format(currentDate, 'EEEE');
    const dateString = format(currentDate, 'yyyy-MM-dd');
    
    // Doctors work on specific days
    const doctor = mockDoctors.find(d => d.id === doctorId);
    const isWorkingDay = doctor?.availability.includes(dayOfWeek);
    
    // Generate slots for working days
    const slots = [];
    if (isWorkingDay) {
      for (let hour = 8; hour <= 16; hour++) {
        // Randomly determine if slot is available (70% chance of availability)
        const isAvailable = Math.random() > 0.3;
        slots.push({
          time: `${hour.toString().padStart(2, '0')}:00`,
          available: isAvailable
        });
      }
    }
    
    weekSchedule.push({
      date: dateString,
      day: dayOfWeek,
      slots: slots
    });
  }
  
  return weekSchedule;
};

const DoctorAvailabilityCalendar = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [schedule, setSchedule] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // When doctor changes, generate a new schedule
  useEffect(() => {
    if (selectedDoctor) {
      setSchedule(generateWeeklySchedule(selectedDoctor));
    }
  }, [selectedDoctor]);
  
  // Filter slots for the selected date
  const getAvailableSlotsForDate = () => {
    if (!selectedDate || !schedule.length) return [];
    
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const daySchedule = schedule.find(day => day.date === dateString);
    
    return daySchedule?.slots || [];
  };
  
  const availableSlots = getAvailableSlotsForDate();
  
  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedSlot) {
      // In a real app, you would save these details or pass them to the booking page
      navigate(`/book-appointment?doctor=${selectedDoctor}&date=${format(selectedDate, 'yyyy-MM-dd')}&time=${selectedSlot}`);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Doctor Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="doctor-select">Select Doctor</Label>
          <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
            <SelectTrigger id="doctor-select">
              <SelectValue placeholder="Choose a doctor" />
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
        
        {selectedDoctor && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => {
                  // Disable past dates and dates without availability
                  if (date < startOfDay(new Date())) return true;
                  
                  const dateString = format(date, 'yyyy-MM-dd');
                  const daySchedule = schedule.find(day => day.date === dateString);
                  return !daySchedule || daySchedule.slots.length === 0;
                }}
                initialFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label>Available Time Slots</Label>
              {selectedDate ? (
                availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedSlot === slot.time ? "default" : "outline"}
                        className={!slot.available ? "opacity-50 cursor-not-allowed" : ""}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 border rounded-md bg-gray-50">
                    <CalendarIcon className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">No available slots on this date</p>
                    <p className="text-xs text-gray-400">Please select another date</p>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-32 border rounded-md bg-gray-50">
                  <CalendarIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Please select a date</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {selectedDoctor && selectedDate && selectedSlot && (
          <div className="pt-4">
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {mockDoctors.find(d => d.id === selectedDoctor)?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {format(selectedDate, 'MMMM do, yyyy')} at {selectedSlot}
                </p>
              </div>
              <Button onClick={handleBookAppointment}>
                Book This Slot
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorAvailabilityCalendar;
