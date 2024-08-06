import { Routes } from '@angular/router';
import { CreatorComponent } from './pages/game/creator/creator.component';

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
    path: 'host',
    loadChildren: () =>
      import('./pages/game/host/host.routes').then((m) => m.HOST_ROUTERS),
  },
  {
    path: 'guest',
    loadChildren: () =>
      import('./pages/game/guest/guest.routes').then((m) => m.GUEST_ROUTERS),
  },
  {
    path: 'creator',
    component: CreatorComponent,
  },
];
