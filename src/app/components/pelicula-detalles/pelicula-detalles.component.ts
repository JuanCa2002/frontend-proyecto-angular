import { Component, OnInit } from '@angular/core';
import {PeliculaService} from "../../services/pelicula.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pelicula} from "../../models/pelicula";

@Component({
  selector: 'app-pelicula-detalles',
  templateUrl: './pelicula-detalles.component.html',
  styleUrls: ['./pelicula-detalles.component.css']
})
export class PeliculaDetallesComponent implements OnInit {

  id:number;
  pelicula:Pelicula;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  calificacion:number=1;
  calificacionTotal:number;
  trailer:boolean=false;


  constructor(private peliculaService:PeliculaService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.id= this.route.snapshot.params['id'];
    this.peliculaService.obtenerPeliculaPorId(this.id).subscribe(dato=>{
      this.pelicula= dato;
      this.calificacionTotal= this.pelicula.calificacion/this.pelicula.totalVotos;
      this.peliculaService.getImage(this.pelicula.imagen).subscribe(dato=>{
        this.retrieveResonse = dato;
        console.log(dato);
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        console.log(this.retrievedImage);
      });
    });


  }

  calificar(){
    this.peliculaService.guardarCalificacion(this.calificacion,this.id).subscribe(dato=>{
     window.location.reload();
    })
  }



  mostrarTrailer(){
    this.trailer=true;
  }
  playerConfig = {
    controls: 2,
    mute: 1,
    autoplay: 1,
  };
}
