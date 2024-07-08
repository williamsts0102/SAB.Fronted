import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

export const routes: Routes = [
  {
    path: 'alerta',
    loadChildren: () =>
      import('./alerta/alerta.routes').then((m) => m.ALERTA_ROUTES),
  },
  {
    path: 'personal',
    loadChildren: () =>
      import('./personal/personal.routes').then((m) => m.PERSONAL_ROUTES),
  },
  {
    path: 'estadistica',
    component: EstadisticaComponent,
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
