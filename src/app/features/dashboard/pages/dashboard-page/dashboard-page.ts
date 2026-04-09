import { Component } from '@angular/core';
import { CurrencyPipe, DecimalPipe, NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideTrendingUp,
  lucideTrendingDown,
  lucideArrowUpRight,
  lucideArrowDownRight,
  lucideWallet,
  lucideCreditCard,
  lucidePiggyBank,
  lucideDollarSign,
  lucideMoreHorizontal
} from '@ng-icons/lucide';

@Component({
  selector: 'app-dashboard-page',
  imports: [NgClass, NgIcon, CurrencyPipe, DecimalPipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  providers: [
    provideIcons({
      lucideTrendingUp,
      lucideTrendingDown,
      lucideArrowUpRight,
      lucideArrowDownRight,
      lucideWallet,
      lucideCreditCard,
      lucidePiggyBank,
      lucideDollarSign,
      lucideMoreHorizontal
    })
  ]
})
export class DashboardPage {
  // Mock data
  netWorthData = [
    {
      currency: "MXN",
      symbol: "$",
      amount: 458750.32,
      change: 12.5,
      isPositive: true,
    },
    {
      currency: "USD",
      symbol: "$",
      amount: 26543.18,
      change: 8.2,
      isPositive: true,
    },
  ];

  accountSummary = [
    { name: "Cash", amount: 125430.5, icon: "lucideWallet", color: "bg-chart-1" },
    { name: "Credit", amount: -42580.0, icon: "lucideCreditCard", color: "bg-destructive" },
    { name: "Investments", amount: 375900.0, icon: "lucideTrendingUp", color: "bg-chart-2" },
    { name: "Savings", amount: 89000.0, icon: "lucidePiggyBank", color: "bg-chart-3" },
  ];

  recentTransactions = [
    {
      id: 1,
      description: "Oxxo - Groceries",
      category: "Food & Dining",
      amount: -485.5,
      date: "Today",
      icon: "🛒",
    },
    {
      id: 2,
      description: "Payroll Deposit",
      category: "Income",
      amount: 45000.0,
      date: "Yesterday",
      icon: "💰",
    },
    {
      id: 3,
      description: "Netflix Subscription",
      category: "Entertainment",
      amount: -299.0,
      date: "Apr 5",
      icon: "🎬",
    },
    {
      id: 4,
      description: "Uber Ride",
      category: "Transportation",
      amount: -156.8,
      date: "Apr 5",
      icon: "🚗",
    },
    {
      id: 5,
      description: "Transfer to Savings",
      category: "Transfer",
      amount: -5000.0,
      date: "Apr 4",
      icon: "🏦",
    },
  ];

  budgetAlerts = [
    { category: "Dining Out", spent: 4200, limit: 5000, percentage: 84 },
    { category: "Entertainment", spent: 1800, limit: 2000, percentage: 90 },
    { category: "Shopping", spent: 6500, limit: 8000, percentage: 81 },
  ];
}
