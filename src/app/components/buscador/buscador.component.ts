import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PeliculaService} from "../../services/pelicula.service";
import {Pelicula} from "../../pelicula";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  termino:string;
  peliculasExistentes:Pelicula[];
  peliculasEncontradas:Pelicula[];
  peliculasCompletas:Pelicula[];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private peliculaService:PeliculaService) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.peliculaService.obtenerListadoPeliculas().subscribe(dato=>{
      this.peliculasExistentes=dato;
      this.activatedRoute.params.subscribe(params=>{
        this.termino= params['termino'];
        this.peliculasEncontradas= this.peliculaService.buscarPelicula(this.termino,this.peliculasExistentes);
        this.peliculasCompletas=this.agregarImages(this.peliculasEncontradas);
        console.log(this.peliculasCompletas);
      });
    });


  }

  obtenerPeliculas(){
    this.peliculaService.obtenerListadoPeliculas().subscribe(dato=>{
      this.peliculasExistentes=dato;
    })
  }

  agregarImages(peliculas:Pelicula[]):Pelicula[]{
    let peliculasEncontradas: Pelicula[]=[]
    for(let pelicula of peliculas){
      this.peliculaService.getImage(pelicula.imagen).subscribe(dato=>{
        this.retrieveResonse = dato;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        pelicula.retrieveImage= this.retrievedImage;
        peliculasEncontradas.push(pelicula);
      });
    }
    return peliculasEncontradas;
  }

  playerConfig = {
    controls: 2,
    mute: 1,
    autoplay: 0,
  };

}
