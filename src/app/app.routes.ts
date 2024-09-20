import { Routes } from '@angular/router';
import { authenticateGuard } from './auth/guards/authenticate.guard';
import { LoginGuard } from './auth/guards/login.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard]
    },
    {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
   {
    path: 'login',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '***',
    redirectTo: '/dashboard'
  }
];
