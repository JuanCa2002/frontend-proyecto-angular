import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NuevoUsuario} from "../../models/nuevo-usuario";
import {AuthService} from "../../services/auth.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario:NuevoUsuario= new NuevoUsuario();
  formReactive:FormGroup;
  errorMensaje:string;
  isRegisterFail=true;

  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router:Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  registrarNuevoUsuario(){
    if(this.formReactive.invalid ){
      swal(
        'Ha ocurrido un error!',
        'Por favor verifica los datos de registro!',
        'error'
      )
      return;
    }
    this.authService.nuevo(this.nuevoUsuario).subscribe(dato=>{
      swal(
        'Usuario Registrado!',
        'Te haz registrado exitosamente!',
        'success'
      )
      this.router.navigate(['/pagina-principal'])
      this.isRegisterFail=false;
    },error => {
      this.isRegisterFail=true;
      this.errorMensaje=error.error.mensaje;
      swal(
        'Ha ocurrido un error!',
        this.errorMensaje,
        'error'
      )
    });
  }

  crearFormulario(){
    this.formReactive= this.formBuilder.group({
      nombreCompleto:['',[Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$")]],
      nombreUsuario:['',[Validators.required]],
      correo:['',[Validators.required,Validators.pattern("^[A-Za-z0-9+_.-]+@(.+)$")]],
      password:['',[Validators.required, Validators.minLength(8)]]
    });
  }

  irInicioSesion(){
    this.router.navigate(['/login']);
  }

  get nombreUsuarioNoValido(){
    return this.formReactive.get('nombreUsuario').invalid && this.formReactive.get('nombreUsuario').touched;
  }

  get nombreCompletoNoValido(){
    return this.formReactive.get('nombreCompleto').invalid && this.formReactive.get('nombreCompleto').touched;
  }
  get correoNoValido(){
    return  this.formReactive.get('correo').invalid && this.formReactive.get('correo').touched;
  }

  get passwordNoValida(){
    return this.formReactive.get('password').invalid && this.formReactive.get('password').touched;
  }


}
