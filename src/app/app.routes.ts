import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/ui/sales-ui').then((m) => m.SalesUi),
  },
];
