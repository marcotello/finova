import { Component, ElementRef, ViewChild, signal, computed, effect } from '@angular/core';
import { CurrencyPipe, KeyValuePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideSend,
  lucideBot,
  lucideUser,
  lucideSparkles,
  lucideTrendingUp,
  lucidePiggyBank,
  lucideAlertTriangle,
  lucideLightbulb,
  lucideBarChart3,
} from '@ng-icons/lucide';

interface AdaptiveCard {
  type: "insight" | "chart" | "alert" | "tip";
  title: string;
  data?: Record<string, unknown>;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  adaptiveCard?: AdaptiveCard;
}

const SUGGESTED_QUESTIONS = [
  "How much did I spend this month?",
  "What are my top spending categories?",
  "Am I on track with my budgets?",
  "How can I save more money?",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm Finny, your AI financial assistant. I can help you understand your spending patterns, track budgets, and provide personalized insights. What would you like to know?",
    timestamp: new Date(Date.now() - 60000),
  },
];

@Component({
  selector: 'app-finny-page',
  imports: [NgClass, NgIcon, FormsModule, CurrencyPipe, KeyValuePipe],
  templateUrl: './finny-page.html',
  styleUrl: './finny-page.css',
  providers: [
    provideIcons({
      lucideSend,
      lucideBot,
      lucideUser,
      lucideSparkles,
      lucideTrendingUp,
      lucidePiggyBank,
      lucideAlertTriangle,
      lucideLightbulb,
      lucideBarChart3,
    })
  ]
})
export class FinnyPage {
  @ViewChild('messagesEnd') messagesEndRef!: ElementRef<HTMLDivElement>;

  readonly suggestedQuestions = SUGGESTED_QUESTIONS;
  
  messages = signal<Message[]>(INITIAL_MESSAGES);
  input = signal("");
  isTyping = signal(false);

  readonly cardIcons: Record<string, string> = {
    insight: 'lucideTrendingUp',
    chart: 'lucideBarChart3',
    alert: 'lucideAlertTriangle',
    tip: 'lucideLightbulb',
  };

  readonly cardColors: Record<string, string> = {
    insight: "bg-chart-1/10 border-chart-1/30 text-chart-1",
    chart: "bg-chart-2/10 border-chart-2/30 text-chart-2",
    alert: "bg-destructive/10 border-destructive/30 text-destructive",
    tip: "bg-chart-3/10 border-chart-3/30 text-chart-3",
  };

  constructor() {
    effect(() => {
      // Whenever messages update, scroll to bottom
      const msgs = this.messages();
      setTimeout(() => this.scrollToBottom(), 10);
    });
  }

  scrollToBottom() {
    if (this.messagesEndRef?.nativeElement) {
      this.messagesEndRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  generateResponse(userMessage: string): Message {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("spend") || lowerMessage.includes("month")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Based on your transaction history, here's a summary of your spending this month:",
        timestamp: new Date(),
        adaptiveCard: {
          type: "insight",
          title: "April 2026 Spending Summary",
          data: {
            "Total Spent": 38000,
            "vs Last Month": "-12%",
            "Daily Average": 1267,
            "Transactions": 47,
          },
        },
      };
    }

    if (lowerMessage.includes("category") || lowerMessage.includes("categories")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Your top spending categories this month show some interesting patterns. Food & Dining leads your expenses, followed by Housing and Transportation.",
        timestamp: new Date(),
        adaptiveCard: {
          type: "insight",
          title: "Top Categories",
          data: {
            "Food & Dining": 12500,
            Housing: 15000,
            Transportation: 4200,
            Shopping: 6300,
          },
        },
      };
    }

    if (lowerMessage.includes("budget") || lowerMessage.includes("track")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "I noticed some budget concerns that need your attention. Your Entertainment and Food & Dining budgets are approaching their limits.",
        timestamp: new Date(),
        adaptiveCard: {
          type: "alert",
          title: "Budget Alert",
          data: {
            message: "You've used 90% of your Entertainment budget and 84% of your Food & Dining budget. Consider reducing discretionary spending for the rest of the month.",
          },
        },
      };
    }

    if (lowerMessage.includes("save") || lowerMessage.includes("saving")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Here's a personalized tip to help you save more money based on your spending patterns:",
        timestamp: new Date(),
        adaptiveCard: {
          type: "tip",
          title: "Savings Opportunity",
          data: {
            suggestion: "Your subscription services total $2,500/month. Consider reviewing and canceling unused subscriptions. Based on your usage patterns, you could save up to $800/month by switching to annual plans or eliminating rarely-used services.",
          },
        },
      };
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: "I can help you with various financial insights! Try asking me about your spending patterns, budget status, or savings opportunities. I can analyze your transactions and provide personalized recommendations.",
      timestamp: new Date(),
    };
  }

  handleSend() {
    const text = this.input().trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    this.messages.update(prev => [...prev, userMessage]);
    this.input.set("");
    this.isTyping.set(true);

    setTimeout(() => {
      const response = this.generateResponse(text);
      this.messages.update(prev => [...prev, response]);
      this.isTyping.set(false);
    }, 1000 + Math.random() * 1000);
  }

  handleSuggestion(question: string) {
    this.input.set(question);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleSend();
    }
  }

  // Type guard utility for template
  isNumber(val: unknown): boolean {
    return typeof val === 'number';
  }
}
