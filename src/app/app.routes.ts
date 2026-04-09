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
