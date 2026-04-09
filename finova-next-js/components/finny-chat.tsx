"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  PiggyBank,
  AlertTriangle,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  adaptiveCard?: AdaptiveCard;
}

interface AdaptiveCard {
  type: "insight" | "chart" | "alert" | "tip";
  title: string;
  data?: Record<string, unknown>;
}

const suggestedQuestions = [
  "How much did I spend this month?",
  "What are my top spending categories?",
  "Am I on track with my budgets?",
  "How can I save more money?",
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm Finny, your AI financial assistant. I can help you understand your spending patterns, track budgets, and provide personalized insights. What would you like to know?",
    timestamp: new Date(Date.now() - 60000),
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

function AdaptiveCardComponent({ card }: { card: AdaptiveCard }) {
  const icons = {
    insight: TrendingUp,
    chart: BarChart3,
    alert: AlertTriangle,
    tip: Lightbulb,
  };

  const colors = {
    insight: "bg-chart-1/10 border-chart-1/30 text-chart-1",
    chart: "bg-chart-2/10 border-chart-2/30 text-chart-2",
    alert: "bg-destructive/10 border-destructive/30 text-destructive",
    tip: "bg-chart-3/10 border-chart-3/30 text-chart-3",
  };

  const Icon = icons[card.type];

  if (card.type === "insight" && card.data) {
    return (
      <div className="mt-3 rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className={cn("rounded-lg p-2", colors[card.type])}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="font-medium text-card-foreground">{card.title}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(card.data).map(([key, value]) => (
            <div key={key} className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">{key}</p>
              <p className="text-lg font-semibold text-card-foreground">
                {typeof value === "number" ? formatCurrency(value) : String(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (card.type === "alert") {
    return (
      <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-destructive/10 p-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <p className="font-medium text-card-foreground">{card.title}</p>
            {card.data && (
              <p className="mt-1 text-sm text-muted-foreground">
                {String(card.data.message)}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (card.type === "tip") {
    return (
      <div className="mt-3 rounded-lg border border-chart-3/30 bg-chart-3/5 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-chart-3/10 p-2">
            <Lightbulb className="h-4 w-4 text-chart-3" />
          </div>
          <div>
            <p className="font-medium text-card-foreground">{card.title}</p>
            {card.data && (
              <p className="mt-1 text-sm text-muted-foreground">
                {String(card.data.suggestion)}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export function FinnyChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("spend") || lowerMessage.includes("month")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Based on your transaction history, here's a summary of your spending this month:",
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
        content:
          "Your top spending categories this month show some interesting patterns. Food & Dining leads your expenses, followed by Housing and Transportation.",
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
        content:
          "I noticed some budget concerns that need your attention. Your Entertainment and Food & Dining budgets are approaching their limits.",
        timestamp: new Date(),
        adaptiveCard: {
          type: "alert",
          title: "Budget Alert",
          data: {
            message:
              "You've used 90% of your Entertainment budget and 84% of your Food & Dining budget. Consider reducing discretionary spending for the rest of the month.",
          },
        },
      };
    }

    if (lowerMessage.includes("save") || lowerMessage.includes("saving")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Here's a personalized tip to help you save more money based on your spending patterns:",
        timestamp: new Date(),
        adaptiveCard: {
          type: "tip",
          title: "Savings Opportunity",
          data: {
            suggestion:
              "Your subscription services total $2,500/month. Consider reviewing and canceling unused subscriptions. Based on your usage patterns, you could save up to $800/month by switching to annual plans or eliminating rarely-used services.",
          },
        },
      };
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "I can help you with various financial insights! Try asking me about your spending patterns, budget status, or savings opportunities. I can analyze your transactions and provide personalized recommendations.",
      timestamp: new Date(),
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col lg:h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-card-foreground">Finny AI</h1>
            <p className="text-sm text-muted-foreground">
              Your personal financial assistant
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">Powered by AI</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "user" ? "bg-primary" : "bg-muted"
                )}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                <p className="text-sm">{message.content}</p>
                {message.adaptiveCard && (
                  <AdaptiveCardComponent card={message.adaptiveCard} />
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <Bot className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="rounded-2xl bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="border-t border-border bg-card px-4 py-3">
          <p className="mb-2 text-sm text-muted-foreground">
            Suggested questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestion(question)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-card p-4 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Finny anything about your finances..."
              className="flex-1 rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Finny can make mistakes. Always verify important financial decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
