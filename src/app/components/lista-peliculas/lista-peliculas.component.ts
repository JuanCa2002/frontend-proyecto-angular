import { Component, OnInit } from '@angular/core';
import {Pelicula} from "../../pelicula";
import {PeliculaService} from "../../services/pelicula.service";
import {Router} from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {

  peliculas:Pelicula[];
  selector:string="0";

  constructor(private peliculaService:PeliculaService, private router:Router) { }

  ngOnInit(): void {
    this.listarPeliculas();

  }

  removeFilter(){
    this.selector="0";
    this.listarPeliculas();
  }

   listarPeliculas(){
    this.peliculaService.obtenerListadoPeliculas().subscribe(dato =>{
      this.peliculas=dato;
    });
  }

  listarPeliculasPorGenero(selector:string){
    this.peliculaService.obtenerListadoPeliculasPorGenero(selector).subscribe((dato =>{
      this.peliculas=dato;
    }))
  }


  actualizarPelicula(id:number){
    this.router.navigate(['actualizar-pelicula',id]);
  }

  eliminarPelicula(id:number,name:string){
    swal({
      title: '¿Estás seguro de eliminar la película?',
      text: "Una vez se elimine no se pódra recuperar la información!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Elimínalo!'
    }).then( (result)=> {
      if(result.value){
        this.peliculaService.deleteImage(name).subscribe(dato=>{
        });
        this.peliculaService.eliminarPelicula(id).subscribe(dato=>{
          this.listarPeliculas();
        });
        swal(
          'Película eliminada',
          'La película fue eliminada con éxito',
          'success'
        )
      }

    })

  }

  mostrarDetallesPelicula(id:number){
    this.router.navigate(['detalles-pelicula',id]);
  }



}
