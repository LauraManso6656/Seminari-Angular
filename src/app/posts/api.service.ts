import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organizacion } from './organizacion/organizacion.model';
import { Usuario } from './usuarios/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:1337';

  constructor(private http: HttpClient) {}

  // ORGANIZACIONES
  getOrganizaciones(): Observable<{ organizacion: Organizacion[] }> {
    return this.http.get<{ organizacion: Organizacion[] }>(
      `${this.baseUrl}/organizaciones/get`
    );
  }

  createOrganizacion(name: string) {
    return this.http.post(
      `${this.baseUrl}/organizaciones/create`,
      { name }
    );
  }

  // USUARIOS
  getUsuarios(): Observable<{ usuario: Usuario[] }> {
    return this.http.get<{ usuario: Usuario[] }>(
      `${this.baseUrl}/usuarios/get`
    );
  }

  createUsuario(name: string, organizacion: string) {
    return this.http.post(
      `${this.baseUrl}/usuarios/create`,
      { name, organizacion }
    );
  }
}