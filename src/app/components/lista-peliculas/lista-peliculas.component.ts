import { Component, OnInit } from '@angular/core';
import {Pelicula} from "../../models/pelicula";
import {PeliculaService} from "../../services/pelicula.service";
import {Router} from "@angular/router";
import swal from "sweetalert2";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {GeneroService} from "../../services/genero.service";
import {Genero} from "../../models/genero";

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {

  peliculas:Pelicula[];
  generos:Genero[];
  i:number=1;
  pageSize= 7;
  desde:number=0;
  hasta:number=7;
  selector:number=0;

  constructor(private peliculaService:PeliculaService, private router:Router, private paginator: MatPaginatorIntl,
              private  generoService:GeneroService) {
    this.paginator.itemsPerPageLabel= "Cantidad paginas:";
  }

  ngOnInit(): void {
    this.listarPeliculas();
    this.listarGenerosFiltro();
  }

  listarGenerosFiltro(){
    this.generoService.obtenerListaGeneros().subscribe(dato=>{
      this.generos= dato;
    })
  }

  removeFilter(){
    this.selector=0;
    this.listarPeliculas();
  }

   listarPeliculas(){
    this.peliculaService.obtenerListadoPeliculas().subscribe(dato =>{
      this.peliculas=dato;
    });
  }

  listarPeliculasPorGenero(selector:number){
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

  cambiarPagina(e:PageEvent){
    console.log(e);
    this.desde=e.pageIndex * e.pageSize;
    this.hasta= this.desde + e.pageSize;
  }

  registrarPelicula(){
    this.router.navigate(['registrar-pelicula']);
  }



}
