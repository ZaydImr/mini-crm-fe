import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/client',
    title: 'Client',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/contract',
    title: 'Contract',
    icon: 'bi bi-file-earmark-text',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/affair',
    title: 'Affair',
    icon: 'bi bi-boxes',
    class: '',
    extralink: false,
    submenu: []
  }
];
