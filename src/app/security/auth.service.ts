import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  resultado: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5134/api/SAB/Token';

  constructor(private http: HttpClient) {}

  login(usuario: string, clave: string): Observable<LoginResponse> {
    const body = { Usuario: usuario, Clave: clave }; // Nombres de campos en mayúsculas
    return this.http.post<LoginResponse>(this.apiUrl, body);
  }
}