import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { UsuarioInterface } from '../interface/UsuarioInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
  ) {}

  hide = true;
  tmp_nombreUsuario: any;
  tmp_clave: any;

  usuarioLogin = new FormGroup({
    // Validaciones
    NombreUsuario: new FormControl('', Validators.required),
    Contrasena: new FormControl('', Validators.required),
    Transaccion: new FormControl()
  });

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  cerrarFormulario() {
    this.dialogRef.close();
  }

  validarAcceso() {
    // Ubicar la transacción de la Bd a usar
    this.usuarioLogin.value.Transaccion = "CONSULTA_USUARIOS_POR_USUARIO_CONTRASENA";
    this.tmp_nombreUsuario = this.usuarioLogin.value.NombreUsuario;
    this.tmp_clave = this.usuarioLogin.value.Contrasena;
  
    // Llamar al servicio
    this.authService.login(this.usuarioLogin.value as UsuarioInterface).subscribe((data: any) => {
      //console.log(data);
      
      if (data === null) {
        alert('Usuario no Autorizado');
        this.router.navigate(['/pagina-inicial']);
      } else {
        console.log(data);

        // Almacena el nombre de usuario en el localStorage
        localStorage.setItem('username', this.tmp_nombreUsuario);
        // Almacena el token o cualquier otro dato necesario en el localStorage
        localStorage.setItem('token_value', data);
        // Almacena el ID del usuario en localStorage
        localStorage.setItem('userId', data.userId.toString());

        // Actualiza el nombre de usuario en el servicio
        this.authService.setNombreUsuario(this.tmp_nombreUsuario);
  
        // Actualiza el estado de autenticación en el servicio
        this.authService.isLoggedIn();
  
        this.dialogRef.close({ usuarioLogin: this.usuarioLogin, mensaje: 'conectado' });
        this.router.navigate(['/pagina-principal']);
      }
    });
  }
  
}