import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClaseServiceService } from '../clase-service.service';
import { InscripcionInterface } from '../interface/InscripcionInterface';
import { DialogServiceService } from '../dialog.service.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.css'
})
export class InscripcionComponent {

  private inscripcion: InscripcionInterface = {
    Usuario_id: 0, 
    Transaccion: '',
    Clase: {
      Clase_id: 0,
      Nombre: '',
      Descripcion: '',
      Instructor: '',
      Jornada: ''
    },
    Id_inscripcion: 0,
    Nombres: ''
  };

  constructor(private _snackBar: MatSnackBar, private router: Router, private claseService: ClaseServiceService, private DialogServiceService: DialogServiceService) {}

  ConfirmarInscripcion(Clase_id: number) {
    var nombreClase="";
    if(Clase_id===1)nombreClase="Yoga";
    if(Clase_id===2)nombreClase="Cardio";
    if(Clase_id===3)nombreClase="Zumba";
    const Temp_Clase_id = Clase_id;
    const Temp_Usuario_id = localStorage.getItem('userId');
    this.inscripcion.Clase.Clase_id = Temp_Clase_id;
    this.inscripcion.Usuario_id = Number(Temp_Usuario_id);
    this.inscripcion.Transaccion = 'INSERTAR_INSCRIPCION';

    const mensaje = `Se ha inscrito a la clase: ${nombreClase}`;

    this.DialogServiceService.openConfirmDialog(`¿Desea inscribirse a la clase de: ${nombreClase}?`)
    .afterClosed().subscribe(res => {
      if (res) {
        // Si el usuario confirma, realiza la suscripción
        this.claseService.setInscripcion(this.inscripcion)
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
    });
  }






}
