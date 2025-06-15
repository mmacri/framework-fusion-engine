
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, AlertTriangle, CheckCircle, X, Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Notification {
  id: string;
  type: "alert" | "reminder" | "update" | "success";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: "low" | "medium" | "high";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Critical Gap Identified",
    message: "AI detected a critical gap in access control implementation for PCI requirement 7.1.1",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    priority: "high"
  },
  {
    id: "2",
    type: "reminder",
    title: "Assessment Due Soon",
    message: "Q1 SOX Assessment is due in 3 days. Current progress: 65%",
    timestamp: "2024-01-15T09:15:00Z",
    read: false,
    priority: "medium"
  },
  {
    id: "3",
    type: "update",
    title: "Framework Updated",
    message: "NIST 800-53 Rev 5 has been updated with new control enhancements",
    timestamp: "2024-01-15T08:45:00Z",
    read: true,
    priority: "low"
  },
  {
    id: "4",
    type: "success",
    title: "Report Generated",
    message: "Your compliance report for HIPAA has been successfully generated and is ready for download",
    timestamp: "2024-01-15T08:00:00Z",
    read: true,
    priority: "low"
  }
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "reminder": return <Clock className="h-4 w-4 text-orange-500" />;
      case "update": return <Bell className="h-4 w-4 text-blue-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-orange-500";
      case "low": return "border-l-blue-500";
      default: return "border-l-gray-300";
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              {unreadCount} unread notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      border-l-4 p-4 border-b border-border cursor-pointer transition-colors
                      ${getPriorityColor(notification.priority)}
                      ${!notification.read ? 'bg-muted/50' : 'hover:bg-muted/30'}
                    `}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getTypeIcon(notification.type)}
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
