"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const monthlyData = [
  { month: "Jan", income: 45000, expenses: 38000 },
  { month: "Feb", income: 47000, expenses: 42000 },
  { month: "Mar", income: 45000, expenses: 35000 },
  { month: "Apr", income: 52000, expenses: 48000 },
  { month: "May", income: 48000, expenses: 41000 },
  { month: "Jun", income: 55000, expenses: 45000 },
  { month: "Jul", income: 58000, expenses: 52000 },
  { month: "Aug", income: 52000, expenses: 43000 },
  { month: "Sep", income: 60000, expenses: 48000 },
  { month: "Oct", income: 55000, expenses: 46000 },
  { month: "Nov", income: 62000, expenses: 51000 },
  { month: "Dec", income: 85000, expenses: 65000 },
];

const categoryData = [
  { name: "Housing", value: 15000, color: "var(--chart-1)" },
  { name: "Food", value: 5000, color: "var(--chart-2)" },
  { name: "Transport", value: 3500, color: "var(--chart-3)" },
  { name: "Shopping", value: 8000, color: "var(--chart-4)" },
  { name: "Entertainment", value: 2000, color: "var(--chart-5)" },
  { name: "Other", value: 4500, color: "var(--secondary)" },
];

const netWorthTrend = [
  { month: "Jan", netWorth: 380000 },
  { month: "Feb", netWorth: 385000 },
  { month: "Mar", netWorth: 395000 },
  { month: "Apr", netWorth: 399000 },
  { month: "May", netWorth: 406000 },
  { month: "Jun", netWorth: 416000 },
  { month: "Jul", netWorth: 422000 },
  { month: "Aug", netWorth: 431000 },
  { month: "Sep", netWorth: 443000 },
  { month: "Oct", netWorth: 452000 },
  { month: "Nov", netWorth: 463000 },
  { month: "Dec", netWorth: 485000 },
];

const periods = ["1M", "3M", "6M", "1Y", "All"];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");

  const totalIncome = monthlyData.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = monthlyData.reduce((sum, d) => sum + d.expenses, 0);
  const savingsRate = Math.round(
    ((totalIncome - totalExpenses) / totalIncome) * 100
  );

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Deep dive into your financial data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-border bg-card p-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  selectedPeriod === period
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground hover:bg-muted">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-2xl font-bold text-chart-1">
            {formatCurrency(totalIncome)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <ArrowUpRight className="h-4 w-4 text-chart-1" />
            <span className="text-chart-1">+12.5%</span>
            <span className="text-muted-foreground">vs last year</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold text-destructive">
            {formatCurrency(totalExpenses)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <ArrowDownRight className="h-4 w-4 text-chart-1" />
            <span className="text-chart-1">-5.2%</span>
            <span className="text-muted-foreground">vs last year</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Net Savings</p>
          <p className="text-2xl font-bold text-card-foreground">
            {formatCurrency(totalIncome - totalExpenses)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-chart-1" />
            <span className="text-chart-1">+18.3%</span>
            <span className="text-muted-foreground">vs last year</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Savings Rate</p>
          <p className="text-2xl font-bold text-card-foreground">
            {savingsRate}%
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-chart-1" />
            <span className="text-muted-foreground">Target: 30%</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Income vs Expenses */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">
            Income vs Expenses
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="var(--chart-3)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">
            Spending by Category
          </h3>
          <div className="flex items-center gap-6">
            <div className="h-56 w-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {categoryData.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-card-foreground">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">
                    {formatCurrency(category.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Net Worth Trend */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">
            Net Worth Trend
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netWorthTrend}>
                <defs>
                  <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area
                  type="monotone"
                  dataKey="netWorth"
                  name="Net Worth"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNetWorth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
