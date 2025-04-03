
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import PatientProfile from "./pages/PatientProfile";
import BookAppointment from "./pages/BookAppointment";
import PriorityAssessment from "./pages/PriorityAssessment";
import DoctorAvailability from "./pages/DoctorAvailability";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Admin Route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, role } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Patient Route component
const PatientRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, role } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (role !== "patient") {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/appointments" 
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <AdminRoute>
            <Settings />
          </AdminRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <PatientRoute>
            <PatientProfile />
          </PatientRoute>
        } 
      />
      <Route 
        path="/book-appointment" 
        element={
          <PatientRoute>
            <BookAppointment />
          </PatientRoute>
        } 
      />
      {/* New routes */}
      <Route 
        path="/priority-assessment" 
        element={
          <PatientRoute>
            <PriorityAssessment />
          </PatientRoute>
        } 
      />
      <Route 
        path="/doctor-availability" 
        element={
          <PatientRoute>
            <DoctorAvailability />
          </PatientRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
