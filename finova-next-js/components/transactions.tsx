"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Zap,
  Film,
  Plane,
  HeartPulse,
  GraduationCap,
  Briefcase,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  description: string;
  merchant: string;
  category: string;
  categoryIcon: typeof ShoppingCart;
  amount: number;
  currency: "MXN" | "USD";
  date: string;
  time: string;
  account: string;
  type: "expense" | "income" | "transfer";
  status: "completed" | "pending";
}

const categoryIcons: Record<string, typeof ShoppingCart> = {
  Shopping: ShoppingCart,
  "Food & Dining": Utensils,
  Transportation: Car,
  Housing: Home,
  Utilities: Zap,
  Entertainment: Film,
  Travel: Plane,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Income: Briefcase,
};

const transactions: Transaction[] = [
  {
    id: "1",
    description: "Weekly Groceries",
    merchant: "Walmart Supercenter",
    category: "Shopping",
    categoryIcon: ShoppingCart,
    amount: -1245.5,
    currency: "MXN",
    date: "Apr 8, 2026",
    time: "2:34 PM",
    account: "BBVA Checking",
    type: "expense",
    status: "completed",
  },
  {
    id: "2",
    description: "Monthly Salary",
    merchant: "TechCorp Mexico",
    category: "Income",
    categoryIcon: Briefcase,
    amount: 45000.0,
    currency: "MXN",
    date: "Apr 8, 2026",
    time: "9:00 AM",
    account: "BBVA Checking",
    type: "income",
    status: "completed",
  },
  {
    id: "3",
    description: "Uber Ride to Office",
    merchant: "Uber",
    category: "Transportation",
    categoryIcon: Car,
    amount: -156.8,
    currency: "MXN",
    date: "Apr 7, 2026",
    time: "8:15 AM",
    account: "AMEX Platinum",
    type: "expense",
    status: "completed",
  },
  {
    id: "4",
    description: "Dinner at Restaurant",
    merchant: "La Casa del Taco",
    category: "Food & Dining",
    categoryIcon: Utensils,
    amount: -892.0,
    currency: "MXN",
    date: "Apr 7, 2026",
    time: "7:45 PM",
    account: "BBVA Credit Card",
    type: "expense",
    status: "completed",
  },
  {
    id: "5",
    description: "Netflix Subscription",
    merchant: "Netflix",
    category: "Entertainment",
    categoryIcon: Film,
    amount: -299.0,
    currency: "MXN",
    date: "Apr 6, 2026",
    time: "12:00 AM",
    account: "AMEX Platinum",
    type: "expense",
    status: "completed",
  },
  {
    id: "6",
    description: "Electric Bill",
    merchant: "CFE",
    category: "Utilities",
    categoryIcon: Zap,
    amount: -1850.0,
    currency: "MXN",
    date: "Apr 5, 2026",
    time: "10:30 AM",
    account: "BBVA Checking",
    type: "expense",
    status: "completed",
  },
  {
    id: "7",
    description: "Flight to Cancun",
    merchant: "Volaris",
    category: "Travel",
    categoryIcon: Plane,
    amount: -3200.0,
    currency: "MXN",
    date: "Apr 5, 2026",
    time: "3:20 PM",
    account: "AMEX Platinum",
    type: "expense",
    status: "pending",
  },
  {
    id: "8",
    description: "Doctor Visit",
    merchant: "Hospital Angeles",
    category: "Healthcare",
    categoryIcon: HeartPulse,
    amount: -1500.0,
    currency: "MXN",
    date: "Apr 4, 2026",
    time: "11:00 AM",
    account: "BBVA Checking",
    type: "expense",
    status: "completed",
  },
  {
    id: "9",
    description: "Online Course",
    merchant: "Udemy",
    category: "Education",
    categoryIcon: GraduationCap,
    amount: -299.0,
    currency: "MXN",
    date: "Apr 4, 2026",
    time: "5:00 PM",
    account: "BBVA Credit Card",
    type: "expense",
    status: "completed",
  },
  {
    id: "10",
    description: "Rent Payment",
    merchant: "Landlord",
    category: "Housing",
    categoryIcon: Home,
    amount: -15000.0,
    currency: "MXN",
    date: "Apr 1, 2026",
    time: "9:00 AM",
    account: "BBVA Checking",
    type: "expense",
    status: "completed",
  },
];

const categories = [
  "All Categories",
  "Shopping",
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Travel",
  "Healthcare",
  "Education",
  "Income",
];

function formatCurrency(amount: number, currency: "MXN" | "USD") {
  return new Intl.NumberFormat(currency === "MXN" ? "es-MX" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));
}

export function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || tx.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
        <p className="text-sm text-muted-foreground">
          View and manage your transaction history
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Transactions</p>
          <p className="text-2xl font-bold text-card-foreground">
            {transactions.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <ArrowDownLeft className="h-4 w-4 text-chart-1" />
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <p className="text-2xl font-bold text-chart-1">
            +{formatCurrency(totalIncome, "MXN")}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-destructive" />
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <p className="text-2xl font-bold text-destructive">
            -{formatCurrency(totalExpenses, "MXN")}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Net Flow</p>
          <p
            className={cn(
              "text-2xl font-bold",
              totalIncome - totalExpenses >= 0
                ? "text-chart-1"
                : "text-destructive"
            )}
          >
            {totalIncome - totalExpenses >= 0 ? "+" : "-"}
            {formatCurrency(Math.abs(totalIncome - totalExpenses), "MXN")}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors",
              showFilters
                ? "bg-primary text-primary-foreground"
                : "bg-card text-card-foreground hover:bg-muted"
            )}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground hover:bg-muted">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mb-4 rounded-xl border border-border bg-card p-4">
          <p className="mb-3 text-sm font-medium text-card-foreground">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transaction List */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Transaction
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                  Category
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                  Account
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground lg:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((tx) => {
                const Icon = categoryIcons[tx.category] || ShoppingCart;
                return (
                  <tr
                    key={tx.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            tx.type === "income"
                              ? "bg-chart-1/10 text-chart-1"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">
                            {tx.description}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {tx.merchant}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {tx.category}
                      </span>
                    </td>
                    <td className="hidden px-4 py-4 md:table-cell">
                      <p className="text-sm text-card-foreground">{tx.account}</p>
                    </td>
                    <td className="hidden px-4 py-4 lg:table-cell">
                      <p className="text-sm text-card-foreground">{tx.date}</p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p
                        className={cn(
                          "font-semibold",
                          tx.type === "income"
                            ? "text-chart-1"
                            : "text-card-foreground"
                        )}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {formatCurrency(tx.amount, tx.currency)}
                      </p>
                      {tx.status === "pending" && (
                        <span className="text-xs text-muted-foreground">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transactions
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted disabled:opacity-50">
              Previous
            </button>
            <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
