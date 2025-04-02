
import { Notification } from "@/types";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  return (
    <div
      className={cn(
        "p-3 rounded-md mb-2 flex items-start",
        notification.read ? "bg-gray-50" : "bg-blue-50"
      )}
    >
      <Bell
        className={cn(
          "h-5 w-5 mr-3 mt-0.5",
          notification.read ? "text-gray-400" : "text-medical-blue"
        )}
      />
      <div className="flex-1">
        <p className={cn("text-sm", notification.read ? "font-normal" : "font-medium")}>
          {notification.message}
        </p>
        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
      </div>
      {!notification.read && onMarkAsRead && (
        <button
          onClick={() => onMarkAsRead(notification.id)}
          className="text-xs text-medical-blue hover:underline"
        >
          Mark as read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
