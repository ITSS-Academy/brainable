import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import * as AuthGuard from '../../guards/auth.guard';

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
        path: 'library',
        loadChildren: () =>
          import('./library/library.routes').then((m) => m.LIBRARY_ROUTERS),
        canActivate: [AuthGuard.canActivateLibrary],
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.routes').then((m) => m.REPORTS_ROUTERS),
        canActivate: [AuthGuard.canActivateReports],
      },
      {
        path: 'quiz/:id',
        loadChildren: () =>
          import('./quiz/quiz.routes').then((m) => m.QUIZ_ROUTERS),
      },
      {
        path: 'categories/:name',
        loadChildren: () =>
          import('./categories/categories.routes').then(
            (m) => m.CATEGORIES_ROUTERS,
          ),
      },
    ],
  },
];
