import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alerta } from '../models/alerta.model';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private apiUrl = 'http://localhost:5134/api/SAB';

  constructor(private http: HttpClient) {}

  listarAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.apiUrl}/ListarAlerta`);
  }
}
