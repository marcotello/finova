"use client";

import {
  Wallet,
  CreditCard,
  TrendingUp,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Building2,
  Landmark,
  BadgeDollarSign,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Account {
  id: string;
  name: string;
  institution: string;
  type: "cash" | "credit" | "investment";
  balance: number;
  currency: "MXN" | "USD";
  lastFour?: string;
  color: string;
}

const accounts: Account[] = [
  // Cash Accounts
  {
    id: "1",
    name: "BBVA Checking",
    institution: "BBVA Mexico",
    type: "cash",
    balance: 45230.5,
    currency: "MXN",
    lastFour: "4521",
    color: "bg-chart-1",
  },
  {
    id: "2",
    name: "Banorte Savings",
    institution: "Banorte",
    type: "cash",
    balance: 89000.0,
    currency: "MXN",
    lastFour: "7832",
    color: "bg-chart-2",
  },
  {
    id: "3",
    name: "USD Account",
    institution: "Wise",
    type: "cash",
    balance: 2543.18,
    currency: "USD",
    lastFour: "9102",
    color: "bg-chart-3",
  },
  // Credit Accounts
  {
    id: "4",
    name: "AMEX Platinum",
    institution: "American Express",
    type: "credit",
    balance: -28500.0,
    currency: "MXN",
    lastFour: "1002",
    color: "bg-destructive",
  },
  {
    id: "5",
    name: "BBVA Credit Card",
    institution: "BBVA Mexico",
    type: "credit",
    balance: -14080.0,
    currency: "MXN",
    lastFour: "5567",
    color: "bg-secondary",
  },
  // Investment Accounts
  {
    id: "6",
    name: "GBM+ Portfolio",
    institution: "GBM",
    type: "investment",
    balance: 285000.0,
    currency: "MXN",
    color: "bg-chart-5",
  },
  {
    id: "7",
    name: "Cetes Directo",
    institution: "Gobierno Mexico",
    type: "investment",
    balance: 90900.0,
    currency: "MXN",
    color: "bg-chart-4",
  },
  {
    id: "8",
    name: "US Stocks",
    institution: "Interactive Brokers",
    type: "investment",
    balance: 24000.0,
    currency: "USD",
    color: "bg-chart-1",
  },
];

function formatCurrency(amount: number, currency: "MXN" | "USD") {
  return new Intl.NumberFormat(currency === "MXN" ? "es-MX" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));
}

const typeIcons = {
  cash: Wallet,
  credit: CreditCard,
  investment: TrendingUp,
};

const typeLabels = {
  cash: "Cash Accounts",
  credit: "Credit Cards",
  investment: "Investments",
};

export function Accounts() {
  const [showBalances, setShowBalances] = useState(true);

  const groupedAccounts = accounts.reduce((acc, account) => {
    if (!acc[account.type]) {
      acc[account.type] = [];
    }
    acc[account.type].push(account);
    return acc;
  }, {} as Record<string, Account[]>);

  const totals = {
    cash: accounts
      .filter((a) => a.type === "cash")
      .reduce((sum, a) => sum + a.balance, 0),
    credit: accounts
      .filter((a) => a.type === "credit")
      .reduce((sum, a) => sum + a.balance, 0),
    investment: accounts
      .filter((a) => a.type === "investment")
      .reduce((sum, a) => sum + a.balance, 0),
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
          <p className="text-sm text-muted-foreground">
            Manage your connected accounts and wallets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBalances(!showBalances)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
          >
            {showBalances ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {showBalances ? "Hide" : "Show"} Balances
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Account
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {(["cash", "credit", "investment"] as const).map((type) => {
          const Icon = typeIcons[type];
          return (
            <div
              key={type}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    type === "cash"
                      ? "bg-chart-1"
                      : type === "credit"
                      ? "bg-destructive"
                      : "bg-chart-2"
                  )}
                >
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {typeLabels[type]}
                  </p>
                  <p
                    className={cn(
                      "text-xl font-bold",
                      totals[type] < 0 ? "text-destructive" : "text-card-foreground"
                    )}
                  >
                    {showBalances ? formatCurrency(totals[type], "MXN") : "••••••"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Groups */}
      <div className="space-y-6">
        {(["cash", "credit", "investment"] as const).map((type) => {
          const Icon = typeIcons[type];
          const typeAccounts = groupedAccounts[type] || [];

          return (
            <div key={type}>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">
                  {typeLabels[type]}
                </h2>
                <span className="ml-auto text-sm text-muted-foreground">
                  {typeAccounts.length} account{typeAccounts.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {typeAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            account.color
                          )}
                        >
                          {account.type === "cash" ? (
                            <Landmark className="h-5 w-5 text-primary-foreground" />
                          ) : account.type === "credit" ? (
                            <CreditCard className="h-5 w-5 text-primary-foreground" />
                          ) : (
                            <BadgeDollarSign className="h-5 w-5 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">
                            {account.name}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Building2 className="h-3 w-3" />
                            {account.institution}
                          </div>
                        </div>
                      </div>
                      <button className="rounded-md p-1 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {account.lastFour && `•••• ${account.lastFour}`}
                        </p>
                        <p
                          className={cn(
                            "text-xl font-bold",
                            account.balance < 0
                              ? "text-destructive"
                              : "text-card-foreground"
                          )}
                        >
                          {showBalances
                            ? (account.balance < 0 ? "-" : "") +
                              formatCurrency(account.balance, account.currency)
                            : "••••••"}
                        </p>
                      </div>
                      <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        {account.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
