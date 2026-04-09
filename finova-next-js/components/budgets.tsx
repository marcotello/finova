"use client";

import { useState } from "react";
import {
  Plus,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Zap,
  Film,
  Plane,
  HeartPulse,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Budget {
  id: string;
  category: string;
  icon: typeof ShoppingCart;
  color: string;
  spent: number;
  limit: number;
  period: "monthly" | "weekly";
}

const budgets: Budget[] = [
  {
    id: "1",
    category: "Food & Dining",
    icon: Utensils,
    color: "bg-chart-1",
    spent: 4200,
    limit: 5000,
    period: "monthly",
  },
  {
    id: "2",
    category: "Shopping",
    icon: ShoppingCart,
    color: "bg-chart-2",
    spent: 6500,
    limit: 8000,
    period: "monthly",
  },
  {
    id: "3",
    category: "Transportation",
    icon: Car,
    color: "bg-chart-3",
    spent: 2800,
    limit: 3500,
    period: "monthly",
  },
  {
    id: "4",
    category: "Entertainment",
    icon: Film,
    color: "bg-chart-4",
    spent: 1800,
    limit: 2000,
    period: "monthly",
  },
  {
    id: "5",
    category: "Housing",
    icon: Home,
    color: "bg-chart-5",
    spent: 15000,
    limit: 15000,
    period: "monthly",
  },
  {
    id: "6",
    category: "Utilities",
    icon: Zap,
    color: "bg-secondary",
    spent: 2100,
    limit: 3000,
    period: "monthly",
  },
  {
    id: "7",
    category: "Healthcare",
    icon: HeartPulse,
    color: "bg-destructive",
    spent: 1500,
    limit: 4000,
    period: "monthly",
  },
  {
    id: "8",
    category: "Travel",
    icon: Plane,
    color: "bg-primary",
    spent: 3200,
    limit: 10000,
    period: "monthly",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getStatusColor(percentage: number) {
  if (percentage >= 100) return "bg-destructive";
  if (percentage >= 80) return "bg-yellow-500";
  return "bg-chart-1";
}

function getStatusText(percentage: number) {
  if (percentage >= 100) return { text: "Over budget", color: "text-destructive" };
  if (percentage >= 90) return { text: "Critical", color: "text-destructive" };
  if (percentage >= 80) return { text: "Warning", color: "text-yellow-500" };
  return { text: "On track", color: "text-chart-1" };
}

export function Budgets() {
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const overallPercentage = Math.round((totalSpent / totalLimit) * 100);

  const warningBudgets = budgets.filter((b) => (b.spent / b.limit) * 100 >= 80);
  const onTrackBudgets = budgets.filter((b) => (b.spent / b.limit) * 100 < 80);

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Budgets</h1>
          <p className="text-sm text-muted-foreground">
            Track your spending limits by category
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Create Budget
        </button>
      </div>

      {/* Overall Summary */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Monthly Budget
            </p>
            <p className="text-3xl font-bold text-card-foreground">
              {formatCurrency(totalSpent)}{" "}
              <span className="text-lg font-normal text-muted-foreground">
                / {formatCurrency(totalLimit)}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5",
                overallPercentage >= 80 ? "bg-destructive/10" : "bg-chart-1/10"
              )}
            >
              {overallPercentage >= 80 ? (
                <AlertTriangle className="h-4 w-4 text-destructive" />
              ) : (
                <CheckCircle className="h-4 w-4 text-chart-1" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  overallPercentage >= 80 ? "text-destructive" : "text-chart-1"
                )}
              >
                {overallPercentage}% used
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative h-3 overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "absolute left-0 top-0 h-full rounded-full transition-all",
                getStatusColor(overallPercentage)
              )}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Warning Budgets */}
      {warningBudgets.length > 0 && (
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-semibold text-foreground">
              Needs Attention
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {warningBudgets.map((budget) => {
              const percentage = Math.round((budget.spent / budget.limit) * 100);
              const status = getStatusText(percentage);
              const Icon = budget.icon;

              return (
                <div
                  key={budget.id}
                  className="group rounded-xl border border-destructive/30 bg-card p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          budget.color
                        )}
                      >
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">
                          {budget.category}
                        </p>
                        <p className={cn("text-sm font-medium", status.color)}>
                          {status.text}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-md p-1.5 hover:bg-muted">
                        <Edit2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="rounded-md p-1.5 hover:bg-muted">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-card-foreground">
                        {formatCurrency(budget.spent)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        of {formatCurrency(budget.limit)}
                      </p>
                    </div>
                    <div className="mt-2">
                      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "absolute left-0 top-0 h-full rounded-full transition-all",
                            getStatusColor(percentage)
                          )}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {formatCurrency(Math.max(budget.limit - budget.spent, 0))}{" "}
                      remaining
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* On Track Budgets */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-chart-1" />
          <h2 className="text-lg font-semibold text-foreground">On Track</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {onTrackBudgets.map((budget) => {
            const percentage = Math.round((budget.spent / budget.limit) * 100);
            const Icon = budget.icon;

            return (
              <div
                key={budget.id}
                className="group rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        budget.color
                      )}
                    >
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">
                        {budget.category}
                      </p>
                      <p className="text-sm text-chart-1">On track</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded-md p-1.5 hover:bg-muted">
                      <Edit2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="rounded-md p-1.5 hover:bg-muted">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-card-foreground">
                      {formatCurrency(budget.spent)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      of {formatCurrency(budget.limit)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-chart-1 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatCurrency(budget.limit - budget.spent)} remaining
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
