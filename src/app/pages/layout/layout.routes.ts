import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTERS: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTERS),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.routes').then((m) => m.PROFILE_ROUTES),
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./library/library.routes').then((m) => m.LIBRARY_ROUTERS),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.routes').then((m) => m.REPORTS_ROUTERS),
      },
    ],
  },
];
