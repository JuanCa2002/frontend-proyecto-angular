import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {AuthService} from "../../services/auth.service";
import {NuevoUsuario} from "../../models/nuevo-usuario";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-administrar-contrasena',
  templateUrl: './administrar-contrasena.component.html',
  styleUrls: ['./administrar-contrasena.component.css']
})
export class AdministrarContrasenaComponent implements OnInit {

  contrasenaNueva:string;
  usuario: NuevoUsuario;
  formReactive:FormGroup
  nombreUsuario:string;
  confimarContrasena:string;

  constructor(private tokenService:TokenService,private authService:AuthService,
              private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
    if(this.tokenService.getToken()){
      this.nombreUsuario= this.tokenService.getUserName();
      this.authService.getUser(this.nombreUsuario).subscribe(dato=>{
        this.usuario= dato;
      });
    }
  }



  actualizarContrasena(){
    if(this.formReactive.invalid){
      swal(
        'Error!',
        'Se necesita una contraseña de 8 carácteres!',
        'error'
      )
      return;
    }
    if(this.contrasenaNueva==this.confimarContrasena){
      const formData= new FormData();
      formData.append('password',this.contrasenaNueva);
      this.authService.updatePassword(this.nombreUsuario,formData).subscribe(dato=>{
        swal(
          'Contraseña Actualizada!',
          'La contraseña fue actualizada con éxito!',
          'success'
        )
      this.router.navigate(['/pagina-principal']);
      });
    }
    else{
      swal(
        'Error!',
        'Las contraseñas no son iguales!',
        'error'
      )
    }

  }

  crearFormulario(){
    this.formReactive= this.formBuilder.group({
      newPassword:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8)]]
    });
  }

  get newPasswordNoValida(){
    return this.formReactive.get('newPassword').invalid && this.formReactive.get('newPassword').touched;
  }

  get confirmPasswordNoValida(){
    return this.formReactive.get('confirmPassword').invalid && this.formReactive.get('confirmPassword').touched;
  }




}
