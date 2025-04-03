
import MainLayout from "@/components/MainLayout";
import DoctorAvailabilityCalendar from "@/components/DoctorAvailabilityCalendar";

const DoctorAvailability = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Doctor Availability</h2>
      </div>
      
      <div className="grid gap-6">
        <DoctorAvailabilityCalendar />
      </div>
    </MainLayout>
  );
};

export default DoctorAvailability;
