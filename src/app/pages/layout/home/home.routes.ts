import { HomeComponent } from './home.component';
import { Routes } from '@angular/router';

export const HOME_ROUTERS: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'host',
        loadComponent: () =>
          import('../host/host.component').then((m) => m.HostComponent),
      },
      {
        path: 'guest',
        loadComponent: () =>
          import('../guest/guest.component').then((m) => m.GuestComponent),
      },
    ],
  },
];
