import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sales/ui/sales-ui').then((m) => m.SalesUi),
  },
];
