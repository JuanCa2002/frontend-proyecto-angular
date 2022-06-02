import { Component, OnInit } from '@angular/core';
import {GeneroService} from "../../services/genero.service";
import {Genero} from "../../models/genero";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-genders',
  templateUrl: './list-genders.component.html',
  styleUrls: ['./list-genders.component.css']
})
export class ListGendersComponent implements OnInit {

  generos:Genero[];

  constructor(private generoService: GeneroService, private router:Router) { }

  ngOnInit(): void {
    this.listarGeneros();
  }

  listarGeneros(){
     this.generoService.obtenerListaGeneros().subscribe(dato=>{
       this.generos= dato;
     })
  }

  eliminarGenero(id:number){
    swal({
      title: '¿Estás seguro de eliminar el género?',
      text: "Una vez se elimine no se pódra recuperar la información!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Elimínalo!'
    }).then( (result)=> {
      if(result.value){
        this.generoService.eliminarGenero(id).subscribe(dato=>{
          this.listarGeneros();
        });
        swal(
          'Género eliminado',
          'El género fue eliminado con éxito',
          'success'
        )
      }

    })

  }

  actualizarGenero(id:number){
    this.router.navigate(['actualizar-genero',id]);
  }

  registrarGenero(){
    this.router.navigate(['/registrar-genero']);
  }

}
