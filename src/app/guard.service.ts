import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usuario = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if (usuario.isLoggedIn()) {
    // Usuario autenticado, permitir el acceso a la página principal
    return true;
  } else {
    // Usuario no autenticado, mostrar mensaje y redirigir a la página de inicio
    snackBar.open('Debe iniciar sesión para acceder a esta página', 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

    router.navigate(['/pagina-inicial']);
    return false;
  }
};
