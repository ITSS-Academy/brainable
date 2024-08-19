import { Routes } from '@angular/router';
import { CreatorComponent } from './pages/game/creator/creator.component';
import { LoadingComponent } from './pages/loading/loading.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'join',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.LAYOUT_ROUTERS),
  },
  {
    path: 'join',
    loadChildren: () =>
      import('./pages/join/join.routes').then((m) => m.JOIN_ROUTERS),
  },
  {
    path: 'host/:pin',
    loadChildren: () =>
      import('./pages/game/host/host.routes').then((m) => m.HOST_ROUTERS),
  },
  {
    path: 'guest/:pin',
    loadChildren: () =>
      import('./pages/game/guest/guest.routes').then((m) => m.GUEST_ROUTERS),
  },
  {
    path: 'creator',
    component: CreatorComponent,
  },
  {
    path: 'creator/:id',
    component: CreatorComponent,
  },
  {
    path: 'loading',
    component: LoadingComponent,
  },
  {
    path: '**',
    redirectTo: 'join',
  },
];
