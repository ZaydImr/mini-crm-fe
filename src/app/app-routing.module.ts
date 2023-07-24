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
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/'
  }
];
