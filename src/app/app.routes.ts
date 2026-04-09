import { Routes } from '@angular/router';
import { Main } from './layout/main-layout/main/main';
import { FullScreenLayout } from './layout/full-screen-layout/full-screen-layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: Main,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page').then(m => m.DashboardPage)
            },
            {
                path: 'accounts',
                loadComponent: () => import('./features/accounts/accounts-page/accounts-page').then(m => m.AccountsPage)
            },
            {
                path: 'budgets',
                loadComponent: () => import('./features/budgets/budgets-page/budgets-page').then(m => m.BudgetsPage)
            },
            {
                path: 'goals',
                loadComponent: () => import('./features/goals/goals-page/goals-page').then(m => m.GoalsPage)
            },
            {
                path: 'transactions',
                loadComponent: () => import('./features/transactions/transactions-page/transactions-page').then(m => m.TransactionsPage)
            },
            {
                path: 'analytics',
                loadComponent: () => import('./features/analytics/analytics-page/analytics-page').then(m => m.AnalyticsPage)
            },
            {
                path: 'documents',
                loadComponent: () => import('./features/documents/documents-page/documents-page').then(m => m.DocumentsPage)
            },
            {
                path: 'finny',
                loadComponent: () => import('./features/finny/finny-page/finny-page').then(m => m.FinnyPage)
            },
            {
                path: 'notifications',
                loadComponent: () => import('./features/notifications/notifications-page/notifications-page').then(m => m.NotificationsPage)
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/settings/settings-page/settings-page').then(m => m.SettingsPage)
            }
        ]
    },
    {
        path: 'auth',
        component: FullScreenLayout,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./features/auth/login/pages/login-page/login-page').then(m => m.LoginPage)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
