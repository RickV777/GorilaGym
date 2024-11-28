// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioInterface } from './interface/UsuarioInterface';
import { Observable } from 'rxjs';
import { UsuarioNuevo } from './interface/UsuarioNuevo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;
  private nombreUsuario: string | undefined;

  baseUrl: string = 'https://localhost:7216/GetLogin';
  baseUrl2: string = 'https://localhost:7216/api/Usuario/SetUsuario';

  constructor(private http: HttpClient) { }

  login(user: UsuarioInterface) {
    return this.http.post(this.baseUrl, user);
  }

  setNombreUsuario(nombre: string) {
    this.nombreUsuario = nombre;
  }

  getNombreUsuario(): string | undefined {
    return this.nombreUsuario;
  }
  addUser(user: UsuarioNuevo): Observable<any> {
    // Agregar la transacción y enviar la solicitud a la URL correspondiente
    const transaccion = 'AGREGAR_USUARIO';
    return this.http.post(this.baseUrl2, user);
  }

  isLoggedIn(): boolean {
    const storedToken = localStorage.getItem('token_value');
    //Verifica si existe un valor en la variable 'token_value', caso contrario devuelve false.
    if(localStorage.getItem('token_value')!==null){

      this._isLoggedIn = true;
    }else{

        this._isLoggedIn;
    }
    return this._isLoggedIn;
  }
}
