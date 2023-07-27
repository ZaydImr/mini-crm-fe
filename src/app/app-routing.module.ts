import { Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authenticated.guard';

export const Approutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
  },
  {
    canActivate: [AuthenticationGuard],
    path: '',
    loadComponent: ()=> import('./layouts/layout/layout.component').then(c => c.FullComponent),
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'client',
        loadComponent: () => import('./modules/client/client-list/client-list.component').then(m => m.ClientListComponent)
      },
      {
        path: 'contract',
        loadComponent: () => import('./modules/contract/contract-list/contract-list.component').then(m => m.ContractListComponent)
      },
      {
        path: 'affair',
        loadComponent: () => import('./modules/affair/affair-list/affair-list.component').then(m => m.AffairListComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/'
  }
];
