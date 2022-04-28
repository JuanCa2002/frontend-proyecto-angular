import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {PeliculaService} from "../../services/pelicula.service";

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  isLogged= false;
  nombreUsuario="";

  constructor(private tokeService:TokenService) {
  }

  ngOnInit(): void {
    if(this.tokeService.getToken()){
      this.isLogged=true;
      this.nombreUsuario= this.tokeService.getUserName();
    }else{
      this.isLogged=false;
      this.nombreUsuario="";
    }
  }

}
