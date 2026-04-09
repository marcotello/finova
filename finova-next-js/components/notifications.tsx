"use client";

import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  CreditCard,
  Target,
  Calendar,
  Trash2,
  Check,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "alert" | "success" | "info" | "warning";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category: "budget" | "transaction" | "goal" | "system";
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Budget Alert: Entertainment",
    message:
      "You've used 90% of your Entertainment budget ($1,800 of $2,000). Consider reducing spending.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    category: "budget",
  },
  {
    id: "2",
    type: "alert",
    title: "Large Transaction Detected",
    message:
      "A transaction of $15,000 was made from BBVA Checking for rent payment.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    category: "transaction",
  },
  {
    id: "3",
    type: "success",
    title: "Goal Milestone Reached!",
    message:
      "Congratulations! You've reached 75% of your Emergency Fund goal.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: false,
    category: "goal",
  },
  {
    id: "4",
    type: "info",
    title: "Monthly Report Ready",
    message:
      "Your March 2026 financial summary is now available. View your spending insights.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    category: "system",
  },
  {
    id: "5",
    type: "warning",
    title: "Budget Alert: Food & Dining",
    message:
      "You've used 84% of your Food & Dining budget ($4,200 of $5,000).",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
    category: "budget",
  },
  {
    id: "6",
    type: "success",
    title: "Automatic Savings Transfer",
    message:
      "Successfully transferred $5,000 to your Vacation savings goal.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    read: true,
    category: "transaction",
  },
  {
    id: "7",
    type: "info",
    title: "New Feature: Finny AI",
    message:
      "Meet Finny, your new AI financial assistant! Ask questions about your spending and get personalized insights.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    read: true,
    category: "system",
  },
];

const typeIcons = {
  alert: AlertTriangle,
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
};

const typeColors = {
  alert: "text-destructive bg-destructive/10",
  success: "text-chart-1 bg-chart-1/10",
  info: "text-primary bg-primary/10",
  warning: "text-yellow-500 bg-yellow-500/10",
};

const categoryIcons = {
  budget: TrendingUp,
  transaction: CreditCard,
  goal: Target,
  system: Bell,
};

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread" && n.read) return false;
    if (categoryFilter !== "all" && n.category !== categoryFilter) return false;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Stay updated on your financial activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
          >
            <Check className="h-4 w-4" />
            Mark all read
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
          >
            <Trash2 className="h-4 w-4" />
            Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === "unread"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Unread ({unreadCount})
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            <option value="budget">Budget Alerts</option>
            <option value="transaction">Transactions</option>
            <option value="goal">Goals</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-card-foreground">
              No notifications
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              You&apos;re all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const TypeIcon = typeIcons[notification.type];
            const CategoryIcon = categoryIcons[notification.category];

            return (
              <div
                key={notification.id}
                className={cn(
                  "group rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md",
                  notification.read
                    ? "border-border"
                    : "border-primary/30 bg-primary/5"
                )}
              >
                <div className="flex gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      typeColors[notification.type]
                    )}
                  >
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p
                            className={cn(
                              "font-medium",
                              notification.read
                                ? "text-card-foreground"
                                : "text-foreground"
                            )}
                          >
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CategoryIcon className="h-3 w-3" />
                            <span className="capitalize">
                              {notification.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatTimeAgo(notification.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="rounded-md p-1.5 hover:bg-muted"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4 text-muted-foreground" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="rounded-md p-1.5 hover:bg-muted"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
