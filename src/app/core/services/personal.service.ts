import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grupo } from '../models/grupo.model';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal.model';
@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private apiUrl = 'http://localhost:5134/api/SAB';
  constructor(private http: HttpClient) {}

  listarGruposPersonales(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.apiUrl}/ListarGruposPersonales`);
  }

  listarPersonalPorGrupo(codigo: string): Observable<Personal[]> {
    return this.http.post<Personal[]>(`${this.apiUrl}/ListarPersonalPorGrupo`, {
      pstrCodGrupoPersonal: codigo,
    });
  }
}
