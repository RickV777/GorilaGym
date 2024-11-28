import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuscripcionInterface } from './interface/SuscripcionInterface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanServiceService {
  

  baseUrl: string = 'https://localhost:7216/api/Suscripcion/GetSuscripcionTR';
  baseUrl2: string = 'https://localhost:7216/api/Suscripcion/SetSuscripcionTR';
  baseUrl3:string = 'https://localhost:7216/api/Suscripcion/CancelarSuscripcionTR';

  constructor(private http: HttpClient) { }

  setSuscripcion(suscripcion: SuscripcionInterface){
    return this.http.post(this.baseUrl2, suscripcion);
  }

  getSuscripcion(): Observable<any> {
    // Obtener el usuarioID y transaccion de localStorage
    const usuarioID = Number(localStorage.getItem('userId'));
    const transaccion = 'CONSULTA_SUSCRIPCION_ID_USER'; // Ajusta esto con la transacción real
    const url = `${this.baseUrl}?usuarioID=${usuarioID}&transaccion=${transaccion}`;
    return this.http.get(url);
  }
  
  cancelarSuscripcion(suscripcion: any): Observable<any> {
    return this.http.post(this.baseUrl3, suscripcion);
  }
}