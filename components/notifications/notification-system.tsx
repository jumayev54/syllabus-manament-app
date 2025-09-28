"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, AlertCircle, Clock, Users } from "lucide-react"

interface Notification {
  id: string
  type: "approval" | "deadline" | "system" | "user"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "approval",
    title: "Syllabus Pending Approval",
    message: "CS 101 syllabus from Dr. Smith requires your approval",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "deadline",
    title: "Submission Deadline Approaching",
    message: "Syllabus submission deadline is in 3 days",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance on Sunday 2:00 AM - 4:00 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    priority: "low",
  },
  {
    id: "4",
    type: "user",
    title: "New User Registration",
    message: "Prof. Johnson has been added to the system",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
    priority: "low",
  },
]

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [showAll, setShowAll] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length
  const displayNotifications = showAll ? notifications : notifications.slice(0, 5)

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "approval":
        return CheckCircle
      case "deadline":
        return Clock
      case "system":
        return AlertCircle
      case "user":
        return Users
      default:
        return Bell
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show less" : "Show all"}
            </Button>
          </div>
        </div>
        <CardDescription>Stay updated with system activities and important deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayNotifications.map((notification) => {
            const Icon = getIcon(notification.type)
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  !notification.read ? "bg-muted/50" : "hover:bg-muted/30"
                }`}
              >
                <div
                  className={`p-1 rounded-full ${
                    notification.priority === "high"
                      ? "bg-destructive/10"
                      : notification.priority === "medium"
                        ? "bg-primary/10"
                        : "bg-muted"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      notification.priority === "high"
                        ? "text-destructive"
                        : notification.priority === "medium"
                          ? "text-primary"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                      {notification.priority}
                    </Badge>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-6 px-2 text-xs"
                        >
                          Mark read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {notifications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
