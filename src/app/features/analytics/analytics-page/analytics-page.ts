import { Component, signal } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideTrendingUp,
  lucideTrendingDown,
  lucideCalendar,
  lucideDownload,
  lucideArrowUpRight,
  lucideArrowDownRight,
} from '@ng-icons/lucide';

const MONTHLY_DATA = [
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

const CATEGORY_DATA = [
  { name: "Housing", value: 15000, color: "var(--chart-1)", fill: "var(--chart-1)" },
  { name: "Food", value: 5000, color: "var(--chart-2)", fill: "var(--chart-2)" },
  { name: "Transport", value: 3500, color: "var(--chart-3)", fill: "var(--chart-3)" },
  { name: "Shopping", value: 8000, color: "var(--chart-4)", fill: "var(--chart-4)" },
  { name: "Entertainment", value: 2000, color: "var(--chart-5)", fill: "var(--chart-5)" },
  { name: "Other", value: 4500, color: "var(--secondary)", fill: "var(--secondary)" },
];

const NET_WORTH_TREND = [
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

const PERIODS = ["1M", "3M", "6M", "1Y", "All"];

@Component({
  selector: 'app-analytics-page',
  imports: [NgClass, NgIcon, CurrencyPipe],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.css',
  providers: [
    provideIcons({
      lucideTrendingUp,
      lucideTrendingDown,
      lucideCalendar,
      lucideDownload,
      lucideArrowUpRight,
      lucideArrowDownRight,
    })
  ]
})
export class AnalyticsPage {
  readonly monthlyData = MONTHLY_DATA;
  readonly categoryData = CATEGORY_DATA;
  readonly netWorthTrend = NET_WORTH_TREND;
  readonly periods = PERIODS;

  selectedPeriod = signal("1Y");

  get totalIncome() { return this.monthlyData.reduce((sum, d) => sum + d.income, 0); }
  get totalExpenses() { return this.monthlyData.reduce((sum, d) => sum + d.expenses, 0); }
  get savingsRate() { return Math.round(((this.totalIncome - this.totalExpenses) / this.totalIncome) * 100); }

  get maxMonthlyValue() {
    return Math.max(...this.monthlyData.map(d => Math.max(d.income, d.expenses)));
  }

  get pieChartConicGradient() {
    let stops = [];
    let currentPercentage = 0;
    const total = this.categoryData.reduce((sum, c) => sum + c.value, 0);
    
    // We attempt to guess hex colors since var(--chart-1) doesn't work well within conic-gradient purely statically in all browsers
    for (const cat of this.categoryData) {
      const percentage = (cat.value / total) * 100;
      stops.push(`${cat.fill} ${currentPercentage}% ${currentPercentage + percentage}%`);
      currentPercentage += percentage;
    }
    return `conic-gradient(${stops.join(', ')})`;
  }

  selectPeriod(period: string) {
    this.selectedPeriod.set(period);
  }
}
