
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Bell, Calendar, Home, LogOut, Settings, UserCircle, Users
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { logout, role } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-medical-light">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-medical-blue">PriorityCare</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive("/dashboard")
                    ? "bg-medical-blue bg-opacity-10 text-medical-blue font-medium border-l-4 border-medical-blue"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/appointments"
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive("/appointments")
                    ? "bg-medical-blue bg-opacity-10 text-medical-blue font-medium border-l-4 border-medical-blue"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Calendar className="h-5 w-5 mr-3" />
                Appointments
              </Link>
            </li>
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/users"
                    className={`flex items-center px-6 py-3 text-sm ${
                      isActive("/users")
                        ? "bg-medical-blue bg-opacity-10 text-medical-blue font-medium border-l-4 border-medical-blue"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Users className="h-5 w-5 mr-3" />
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className={`flex items-center px-6 py-3 text-sm ${
                      isActive("/settings")
                        ? "bg-medical-blue bg-opacity-10 text-medical-blue font-medium border-l-4 border-medical-blue"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive("/profile")
                    ? "bg-medical-blue bg-opacity-10 text-medical-blue font-medium border-l-4 border-medical-blue"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <UserCircle className="h-5 w-5 mr-3" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            {location.pathname === "/dashboard"
              ? "Dashboard"
              : location.pathname === "/appointments"
              ? "Appointments"
              : location.pathname === "/users"
              ? "User Management"
              : location.pathname === "/settings"
              ? "System Settings"
              : location.pathname === "/profile"
              ? "Your Profile"
              : ""}
          </h1>
          <div className="flex items-center space-x-4">
            <Link to="/notifications">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
