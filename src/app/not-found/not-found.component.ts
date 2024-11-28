import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(private appComponent: AppComponent,private router:Router) { 
    this.appComponent.mostrarCabecera =false;
    this.appComponent.mostrarFooter=false;
  }

  volver(){
    this.router.navigate(['']);
    //Volver a cargar la cabecera y el footer
    this.appComponent.mostrarCabecera=true;
    this.appComponent.mostrarFooter=true;
  }
}
