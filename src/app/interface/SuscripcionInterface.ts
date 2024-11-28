import { PlanInterface } from "./PlanInterface";

export interface SuscripcionInterface{
    Id_suscripcion:number,
    Usuario_id:number,
    Nombres:string,
    Plan:PlanInterface,
    Transaccion:string,
}
