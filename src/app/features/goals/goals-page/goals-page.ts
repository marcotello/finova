import { Component } from '@angular/core';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePlus,
  lucideTarget,
  lucidePlane,
  lucideHome,
  lucideCar,
  lucideGraduationCap,
  lucideBriefcase,
  lucideHeart,
  lucideSparkles,
  lucideTrendingUp,
  lucideCalendar,
  lucideDollarSign,
} from '@ng-icons/lucide';

interface Goal {
  id: string;
  name: string;
  icon: string;
  color: string;
  saved: number;
  target: number;
  deadline: string;
  monthlyContribution: number;
  priority: "high" | "medium" | "low";
}

const GOALS: Goal[] = [
  { id: "1", name: "Emergency Fund", icon: 'lucideBriefcase', color: "bg-chart-1", saved: 75000, target: 100000, deadline: "Dec 2026", monthlyContribution: 5000, priority: "high" },
  { id: "2", name: "Vacation to Europe", icon: 'lucidePlane', color: "bg-chart-2", saved: 28000, target: 80000, deadline: "Jun 2027", monthlyContribution: 4000, priority: "medium" },
  { id: "3", name: "New Car Down Payment", icon: 'lucideCar', color: "bg-chart-3", saved: 45000, target: 150000, deadline: "Dec 2027", monthlyContribution: 6000, priority: "medium" },
  { id: "4", name: "House Down Payment", icon: 'lucideHome', color: "bg-chart-4", saved: 180000, target: 500000, deadline: "Dec 2028", monthlyContribution: 10000, priority: "high" },
  { id: "5", name: "MBA Program", icon: 'lucideGraduationCap', color: "bg-chart-5", saved: 12000, target: 200000, deadline: "Aug 2028", monthlyContribution: 7000, priority: "low" },
  { id: "6", name: "Wedding Fund", icon: 'lucideHeart', color: "bg-secondary", saved: 35000, target: 120000, deadline: "Nov 2027", monthlyContribution: 5500, priority: "medium" },
];

@Component({
  selector: 'app-goals-page',
  imports: [NgClass, NgIcon, CurrencyPipe, TitleCasePipe],
  templateUrl: './goals-page.html',
  styleUrl: './goals-page.css',
  providers: [
    provideIcons({
      lucidePlus,
      lucideTarget,
      lucidePlane,
      lucideHome,
      lucideCar,
      lucideGraduationCap,
      lucideBriefcase,
      lucideHeart,
      lucideSparkles,
      lucideTrendingUp,
      lucideCalendar,
      lucideDollarSign,
    })
  ]
})
export class GoalsPage {
  readonly Math = Math;
  readonly goals = GOALS;

  get totalSaved() { return this.goals.reduce((sum, g) => sum + g.saved, 0); }
  get totalTarget() { return this.goals.reduce((sum, g) => sum + g.target, 0); }
  get overallPercentage() { return Math.round((this.totalSaved / this.totalTarget) * 100); }

  get sortedGoals() {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...this.goals].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  getPercentage(saved: number, target: number) {
    return (saved / target) * 100;
  }
}
