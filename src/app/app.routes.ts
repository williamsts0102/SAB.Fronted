import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alerta',
    loadChildren: () =>
      import('./alerta/alerta.routes').then((m) => m.ALERTA_ROUTES),
  },
];
