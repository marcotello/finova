"use client";

import { useState } from "react";
import {
  Plus,
  Target,
  Plane,
  Home,
  Car,
  GraduationCap,
  Briefcase,
  Heart,
  Sparkles,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Goal {
  id: string;
  name: string;
  icon: typeof Target;
  color: string;
  saved: number;
  target: number;
  deadline: string;
  monthlyContribution: number;
  priority: "high" | "medium" | "low";
}

const goals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    icon: Briefcase,
    color: "bg-chart-1",
    saved: 75000,
    target: 100000,
    deadline: "Dec 2026",
    monthlyContribution: 5000,
    priority: "high",
  },
  {
    id: "2",
    name: "Vacation to Europe",
    icon: Plane,
    color: "bg-chart-2",
    saved: 28000,
    target: 80000,
    deadline: "Jun 2027",
    monthlyContribution: 4000,
    priority: "medium",
  },
  {
    id: "3",
    name: "New Car Down Payment",
    icon: Car,
    color: "bg-chart-3",
    saved: 45000,
    target: 150000,
    deadline: "Dec 2027",
    monthlyContribution: 6000,
    priority: "medium",
  },
  {
    id: "4",
    name: "House Down Payment",
    icon: Home,
    color: "bg-chart-4",
    saved: 180000,
    target: 500000,
    deadline: "Dec 2028",
    monthlyContribution: 10000,
    priority: "high",
  },
  {
    id: "5",
    name: "MBA Program",
    icon: GraduationCap,
    color: "bg-chart-5",
    saved: 12000,
    target: 200000,
    deadline: "Aug 2028",
    monthlyContribution: 7000,
    priority: "low",
  },
  {
    id: "6",
    name: "Wedding Fund",
    icon: Heart,
    color: "bg-secondary",
    saved: 35000,
    target: 120000,
    deadline: "Nov 2027",
    monthlyContribution: 5500,
    priority: "medium",
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

function BucketAnimation({ percentage }: { percentage: number }) {
  const fillHeight = Math.min(percentage, 100);
  
  return (
    <div className="relative h-24 w-16">
      {/* Bucket outline */}
      <div className="absolute inset-0 rounded-b-xl border-2 border-border bg-muted/30">
        {/* Water fill */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-primary to-primary/70 transition-all duration-700 ease-out"
          style={{ height: `${fillHeight}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden rounded-b-lg">
            <div className="absolute -inset-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent" />
          </div>
        </div>
      </div>
      {/* Percentage label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-primary-foreground drop-shadow-sm">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}

export function Goals() {
  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const overallPercentage = Math.round((totalSaved / totalTarget) * 100);

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedGoals = [...goals].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Savings Goals</h1>
          <p className="text-sm text-muted-foreground">
            Track progress towards your financial goals
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Goal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">Active Goals</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-card-foreground">
            {goals.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-chart-1" />
            <p className="text-sm text-muted-foreground">Total Saved</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-chart-1">
            {formatCurrency(totalSaved)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-chart-2" />
            <p className="text-sm text-muted-foreground">Total Target</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-card-foreground">
            {formatCurrency(totalTarget)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-3" />
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-card-foreground">
            {overallPercentage}%
          </p>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedGoals.map((goal) => {
          const percentage = (goal.saved / goal.target) * 100;
          const remaining = goal.target - goal.saved;
          const Icon = goal.icon;

          return (
            <div
              key={goal.id}
              className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      goal.color
                    )}
                  >
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {goal.name}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {goal.deadline}
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    goal.priority === "high"
                      ? "bg-destructive/10 text-destructive"
                      : goal.priority === "medium"
                      ? "bg-yellow-500/10 text-yellow-600"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {goal.priority}
                </span>
              </div>

              {/* Bucket Visualization */}
              <div className="my-5 flex items-center justify-center">
                <BucketAnimation percentage={percentage} />
              </div>

              {/* Progress Details */}
              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Saved</p>
                    <p className="text-xl font-bold text-chart-1">
                      {formatCurrency(goal.saved)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Target</p>
                    <p className="text-xl font-bold text-card-foreground">
                      {formatCurrency(goal.target)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "absolute left-0 top-0 h-full rounded-full transition-all duration-500",
                      goal.color
                    )}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatCurrency(remaining)} to go
                  </span>
                  <span className="font-medium text-card-foreground">
                    +{formatCurrency(goal.monthlyContribution)}/mo
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
