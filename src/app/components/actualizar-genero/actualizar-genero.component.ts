import { Component, OnInit } from '@angular/core';
import {GeneroService} from "../../services/genero.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Genero} from "../../models/genero";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-actualizar-genero',
  templateUrl: './actualizar-genero.component.html',
  styleUrls: ['./actualizar-genero.component.css']
})
export class ActualizarGeneroComponent implements OnInit {

  id:number;
  formReactive:FormGroup;
  genero:Genero= new Genero();

  constructor(private formBuilder:FormBuilder,private generoService:GeneroService,private activatedRoute:ActivatedRoute,
              private router:Router) {
    this.crearFormulario();
    this.id= this.activatedRoute.snapshot.params['id'];
    this.generoService.obtenerGeneroPorId(this.id).subscribe(dato=>{
      this.genero= dato;
    })
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


  actualizarGenero(){
    if(this.formReactive.invalid){
      swal(
        'Ha ocurrido un error!',
        'Por favor verifique los datos del formulario!',
        'error'
      )
    }else{
      this.generoService.actualizarGeneros(this.id, this.genero).subscribe(dato=>{
        swal(
          'Género actualizado!',
          'El género fue actualizado con éxito!',
          'success'
        )
        this.irListaGeneros();
      });
    }

  }





}
