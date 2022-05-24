import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Genero} from "../../models/genero";
import {GeneroService} from "../../services/genero.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registrar-genero',
  templateUrl: './registrar-genero.component.html',
  styleUrls: ['./registrar-genero.component.css']
})
export class RegistrarGeneroComponent implements OnInit {

  genero:Genero= new Genero();
  formReactive:FormGroup

  constructor(private formBuilder:FormBuilder, private generoService:GeneroService, private router:Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formReactive= this.formBuilder.group({
      nombre:['',Validators.required]
    });
  }

  irListaGeneros(){
    this.router.navigate(['/generos']);
  }

  guardarGenero(){
    if(this.formReactive.invalid){
      swal(
        'Ha ocurrido un error!',
        'Por favor verifique los datos del formulario!',
        'error'
      )
    }
    else{
      this.generoService.createGender(this.genero).subscribe(dato=>{
        console.log(dato);
        swal(
          'Registro existoso!',
          'Se ha registrado el genero de manera exitosa!',
          'success'
        )
        this.irListaGeneros();
      },error => {
        console.log(error);
      })
    }
  }

}
