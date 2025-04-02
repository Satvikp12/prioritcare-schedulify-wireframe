
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { mockNotifications } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import NotificationItem from "@/components/NotificationItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

const Notifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState(mockNotifications);

  // Filter notifications for the current user
  const userNotifications = notifications.filter(
    (notification) => currentUser && notification.userId === currentUser.id
  );

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) =>
        currentUser && notification.userId === currentUser.id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notifications</h2>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            className="flex items-center"
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {userNotifications.length > 0 ? (
            <div className="space-y-3">
              {userNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No notifications available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Notifications;
