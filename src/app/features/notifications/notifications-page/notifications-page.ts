import { Component, computed, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBell,
  lucideAlertTriangle,
  lucideCheckCircle,
  lucideInfo,
  lucideTrendingUp,
  lucideCreditCard,
  lucideTarget,
  lucideCalendar,
  lucideTrash2,
  lucideCheck,
  lucideFilter,
} from '@ng-icons/lucide';

interface CustomNotification {
  id: string;
  type: "alert" | "success" | "info" | "warning";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category: "budget" | "transaction" | "goal" | "system";
}

const INITIAL_NOTIFICATIONS: CustomNotification[] = [
  {
    id: "1",
    type: "warning",
    title: "Budget Alert: Entertainment",
    message: "You've used 90% of your Entertainment budget ($1,800 of $2,000). Consider reducing spending.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    category: "budget",
  },
  {
    id: "2",
    type: "alert",
    title: "Large Transaction Detected",
    message: "A transaction of $15,000 was made from BBVA Checking for rent payment.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    category: "transaction",
  },
  {
    id: "3",
    type: "success",
    title: "Goal Milestone Reached!",
    message: "Congratulations! You've reached 75% of your Emergency Fund goal.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: false,
    category: "goal",
  },
  {
    id: "4",
    type: "info",
    title: "Monthly Report Ready",
    message: "Your March 2026 financial summary is now available. View your spending insights.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    category: "system",
  },
  {
    id: "5",
    type: "warning",
    title: "Budget Alert: Food & Dining",
    message: "You've used 84% of your Food & Dining budget ($4,200 of $5,000).",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
    category: "budget",
  },
  {
    id: "6",
    type: "success",
    title: "Automatic Savings Transfer",
    message: "Successfully transferred $5,000 to your Vacation savings goal.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    read: true,
    category: "transaction",
  },
  {
    id: "7",
    type: "info",
    title: "New Feature: Finny AI",
    message: "Meet Finny, your new AI financial assistant! Ask questions about your spending and get personalized insights.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    read: true,
    category: "system",
  },
];

@Component({
  selector: 'app-notifications-page',
  imports: [NgClass, NgIcon, DatePipe, FormsModule],
  templateUrl: './notifications-page.html',
  styleUrl: './notifications-page.css',
  providers: [
    provideIcons({
      lucideBell,
      lucideAlertTriangle,
      lucideCheckCircle,
      lucideInfo,
      lucideTrendingUp,
      lucideCreditCard,
      lucideTarget,
      lucideCalendar,
      lucideTrash2,
      lucideCheck,
      lucideFilter,
    })
  ]
})
export class NotificationsPage {
  notifications = signal<CustomNotification[]>(INITIAL_NOTIFICATIONS);
  filter = signal<"all" | "unread">("all");
  categoryFilter = signal<string>("all");

  readonly typeIcons: Record<string, string> = {
    alert: 'lucideAlertTriangle',
    success: 'lucideCheckCircle',
    info: 'lucideInfo',
    warning: 'lucideAlertTriangle',
  };

  readonly typeColors: Record<string, string> = {
    alert: "text-destructive bg-destructive/10",
    success: "text-chart-1 bg-chart-1/10",
    info: "text-primary bg-primary/10",
    warning: "text-yellow-500 bg-yellow-500/10",
  };

  readonly categoryIcons: Record<string, string> = {
    budget: 'lucideTrendingUp',
    transaction: 'lucideCreditCard',
    goal: 'lucideTarget',
    system: 'lucideBell',
  };

  unreadCount = computed(() => {
    return this.notifications().filter((n) => !n.read).length;
  });

  filteredNotifications = computed(() => {
    const activeFilter = this.filter();
    const activeCategory = this.categoryFilter();

    return this.notifications().filter((n) => {
      if (activeFilter === "unread" && n.read) return false;
      if (activeCategory !== "all" && n.category !== activeCategory) return false;
      return true;
    });
  });

  markAsRead(id: string) {
    this.notifications.update(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  }

  markAllAsRead() {
    this.notifications.update(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  }

  deleteNotification(id: string) {
    this.notifications.update(prev => prev.filter(n => n.id !== id));
  }

  clearAll() {
    this.notifications.set([]);
  }

  formatTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    
    // Instead of instantiating another pipe here simply fallback directly to Date functions
    return date.toLocaleDateString();
  }
}
