"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  Palette,
  Globe,
  CreditCard,
  Shield,
  Smartphone,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export function Settings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [language, setLanguage] = useState("es-MX");
  const [currency, setCurrency] = useState("MXN");

  const [notifications, setNotifications] = useState<SettingToggle[]>([
    {
      id: "budget_alerts",
      label: "Budget Alerts",
      description: "Get notified when approaching budget limits",
      enabled: true,
    },
    {
      id: "transaction_alerts",
      label: "Transaction Alerts",
      description: "Receive alerts for large transactions",
      enabled: true,
    },
    {
      id: "goal_progress",
      label: "Goal Progress",
      description: "Weekly updates on savings goal progress",
      enabled: false,
    },
    {
      id: "monthly_summary",
      label: "Monthly Summary",
      description: "Monthly financial summary emails",
      enabled: true,
    },
  ]);

  const [security, setSecurity] = useState<SettingToggle[]>([
    {
      id: "two_factor",
      label: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      enabled: false,
    },
    {
      id: "biometric",
      label: "Biometric Login",
      description: "Use fingerprint or face recognition",
      enabled: true,
    },
    {
      id: "login_alerts",
      label: "Login Alerts",
      description: "Get notified of new device logins",
      enabled: true,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const toggleSecurity = (id: string) => {
    setSecurity((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your app preferences and account settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Palette className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-card-foreground">Appearance</h2>
          </div>
          <div className="p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Choose your preferred theme
            </p>
            <div className="flex gap-3">
              {(["light", "dark", "system"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                    theme === t
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {t === "light" ? (
                    <Sun className="h-6 w-6" />
                  ) : t === "dark" ? (
                    <Moon className="h-6 w-6" />
                  ) : (
                    <Smartphone className="h-6 w-6" />
                  )}
                  <span className="text-sm font-medium capitalize">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-card-foreground">
              Language & Region
            </h2>
          </div>
          <div className="p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-card-foreground">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="es-MX">Español (Mexico)</option>
                  <option value="en-US">English (US)</option>
                  <option value="pt-BR">Português (Brasil)</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-card-foreground">
                  Default Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="MXN">MXN - Mexican Peso</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-card-foreground">Notifications</h2>
          </div>
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium text-card-foreground">
                    {notification.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    notification.enabled ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                      notification.enabled ? "left-5" : "left-0.5"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-card-foreground">Security</h2>
          </div>
          <div className="divide-y divide-border">
            {security.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium text-card-foreground">
                    {setting.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleSecurity(setting.id)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    setting.enabled ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                      setting.enabled ? "left-5" : "left-0.5"
                    )}
                  />
                </button>
              </div>
            ))}
            <button className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50">
              <div>
                <p className="font-medium text-card-foreground">
                  Change Password
                </p>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-card-foreground">
              Connected Accounts
            </h2>
          </div>
          <div className="divide-y divide-border">
            <button className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50">
              <div>
                <p className="font-medium text-card-foreground">
                  Manage Bank Connections
                </p>
                <p className="text-sm text-muted-foreground">
                  Add or remove connected bank accounts
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50">
              <div>
                <p className="font-medium text-card-foreground">
                  Payment Methods
                </p>
                <p className="text-sm text-muted-foreground">
                  Manage your payment cards and methods
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl border border-destructive/30 bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-destructive/30 p-4">
            <Lock className="h-5 w-5 text-destructive" />
            <h2 className="font-semibold text-destructive">Danger Zone</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-card-foreground">
                  Delete Account
                </p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <button className="rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
