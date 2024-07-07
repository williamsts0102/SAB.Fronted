import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alerta } from '../models/alerta.model';
import { GruposPersonalesActivos } from '../models/grupospersonalesactivos.model';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private apiUrl = 'http://localhost:5134/api/SAB';

  constructor(private http: HttpClient) {}

  listarAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.apiUrl}/ListarAlerta`);
  }

  detalleAlerta(codigo: string): Observable<Alerta> {
    return this.http.post<Alerta>(`${this.apiUrl}/DetalleAlerta`, {
      pstrCodAlerta: codigo,
    });
  }

  obtenerGruposPersonalesActivos(): Observable<GruposPersonalesActivos[]> {
    return this.http.get<GruposPersonalesActivos[]>(
      `${this.apiUrl}/ObtenerGruposPersonalesActivos`
    );
  }

  descartarAlerta(codigo: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/DescartarAlerta`, {
      pstrCodAlerta: codigo,
    });
  }

  actualizarAlerta(idGrupo: number, codigo: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/ActualizarAlerta`, {
      pintIdGrupoPersonal: idGrupo,
      pstrCodAlerta: codigo,
    });
  }
}
