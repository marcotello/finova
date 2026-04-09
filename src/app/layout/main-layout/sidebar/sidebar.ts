import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLayoutDashboard,
  lucideWallet,
  lucideArrowLeftRight,
  lucidePiggyBank,
  lucideTarget,
  lucideFileText,
  lucideBot,
  lucideBell,
  lucideSettings,
  lucideChevronLeft,
  lucideMenu,
  lucideX,
  lucideBarChart3,
  lucideUser,
  lucideMoon,
  lucideSun
} from '@ng-icons/lucide';
import { GlobalStateService } from '../../../core/global-store/global-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgClass, NgIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  providers: [
    provideIcons({
      lucideLayoutDashboard,
      lucideWallet,
      lucideArrowLeftRight,
      lucidePiggyBank,
      lucideTarget,
      lucideFileText,
      lucideBot,
      lucideBell,
      lucideSettings,
      lucideChevronLeft,
      lucideMenu,
      lucideX,
      lucideBarChart3,
      lucideUser,
      lucideMoon,
      lucideSun
    })
  ]
})
export class Sidebar implements OnInit {
  store = inject(GlobalStateService);
  mounted = false;

  navItems = [
    { name: 'Dashboard', href: '/', icon: 'lucideLayoutDashboard' },
    { name: 'Accounts', href: '/accounts', icon: 'lucideWallet' },
    { name: 'Transactions', href: '/transactions', icon: 'lucideArrowLeftRight' },
    { name: 'Budgets', href: '/budgets', icon: 'lucidePiggyBank' },
    { name: 'Goals', href: '/goals', icon: 'lucideTarget' },
    { name: 'Analytics', href: '/analytics', icon: 'lucideBarChart3' },
    { name: 'Documents', href: '/documents', icon: 'lucideFileText' },
    { name: 'Finny AI', href: '/finny', icon: 'lucideBot' },
  ];

  bottomNavItems = [
    { name: 'Notifications', href: '/notifications', icon: 'lucideBell' },
    { name: 'Settings', href: '/settings', icon: 'lucideSettings' },
    { name: 'Profile', href: '/profile', icon: 'lucideUser' },
  ];

  ngOnInit() {
    this.mounted = true;
  }
}
