import { Routes } from '@angular/router';
import { AlertaListComponent } from './alerta-list/alerta-list.component';
import { AlertaDetailComponent } from './alerta-detail/alerta-detail.component';

export const ALERTA_ROUTES: Routes = [
  { path: '', component: AlertaListComponent },
  { path: ':slug', component: AlertaDetailComponent },
];
