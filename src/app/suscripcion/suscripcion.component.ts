import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PlanServiceService } from '../plan-service.service';
import { SuscripcionInterface } from '../interface/SuscripcionInterface';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent {
  private suscripcion: SuscripcionInterface = {
    Usuario_id: 0, 
    Transaccion: '',
    Plan: {
      Plan_id: 0,
      Nombre_plan: '',
      Descripcion: '',
      Precio: 0
    },
    Id_suscripcion: 0,
    Nombres: ''
  };

  constructor(private _snackBar: MatSnackBar, private router: Router, private planService: PlanServiceService) {}

  ConfirmarSuscripcion(Plan_id: number) {
    var nombrePlan="";
    if(Plan_id===1)nombrePlan="Plan Basico";
    if(Plan_id===2)nombrePlan="Plan VIP";
    if(Plan_id===3)nombrePlan="Plan PREMIUM";
    const Temp_Plan_id = Plan_id;
    const Temp_Usuario_id = localStorage.getItem('userId');
    this.suscripcion.Plan.Plan_id = Temp_Plan_id;
    this.suscripcion.Usuario_id = Number(Temp_Usuario_id);
    this.suscripcion.Transaccion = 'INSERTAR_SUSCRIPCION';

    const mensaje = `Se ha suscrito al plan: ${nombrePlan}`;
    
    const confirmacion = window.confirm(`¿Desea suscribirse a este plan ?`);

    if (confirmacion) {
      this.planService.setSuscripcion(this.suscripcion)
        .subscribe(() => {
          this._snackBar.open(mensaje, 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          setTimeout(() => {
            this.router.navigate(['/pagina-principal']);
          }, 1500);
          
        },
        (error) => {
          console.error('Error al suscribirse:', error);
          // Agregar manejo de errores según sea necesario
        });
    }
  }
}
