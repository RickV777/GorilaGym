import { ClaseInterface } from "./ClaseInterface";

export interface InscripcionInterface{
    Id_inscripcion:number,
    Usuario_id:number,
    Nombres:string,
    Clase:ClaseInterface,
    Transaccion:string,
}