import { Routes } from '@angular/router';
import { GrupoPersonalComponent } from './grupo-personal/grupo-personal.component';
import { AlertaDetailComponent } from '../alerta/alerta-detail/alerta-detail.component';
import { PersonalListaComponent } from './personal-lista/personal-lista.component';

export const PERSONAL_ROUTES: Routes = [
  { path: '', component: GrupoPersonalComponent },
  { path: ':pstrCodGrupoPersonal', component: PersonalListaComponent },
];
