import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { authGuard } from './guard.service';
import { RegistroComponent } from './registro/registro.component';
import { SuscripcionComponent } from './suscripcion/suscripcion.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';

const routes: Routes = [
  //Rutas
  {path:'',component:PaginaInicialComponent},
  {path: 'registro',component:RegistroComponent}, 
  {path: 'pagina-inicial',component:PaginaInicialComponent},
  {path: 'pagina-principal',component:PaginaPrincipalComponent,canActivate:[authGuard]}, 
  {path: 'suscripcion', component: SuscripcionComponent,canActivate:[authGuard]},
  {path: 'inscripcion', component: InscripcionComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }