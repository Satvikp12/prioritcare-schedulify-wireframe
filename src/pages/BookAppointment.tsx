
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { mockDoctors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TimeSlot } from "@/types";
import { useNavigate } from "react-router-dom";

// Generate time slots from 8 AM to 5 PM
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour <= 17; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    slots.push({ time, available: Math.random() > 0.3 }); // Randomly make some slots unavailable
  }
  return slots;
};

const BookAppointment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  // When doctor or date changes, regenerate available slots
  useEffect(() => {
    if (selectedDoctor && date) {
      setAvailableSlots(generateTimeSlots());
    }
  }, [selectedDoctor, date]);
  
  const handleBookAppointment = () => {
    if (!date || !selectedDoctor || !selectedSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a doctor, date, and time slot.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would create an appointment in the database
    toast({
      title: "Appointment Booked",
      description: `Your appointment has been scheduled for ${format(date, 'MMMM do, yyyy')} at ${selectedSlot}.`,
    });
    
    // Redirect to appointments page
    navigate("/appointments");
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Book an Appointment</h2>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Schedule a New Appointment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
              <SelectTrigger id="doctor">
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
          
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    // Disable past dates and weekends
                    const day = date.getDay();
                    return date < new Date() || day === 0 || day === 6;
                  }}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {selectedDoctor && date && (
            <div className="space-y-2">
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedSlot === slot.time ? "default" : "outline"}
                    className={cn(
                      "h-10",
                      !slot.available && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any specific concerns or information for the doctor..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <Button
            onClick={handleBookAppointment}
            disabled={!date || !selectedDoctor || !selectedSlot}
            className="w-full bg-medical-blue hover:bg-medical-blue/90"
          >
            Book Appointment
          </Button>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default BookAppointment;
