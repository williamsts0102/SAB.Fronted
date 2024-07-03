import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  {
    path: 'alerta',
    loadChildren: () =>
      import('./alerta/alerta.routes').then((m) => m.ALERTA_ROUTES),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
