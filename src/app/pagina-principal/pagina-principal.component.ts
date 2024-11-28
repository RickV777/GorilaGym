import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PlanServiceService } from '../plan-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClaseServiceService } from '../clase-service.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {
  suscripcionInfo: any; // Variable para almacenar la información
  panelOpenState = false;
  inscripcionInfo: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private planService: PlanServiceService,
    private _snackBar: MatSnackBar,
    private claseService: ClaseServiceService
  ) {}

  ngOnInit(): void {
    // Verificar la autenticación al cargar la página
    if (this.authService.isLoggedIn()===false) {
      // No autenticado, redirigir a la página de inicio
      this.router.navigate(['/pagina-inicial']);
    }else {
      // Obtener información de suscripción al cargar el componente
      this.planService.getSuscripcion().subscribe(
        (response) => {
          this.suscripcionInfo = response;
          console.log(this.suscripcionInfo);
          // Maneja la información de suscripción 
        },
        (error) => {
          console.error('Error al obtener la suscripción:', error);
        }      
      );
      this.claseService.getInscripcion().subscribe(
        (respuesta) => {
          this.inscripcionInfo = respuesta;
          console.log(this.inscripcionInfo);
          // Maneja la información de inscripcion 
        },
        (error) => {
          console.error('Error al obtener la inscripcion:', error);
        }      
      );
    }
  }

  MostrarSuscripciones(){
    this.router.navigate(['/suscripcion']);
  }
  MostrarInscripciones(){
    this.router.navigate(['/inscripcion']);
  }
  
  CancelarSuscripcion() {
    const suscripcion = {
      usuario_id: this.suscripcionInfo.usuario_id,
      transaccion: 'CANCELAR_SUSCRIPCION'
    };
    const confirmacion = window.confirm("Esta apunto de cancelar esta suscripcion. Está seguro que desea Cancelarla?");
    if (confirmacion) {
      this.planService.cancelarSuscripcion(suscripcion).subscribe(
        (response) => {
          // Muestra un cuadro de confirmación según la respuesta del servidor
          console.log(response)
          this.suscripcionInfo = null;
          this._snackBar.open("Se ha cancelado la suscripcion a su plan anterior", 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          setTimeout(() => {
            this.panelOpenState = false;
          }, 1500);
        },
        (error) => {
          console.error('Error al cancelar la suscripción:', error);
        }
      );
    } else {
      // El usuario canceló
    }
    
    }

    CancelarInscripcion() {
      const inscripcion = {
        usuario_id: this.inscripcionInfo.usuario_id,
        transaccion: 'CANCELAR_INSCRIPCION'
      };
      const confirmacion = window.confirm("Esta apunto de cancelar tu inscripción. Está seguro que desea Cancelarla?");
      if (confirmacion) {
        this.claseService.cancelarInscripcion(inscripcion).subscribe(
          (response) => {
            // Muestra un cuadro de confirmación según la respuesta del servidor
            console.log(response)
            this.inscripcionInfo = null;
            this._snackBar.open("Se ha cancelado la inscripcion a su clase anterior", 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
            setTimeout(() => {
              this.panelOpenState = false;
            }, 1500);
          },
          (error) => {
            console.error('Error al eliminar la inscripcion:', error);
          }
        );
      } else {
        // El usuario canceló
      }
      
      }

}
