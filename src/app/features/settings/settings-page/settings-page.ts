import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBell,
  lucideLock,
  lucidePalette,
  lucideGlobe,
  lucideCreditCard,
  lucideShield,
  lucideSmartphone,
  lucideChevronRight,
  lucideMoon,
  lucideSun,
} from '@ng-icons/lucide';

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const INITIAL_NOTIFICATIONS: SettingToggle[] = [
  { id: "budget_alerts", label: "Budget Alerts", description: "Get notified when approaching budget limits", enabled: true },
  { id: "transaction_alerts", label: "Transaction Alerts", description: "Receive alerts for large transactions", enabled: true },
  { id: "goal_progress", label: "Goal Progress", description: "Weekly updates on savings goal progress", enabled: false },
  { id: "monthly_summary", label: "Monthly Summary", description: "Monthly financial summary emails", enabled: true },
];

const INITIAL_SECURITY: SettingToggle[] = [
  { id: "two_factor", label: "Two-Factor Authentication", description: "Add an extra layer of security to your account", enabled: false },
  { id: "biometric", label: "Biometric Login", description: "Use fingerprint or face recognition", enabled: true },
  { id: "login_alerts", label: "Login Alerts", description: "Get notified of new device logins", enabled: true },
];

@Component({
  selector: 'app-settings-page',
  imports: [NgClass, NgIcon, FormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
  providers: [
    provideIcons({
      lucideBell,
      lucideLock,
      lucidePalette,
      lucideGlobe,
      lucideCreditCard,
      lucideShield,
      lucideSmartphone,
      lucideChevronRight,
      lucideMoon,
      lucideSun,
    })
  ]
})
export class SettingsPage {
  theme = signal<"light" | "dark" | "system">("system");
  language = signal("es-MX");
  currency = signal("MXN");

  notifications = signal<SettingToggle[]>(INITIAL_NOTIFICATIONS);
  security = signal<SettingToggle[]>(INITIAL_SECURITY);

  themes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];

  setTheme(t: "light" | "dark" | "system") {
    this.theme.set(t);
  }

  toggleNotification(id: string) {
    this.notifications.update(prev =>
      prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
    );
  }

  toggleSecurity(id: string) {
    this.security.update(prev =>
      prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    );
  }
}
