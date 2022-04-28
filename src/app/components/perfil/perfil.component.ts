import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {PeliculaService} from "../../services/pelicula.service";
import {NuevoUsuario} from "../../models/nuevo-usuario";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoginUsuario} from "../../models/login-usuario";
import swal from "sweetalert2";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nuevoUsuario:NuevoUsuario;
  file:File
  selectFiles: FileList;
  loginUsuario:LoginUsuario;
  usuarioActualizado:NuevoUsuario= new NuevoUsuario();
  formReactive:FormGroup;
  islogged= false;
  nombreUsuario= "";
  email="";
  retrieveResonse:any;
  base64Data:any;
  retrievedImage:any;
  imagen="";

  constructor(private tokeService:TokenService,private peliculaService:PeliculaService,
              private authService: AuthService,private formBuilder:FormBuilder,
              private router:Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    if(this.tokeService.getToken()){
       this.islogged= true;
       this.nombreUsuario= this.tokeService.getUserName();
       this.authService.getUser(this.nombreUsuario).subscribe(dato=>{
         this.nuevoUsuario= dato;
         console.log(this.nuevoUsuario);
       });
       this.imagen= this.tokeService.getImagen();
        this.peliculaService.getImage(this.imagen).subscribe(dato=>{
        this.retrieveResonse = dato;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
    }
  }
  crearFormulario(){
    this.formReactive= this.formBuilder.group({
      nombreCompleto:['',[Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$")]],
      nombreUsuario:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern("^[A-Za-z0-9+_.-]+@(.+)$")]],
      imagen:['']
    });
  }

  actualizarPerfil(){
    if(this.formReactive.invalid){
      swal(
        'Ha ocurrido un error',
         'Por favor verifica los campos',
        'error'

      )
      return;
    }
    if(this.file!=null && this.nuevoUsuario.nombre_imagen!=null){
      this.peliculaService.deleteImage(this.nuevoUsuario.nombre_imagen).subscribe(dato=>{
      });
      this.peliculaService.uploadImage(this.file,this.file.name).subscribe(dato=>{
      });
      this.nuevoUsuario.nombre_imagen= this.file.name;
    }else if(this.file!=null && this.nuevoUsuario.nombre_imagen==null){
      this.peliculaService.uploadImage(this.file,this.file.name).subscribe(dato=>{
      });
      this.nuevoUsuario.nombre_imagen= this.file.name;
    }
    this.usuarioActualizado.nombreUsuario= this.nuevoUsuario.nombreUsuario;
    this.usuarioActualizado.nombre= this.nuevoUsuario.nombre;
    this.usuarioActualizado.email=this.nuevoUsuario.email;
    this.usuarioActualizado.password= this.nuevoUsuario.password;
    this.usuarioActualizado.nombre_imagen=this.nuevoUsuario.nombre_imagen;
    this.authService.updateUser(this.usuarioActualizado,this.nombreUsuario).subscribe(dato=>{
        this.tokeService.setImagen(this.nuevoUsuario.nombre_imagen);
        swal(
        'Usuario Actualizado',
        'El usuario fue actualizado con éxito',
        'success'
        )
        window.location.reload();
      },error => {
      swal(
        'Ocurrió un error',
        error.error.mensaje,
        'success'
      )
    });
  }

  selectFile(event) {
    this.selectFiles = event.target.files;
    this.file = this.selectFiles.item(0);
  }

  get nombreUsuarioNoValido(){
    return this.formReactive.get('nombreUsuario').invalid && this.formReactive.get('nombreUsuario').touched;
  }

  get nombreCompletoNoValido(){
    return this.formReactive.get('nombreCompleto').invalid && this.formReactive.get('nombreCompleto').touched;
  }
  get correoNoValido(){
    return  this.formReactive.get('email').invalid && this.formReactive.get('email').touched;
  }



}
