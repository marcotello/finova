import { Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePlus,
  lucideShoppingCart,
  lucideUtensils,
  lucideCar,
  lucideHome,
  lucideZap,
  lucideFilm,
  lucidePlane,
  lucideHeartPulse,
  lucideGraduationCap,
  lucideAlertTriangle,
  lucideCheckCircle,
  lucideEdit2,
  lucideTrash2,
} from '@ng-icons/lucide';

interface Budget {
  id: string;
  category: string;
  icon: string;
  color: string;
  spent: number;
  limit: number;
  period: "monthly" | "weekly";
}

const BUDGETS: Budget[] = [
  { id: "1", category: "Food & Dining", icon: 'lucideUtensils', color: "bg-chart-1", spent: 4200, limit: 5000, period: "monthly" },
  { id: "2", category: "Shopping", icon: 'lucideShoppingCart', color: "bg-chart-2", spent: 6500, limit: 8000, period: "monthly" },
  { id: "3", category: "Transportation", icon: 'lucideCar', color: "bg-chart-3", spent: 2800, limit: 3500, period: "monthly" },
  { id: "4", category: "Entertainment", icon: 'lucideFilm', color: "bg-chart-4", spent: 1800, limit: 2000, period: "monthly" },
  { id: "5", category: "Housing", icon: 'lucideHome', color: "bg-chart-5", spent: 15000, limit: 15000, period: "monthly" },
  { id: "6", category: "Utilities", icon: 'lucideZap', color: "bg-secondary", spent: 2100, limit: 3000, period: "monthly" },
  { id: "7", category: "Healthcare", icon: 'lucideHeartPulse', color: "bg-destructive", spent: 1500, limit: 4000, period: "monthly" },
  { id: "8", category: "Travel", icon: 'lucidePlane', color: "bg-primary", spent: 3200, limit: 10000, period: "monthly" },
];

@Component({
  selector: 'app-budgets-page',
  imports: [NgClass, NgIcon, CurrencyPipe],
  templateUrl: './budgets-page.html',
  styleUrl: './budgets-page.css',
  providers: [
    provideIcons({
      lucidePlus,
      lucideShoppingCart,
      lucideUtensils,
      lucideCar,
      lucideHome,
      lucideZap,
      lucideFilm,
      lucidePlane,
      lucideHeartPulse,
      lucideGraduationCap,
      lucideAlertTriangle,
      lucideCheckCircle,
      lucideEdit2,
      lucideTrash2,
    })
  ]
})
export class BudgetsPage {
  readonly Math = Math;
  readonly budgets = BUDGETS;

  get totalSpent() { return this.budgets.reduce((sum, b) => sum + b.spent, 0); }
  get totalLimit() { return this.budgets.reduce((sum, b) => sum + b.limit, 0); }
  get overallPercentage() { return Math.round((this.totalSpent / this.totalLimit) * 100); }

  get warningBudgets() { return this.budgets.filter((b) => (b.spent / b.limit) * 100 >= 80); }
  get onTrackBudgets() { return this.budgets.filter((b) => (b.spent / b.limit) * 100 < 80); }

  getPercentage(spent: number, limit: number) {
    return Math.round((spent / limit) * 100);
  }

  getStatusColor(percentage: number) {
    if (percentage >= 100) return "bg-destructive";
    if (percentage >= 80) return "bg-yellow-500";
    return "bg-chart-1";
  }

  getStatusText(percentage: number) {
    if (percentage >= 100) return { text: "Over budget", color: "text-destructive" };
    if (percentage >= 90) return { text: "Critical", color: "text-destructive" };
    if (percentage >= 80) return { text: "Warning", color: "text-yellow-500" };
    return { text: "On track", color: "text-chart-1" };
  }
}
