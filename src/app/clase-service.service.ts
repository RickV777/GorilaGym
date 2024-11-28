import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InscripcionInterface } from './interface/InscripcionInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaseServiceService {

  baseUrl: string = 'https://localhost:7216/api/Clase/GetInscripcionIP';
  baseUrl2: string = 'https://localhost:7216/api/Clase/SetInscripcion';
  baseUrl3:string = 'https://localhost:7216/api/Clase/CancelarInscripcion';

  constructor(private http: HttpClient) { }

  setInscripcion(inscripcion: InscripcionInterface){
    return this.http.post(this.baseUrl2, inscripcion);
  }

  getInscripcion(): Observable<any> {
    // Obtener el usuarioID
    const usuarioID = Number(localStorage.getItem('userId'));
    const transaccion = 'CONSULTA_INSCRIPCION_ID_USUARIO'; 
    const url = `${this.baseUrl}?usuarioID=${usuarioID}&transaccion=${transaccion}`;
    return this.http.get(url);
  }

  cancelarInscripcion(inscripcion: any): Observable<any> {
    return this.http.post(this.baseUrl3, inscripcion);
  }
}
