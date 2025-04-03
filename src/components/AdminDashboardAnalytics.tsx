
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAppointments, mockDoctors } from "@/data/mockData";
import { PriorityLevel } from "@/types";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminDashboardAnalytics = () => {
  // Calculate appointment distribution by priority
  const priorityDistribution = () => {
    const distribution = { high: 0, medium: 0, low: 0 };
    
    mockAppointments.forEach(appointment => {
      distribution[appointment.priorityLevel]++;
    });
    
    return [
      { name: "High", value: distribution.high, fill: "#f87171" },
      { name: "Medium", value: distribution.medium, fill: "#fbbf24" },
      { name: "Low", value: distribution.low, fill: "#34d399" }
    ];
  };
  
  // Calculate doctor utilization based on appointments
  const doctorUtilization = () => {
    const utilization: Record<string, { name: string, appointments: number }> = {};
    
    // Initialize for all doctors
    mockDoctors.forEach(doctor => {
      utilization[doctor.id] = { name: doctor.name, appointments: 0 };
    });
    
    // Count appointments per doctor
    mockAppointments.forEach(appointment => {
      if (utilization[appointment.doctorId]) {
        utilization[appointment.doctorId].appointments++;
      }
    });
    
    return Object.values(utilization);
  };
  
  // Calculate appointment status distribution
  const appointmentStatusDistribution = () => {
    const statuses = { scheduled: 0, completed: 0, cancelled: 0 };
    
    mockAppointments.forEach(appointment => {
      statuses[appointment.status]++;
    });
    
    return [
      { name: "Scheduled", value: statuses.scheduled, fill: "#60a5fa" },
      { name: "Completed", value: statuses.completed, fill: "#34d399" },
      { name: "Cancelled", value: statuses.cancelled, fill: "#f87171" }
    ];
  };
  
  // Calculate priority level by doctor specialty
  const priorityBySpecialty = () => {
    const specialties: Record<string, { name: string, high: number, medium: number, low: number }> = {};
    
    // First get all specialties
    mockDoctors.forEach(doctor => {
      if (!specialties[doctor.specialty]) {
        specialties[doctor.specialty] = { 
          name: doctor.specialty, 
          high: 0, 
          medium: 0, 
          low: 0 
        };
      }
    });
    
    // Then count appointments by specialty and priority
    mockAppointments.forEach(appointment => {
      const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
      
      if (doctor && specialties[doctor.specialty]) {
        specialties[doctor.specialty][appointment.priorityLevel]++;
      }
    });
    
    return Object.values(specialties);
  };
  
  // High priority patients details for the table
  const highPriorityAppointments = mockAppointments.filter(
    apt => apt.priorityLevel === "high" && apt.status === "scheduled"
  );
  
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="priority">Priority Analysis</TabsTrigger>
        <TabsTrigger value="doctors">Doctor Utilization</TabsTrigger>
        <TabsTrigger value="high-priority">High Priority</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {/* Priority Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Priority Distribution</CardTitle>
              <CardDescription>
                Breakdown of appointments by priority level
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityDistribution()}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {priorityDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Appointment Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Status</CardTitle>
              <CardDescription>
                Current status of all appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentStatusDistribution()}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {appointmentStatusDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="priority" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution by Specialty</CardTitle>
            <CardDescription>
              How priority levels are distributed across medical specialties
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityBySpecialty()} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="high" name="High Priority" fill="#f87171" />
                <Bar dataKey="medium" name="Medium Priority" fill="#fbbf24" />
                <Bar dataKey="low" name="Low Priority" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="doctors" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Doctor Appointment Load</CardTitle>
            <CardDescription>
              Number of appointments assigned to each doctor
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorUtilization()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" name="Number of Appointments" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="high-priority" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>High Priority Appointments</CardTitle>
            <CardDescription>
              Details of upcoming high priority appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {highPriorityAppointments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {highPriorityAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.patientName}</TableCell>
                      <TableCell>{appointment.doctorName}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No high priority appointments scheduled
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardAnalytics;
