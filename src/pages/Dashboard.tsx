
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAppointments, mockDoctors, mockPatients, mockNotifications } from "@/data/mockData";
import AppointmentCard from "@/components/AppointmentCard";
import NotificationItem from "@/components/NotificationItem";
import { UserCircle, Users, Calendar, Bell } from "lucide-react";

const Dashboard = () => {
  const { role, currentUser } = useAuth();
  
  // Filter appointments based on user role and status
  const todaysAppointments = mockAppointments
    .filter(apt => {
      // For patients, only show their own appointments
      if (role === "patient") {
        return apt.status === "scheduled" && currentUser && apt.patientId === currentUser.id;
      }
      // For doctors and admins, show all scheduled appointments
      return apt.status === "scheduled";
    })
    .slice(0, 3);
  
  // Filter notifications for the current user
  const userNotifications = mockNotifications
    .filter(notification => currentUser && notification.userId === currentUser.id)
    .slice(0, 3);
  
  return (
    <MainLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {role === "patient" ? "My Appointments" : "Total Appointments"}
            </CardTitle>
            <Calendar className="h-4 w-4 text-medical-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {role === "patient" 
                ? mockAppointments.filter(a => currentUser && a.patientId === currentUser.id).length 
                : mockAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {role === "patient"
                ? mockAppointments.filter(a => currentUser && a.patientId === currentUser.id && a.status === "scheduled").length + " upcoming"
                : mockAppointments.filter(a => a.status === "scheduled").length + " upcoming"}
            </p>
          </CardContent>
        </Card>

        {role === "admin" && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Doctors
                </CardTitle>
                <UserCircle className="h-4 w-4 text-medical-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockDoctors.length}</div>
                <p className="text-xs text-muted-foreground">
                  From {new Set(mockDoctors.map(d => d.specialty)).size} specialties
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
                <Users className="h-4 w-4 text-medical-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockPatients.length}</div>
                <p className="text-xs text-muted-foreground">
                  {mockPatients.filter(p => p.priorityLevel === "high").length} high priority
                </p>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              New Notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-medical-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNotifications.filter(n => !n.read).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {userNotifications.filter(n => !n.read).length} for you
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {todaysAppointments.length > 0 ? (
            todaysAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isAdminView={role === "admin" || role === "doctor"}
              />
            ))
          ) : (
            <Card className="p-4 text-center text-gray-500">
              No upcoming appointments
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          {userNotifications.length > 0 ? (
            userNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <Card className="p-4 text-center text-gray-500">
              No new notifications
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
