import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {AuthService} from "../../services/auth.service";
import {Route, Router} from "@angular/router";
import {LoginUsuario} from "../../models/login-usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged=false;
  isLoginFail= false;
  loginUsuario :LoginUsuario;
  nombreUsuario: string;
  password:string;
  roles:string[]=[];
  errorMensaje:string;

  constructor(private tokenService:TokenService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged= true;
      this.isLoginFail= false;
      this.roles= this.tokenService.getAuthorities();

    }
  }

  onLogin():void{
    this.loginUsuario= new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe(dato=>{
      this.isLogged= true;
      this.isLoginFail= false;
      this.tokenService.setImagen(dato.nombre_imagen);
      this.tokenService.setToken(dato.token);
      this.tokenService.setUserName(dato.nombreUsuario);
      this.tokenService.setAuthorities(dato.authorities);
      this.roles= dato.authorities;
      this.router.navigate(['/pagina-principal']);
    },error => {
      this.isLogged=false;
      this.isLoginFail=true;

    });
  }

}
