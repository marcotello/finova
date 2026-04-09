"use client";

import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  PiggyBank,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const netWorthData = [
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

const accountSummary = [
  { name: "Cash", amount: 125430.5, icon: Wallet, color: "bg-chart-1" },
  { name: "Credit", amount: -42580.0, icon: CreditCard, color: "bg-destructive" },
  { name: "Investments", amount: 375900.0, icon: TrendingUp, color: "bg-chart-2" },
  { name: "Savings", amount: 89000.0, icon: PiggyBank, color: "bg-chart-3" },
];

const recentTransactions = [
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

const budgetAlerts = [
  { category: "Dining Out", spent: 4200, limit: 5000, percentage: 84 },
  { category: "Entertainment", spent: 1800, limit: 2000, percentage: 90 },
  { category: "Shopping", spent: 6500, limit: 8000, percentage: 81 },
];

function formatCurrency(amount: number, currency = "MXN") {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function Dashboard() {
  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s your financial overview.
        </p>
      </div>

      {/* Net Worth Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {netWorthData.map((item) => (
          <div
            key={item.currency}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Net Worth ({item.currency})
                </span>
              </div>
              <button className="rounded-md p-1 hover:bg-muted">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-card-foreground">
                {item.symbol}
                {item.amount.toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <div className="mt-2 flex items-center gap-1">
                {item.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-chart-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    item.isPositive ? "text-chart-1" : "text-destructive"
                  )}
                >
                  {item.change}%
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Account Summary */}
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Account Summary
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {accountSummary.map((account) => (
            <div
              key={account.name}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    account.color
                  )}
                >
                  <account.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{account.name}</p>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      account.amount < 0 ? "text-destructive" : "text-card-foreground"
                    )}
                  >
                    {formatCurrency(account.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="font-semibold text-card-foreground">
              Recent Transactions
            </h2>
            <button className="text-sm text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="divide-y divide-border">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg">
                    {tx.icon}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {tx.description}
                    </p>
                    <p className="text-sm text-muted-foreground">{tx.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "font-semibold",
                      tx.amount < 0 ? "text-card-foreground" : "text-chart-1"
                    )}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {formatCurrency(tx.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Alerts */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="font-semibold text-card-foreground">Budget Alerts</h2>
            <button className="text-sm text-primary hover:underline">
              Manage budgets
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {budgetAlerts.map((budget) => (
                <div key={budget.category}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">
                      {budget.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                    </span>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "absolute left-0 top-0 h-full rounded-full transition-all",
                        budget.percentage >= 90
                          ? "bg-destructive"
                          : budget.percentage >= 80
                          ? "bg-yellow-500"
                          : "bg-chart-1"
                      )}
                      style={{ width: `${budget.percentage}%` }}
                    />
                  </div>
                  {budget.percentage >= 80 && (
                    <p className="mt-1 text-xs text-destructive">
                      {budget.percentage >= 90 ? "Almost at limit!" : "Approaching limit"}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-chart-1" />
                  <span className="text-xs text-muted-foreground">Income</span>
                </div>
                <p className="mt-1 text-lg font-semibold text-card-foreground">
                  {formatCurrency(85000)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="text-xs text-muted-foreground">Expenses</span>
                </div>
                <p className="mt-1 text-lg font-semibold text-card-foreground">
                  {formatCurrency(52340)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
