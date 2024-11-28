import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  constructor(private router: Router, public dialog: MatDialog, private cdr: ChangeDetectorRef, private authService: AuthService) { }
  isLogginIn = false;
  nombreUsuario: any;

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);
  
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.mensaje === "conectado") {
        this.isLogginIn = true;
  
        // Obtener el nombre de usuario después de la llamada al servicio
        this.nombreUsuario = this.authService.getNombreUsuario();
  
        this.cdr.detectChanges(); // Forzar la detección de cambios
        setTimeout(() => {
          this.router.navigate(['/pagina-principal']);
        }, 0);
      }
    });
  }
  

  closeLogin() {
    localStorage.removeItem('token_value');// Elimina la clave del token
    localStorage.clear();
    this.isLogginIn = false;
    this.router.navigate(['/pagina-inicial']);
  }
  
  Openclases(){
    
    this.router.navigate(['/inscripcion']);
  }

  Opencontacto(){
    
    this.router.navigate(['/contacto']);
  }
  OpenInstructores(){
    
    this.router.navigate(['/suscripcion']);
  }
  OpenInicio(){
    
    this.router.navigate(['/pagina-principal']);
  }
}
