import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideSearch,
  lucideFilter,
  lucideDownload,
  lucideChevronDown,
  lucideShoppingCart,
  lucideUtensils,
  lucideCar,
  lucideHome,
  lucideZap,
  lucideFilm,
  lucidePlane,
  lucideHeartPulse,
  lucideGraduationCap,
  lucideBriefcase,
  lucideArrowDownLeft,
  lucideArrowUpRight,
} from '@ng-icons/lucide';

interface Transaction {
  id: string;
  description: string;
  merchant: string;
  category: string;
  categoryIcon: string;
  amount: number;
  currency: "MXN" | "USD";
  date: string;
  time: string;
  account: string;
  type: "expense" | "income" | "transfer";
  status: "completed" | "pending";
}

const CATEGORY_ICONS: Record<string, string> = {
  Shopping: 'lucideShoppingCart',
  "Food & Dining": 'lucideUtensils',
  Transportation: 'lucideCar',
  Housing: 'lucideHome',
  Utilities: 'lucideZap',
  Entertainment: 'lucideFilm',
  Travel: 'lucidePlane',
  Healthcare: 'lucideHeartPulse',
  Education: 'lucideGraduationCap',
  Income: 'lucideBriefcase',
};

const TRANSACTIONS: Transaction[] = [
  { id: "1", description: "Weekly Groceries", merchant: "Walmart Supercenter", category: "Shopping", categoryIcon: CATEGORY_ICONS["Shopping"], amount: -1245.5, currency: "MXN", date: "Apr 8, 2026", time: "2:34 PM", account: "BBVA Checking", type: "expense", status: "completed" },
  { id: "2", description: "Monthly Salary", merchant: "TechCorp Mexico", category: "Income", categoryIcon: CATEGORY_ICONS["Income"], amount: 45000.0, currency: "MXN", date: "Apr 8, 2026", time: "9:00 AM", account: "BBVA Checking", type: "income", status: "completed" },
  { id: "3", description: "Uber Ride to Office", merchant: "Uber", category: "Transportation", categoryIcon: CATEGORY_ICONS["Transportation"], amount: -156.8, currency: "MXN", date: "Apr 7, 2026", time: "8:15 AM", account: "AMEX Platinum", type: "expense", status: "completed" },
  { id: "4", description: "Dinner at Restaurant", merchant: "La Casa del Taco", category: "Food & Dining", categoryIcon: CATEGORY_ICONS["Food & Dining"], amount: -892.0, currency: "MXN", date: "Apr 7, 2026", time: "7:45 PM", account: "BBVA Credit Card", type: "expense", status: "completed" },
  { id: "5", description: "Netflix Subscription", merchant: "Netflix", category: "Entertainment", categoryIcon: CATEGORY_ICONS["Entertainment"], amount: -299.0, currency: "MXN", date: "Apr 6, 2026", time: "12:00 AM", account: "AMEX Platinum", type: "expense", status: "completed" },
  { id: "6", description: "Electric Bill", merchant: "CFE", category: "Utilities", categoryIcon: CATEGORY_ICONS["Utilities"], amount: -1850.0, currency: "MXN", date: "Apr 5, 2026", time: "10:30 AM", account: "BBVA Checking", type: "expense", status: "completed" },
  { id: "7", description: "Flight to Cancun", merchant: "Volaris", category: "Travel", categoryIcon: CATEGORY_ICONS["Travel"], amount: -3200.0, currency: "MXN", date: "Apr 5, 2026", time: "3:20 PM", account: "AMEX Platinum", type: "expense", status: "pending" },
  { id: "8", description: "Doctor Visit", merchant: "Hospital Angeles", category: "Healthcare", categoryIcon: CATEGORY_ICONS["Healthcare"], amount: -1500.0, currency: "MXN", date: "Apr 4, 2026", time: "11:00 AM", account: "BBVA Checking", type: "expense", status: "completed" },
  { id: "9", description: "Online Course", merchant: "Udemy", category: "Education", categoryIcon: CATEGORY_ICONS["Education"], amount: -299.0, currency: "MXN", date: "Apr 4, 2026", time: "5:00 PM", account: "BBVA Credit Card", type: "expense", status: "completed" },
  { id: "10", description: "Rent Payment", merchant: "Landlord", category: "Housing", categoryIcon: CATEGORY_ICONS["Housing"], amount: -15000.0, currency: "MXN", date: "Apr 1, 2026", time: "9:00 AM", account: "BBVA Checking", type: "expense", status: "completed" },
];

const CATEGORIES = [
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

@Component({
  selector: 'app-transactions-page',
  imports: [NgClass, NgIcon, CurrencyPipe, FormsModule],
  templateUrl: './transactions-page.html',
  styleUrl: './transactions-page.css',
  providers: [
    provideIcons({
      lucideSearch,
      lucideFilter,
      lucideDownload,
      lucideChevronDown,
      lucideShoppingCart,
      lucideUtensils,
      lucideCar,
      lucideHome,
      lucideZap,
      lucideFilm,
      lucidePlane,
      lucideHeartPulse,
      lucideGraduationCap,
      lucideBriefcase,
      lucideArrowDownLeft,
      lucideArrowUpRight,
    })
  ]
})
export class TransactionsPage {
  readonly Math = Math;
  readonly categories = CATEGORIES;
  readonly transactions = TRANSACTIONS;

  searchQuery = signal("");
  selectedCategory = signal("All Categories");
  showFilters = signal(false);

  filteredTransactions = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();
    
    return this.transactions.filter(tx => {
      const matchesSearch = tx.description.toLowerCase().includes(q) || tx.merchant.toLowerCase().includes(q);
      const matchesCategory = cat === "All Categories" || tx.category === cat;
      return matchesSearch && matchesCategory;
    });
  });

  totalIncome = computed(() => {
    return this.transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
  });

  totalExpenses = computed(() => {
    return this.transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  });

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
