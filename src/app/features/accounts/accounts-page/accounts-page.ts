import { Component, signal } from '@angular/core';
import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideWallet,
  lucideCreditCard,
  lucideTrendingUp,
  lucidePlus,
  lucideMoreHorizontal,
  lucideEye,
  lucideEyeOff,
  lucideBuilding2,
  lucideLandmark,
  lucideBadgeDollarSign,
} from '@ng-icons/lucide';

interface Account {
  id: string;
  name: string;
  institution: string;
  type: 'cash' | 'credit' | 'investment';
  balance: number;
  currency: 'MXN' | 'USD';
  lastFour?: string;
  color: string;
}

const ACCOUNTS: Account[] = [
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

@Component({
  selector: 'app-accounts-page',
  imports: [NgClass, NgIcon, CurrencyPipe, SlicePipe],
  templateUrl: './accounts-page.html',
  styleUrl: './accounts-page.css',
  providers: [
    provideIcons({
      lucideWallet,
      lucideCreditCard,
      lucideTrendingUp,
      lucidePlus,
      lucideMoreHorizontal,
      lucideEye,
      lucideEyeOff,
      lucideBuilding2,
      lucideLandmark,
      lucideBadgeDollarSign,
    })
  ]
})
export class AccountsPage {
  showBalances = signal(true);
  accounts = ACCOUNTS;
  accountTypes: ('cash' | 'credit' | 'investment')[] = ['cash', 'credit', 'investment'];

  typeIcons: Record<string, string> = {
    cash: 'lucideWallet',
    credit: 'lucideCreditCard',
    investment: 'lucideTrendingUp',
  };

  typeLabels: Record<string, string> = {
    cash: 'Cash Accounts',
    credit: 'Credit Cards',
    investment: 'Investments',
  };

  groupedAccounts: Record<string, Account[]> = this.accounts.reduce((acc, account) => {
    if (!acc[account.type]) {
      acc[account.type] = [];
    }
    acc[account.type].push(account);
    return acc;
  }, {} as Record<string, Account[]>);

  totals: Record<string, number> = {
    cash: this.accounts
      .filter((a) => a.type === 'cash')
      .reduce((sum, a) => sum + a.balance, 0),
    credit: this.accounts
      .filter((a) => a.type === 'credit')
      .reduce((sum, a) => sum + a.balance, 0),
    investment: this.accounts
      .filter((a) => a.type === 'investment')
      .reduce((sum, a) => sum + a.balance, 0),
  };

  toggleBalances() {
    this.showBalances.update(val => !val);
  }
}
