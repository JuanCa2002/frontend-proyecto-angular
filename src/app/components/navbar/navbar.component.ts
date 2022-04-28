import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {PeliculaService} from "../../services/pelicula.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged= false;
  roles:string[];
  isAdmin= false;
  imagen="";
  retrieveResonse:any;
  base64Data:any;
  retrievedImage:any;
  nombreUsuario="";

  constructor(private route:Router,private tokenService:TokenService,private peliculaService:PeliculaService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged= true;
      this.nombreUsuario= this.tokenService.getUserName();
      this.imagen= this.tokenService.getImagen();
      console.log(this.imagen);
      this.peliculaService.getImage(this.imagen).subscribe(dato=>{
        this.retrieveResonse = dato;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
      console.log(this.isLogged);
    }else{
      this.isLogged=false;
      this.nombreUsuario="";
      console.log(this.isLogged);
    }
    this.roles= this.tokenService.getAuthorities();
    this.roles.forEach(rol=>{
      if(rol=== 'ROLE_ADMIN'){
         this.isAdmin=true;
      }
    });
  }

  buscarPelicula(termino:string){
    this.route.navigate(['/buscar',termino]);
  }

  onLogOut():void{
    this.tokenService.logOut();
    this.isLogged=false;
    if(window.location.href=='http://localhost:4200/pagina-principal'){
      window.location.reload();
      window.location.reload();
    }
    else{
      this.route.navigate(['/pagina-principal']);
    }


  }

}
