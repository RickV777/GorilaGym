import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioNuevo } from '../interface/UsuarioNuevo'; 
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { AppComponent} from '../app.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario: UsuarioNuevo = {
    NombreUsuario: '',
    Nombres: '',
    Apellidos: '',
    Contrasena: '',
    FechaNacimiento: '',
    Transaccion: 'AGREGAR_USUARIO'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private appComponent: AppComponent
  ) {

    this.appComponent.mostrarCabecera =false;

  }

  registrarUsuario() {
    // Formatear la fecha antes de enviarla al servidor
    this.usuario.FechaNacimiento = this.datePipe.transform(this.usuario.FechaNacimiento, 'yyyy-MM-dd');

    // Ubicar la transacción de la Bd a usar
    this.usuario.Transaccion = "AGREGAR_USUARIO";

    // Llamar al servicio para agregar el usuario
    this.authService.addUser(this.usuario).subscribe(
      (response) => {
        // Verificar la respuesta del servidor
        if (response.respuesta === "Ok") {
          // Mostrar mensaje de éxito
          this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
            duration: 3000,
          });

          // Realizar acciones adicionales si es necesario
          // ...

          // Redirigir a otra página o realizar alguna acción adicional
          this.router.navigate(['/pagina-inicial']);
        } else {
          // Mostrar mensaje de error desde la respuesta del servidor
          this.snackBar.open(response.leyenda, 'Cerrar', {
            duration: 3000,
          });
        }
      },
      (error) => {
        // Manejar errores, mostrar mensaje de error, etc.
        this.snackBar.open('Error al registrar el usuario', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

camposLlenos(): boolean {
    // Verificar que todos los campos estén llenos
    return (
      this.usuario.NombreUsuario &&
      this.usuario.Nombres &&
      this.usuario.Apellidos &&
      this.usuario.Contrasena &&
      this.usuario.FechaNacimiento
    );
}


}
