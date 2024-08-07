import { ReportsComponent } from './reports.component';
import { Routes } from '@angular/router';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { ReportListComponent } from './components/report-list/report-list.component';

export const REPORTS_ROUTERS: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        component: ReportListComponent,
      },
      {
        path: ':id',
        component: ReportDetailComponent,
      },
    ],
  },
];
