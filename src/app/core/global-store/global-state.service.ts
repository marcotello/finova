import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  // Writable signals
  private _collapsed = signal<boolean>(false);
  private _mobileOpen = signal<boolean>(false);
  private _theme = signal<Theme>('light');

  // Read-only signals exposed to components
  readonly collapsed = this._collapsed.asReadonly();
  readonly mobileOpen = this._mobileOpen.asReadonly();
  readonly theme = this._theme.asReadonly();

  constructor() {
    this._initializeTheme();

    // Effect to automatically synchronize theme changes to the DOM
    effect(() => {
      const currentTheme = this._theme();
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', currentTheme);
    });
  }

  // --- Theme Logic ---
  private _initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this._theme.set(savedTheme);
    } else if (isSystemDark) {
      this._theme.set('dark');
    } else {
      this._theme.set('light');
    }
  }

  toggleTheme(): void {
    this._theme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }

  // --- Sidebar Logic ---
  toggleSidebar(): void {
    this._collapsed.update(state => !state);
  }

  setSidebarCollapsed(collapsed: boolean): void {
    this._collapsed.set(collapsed);
  }

  toggleMobile(): void {
    this._mobileOpen.update(state => !state);
  }

  setMobileOpen(mobileOpen: boolean): void {
    this._mobileOpen.set(mobileOpen);
  }
}
