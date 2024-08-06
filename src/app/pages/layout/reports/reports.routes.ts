import { ReportsComponent } from './reports.component';
import { Routes } from '@angular/router';

export const REPORTS_ROUTERS: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [],
  },
];
