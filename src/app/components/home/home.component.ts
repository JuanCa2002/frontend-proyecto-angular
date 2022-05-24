import { Component, OnInit } from '@angular/core';
import {Pelicula} from "../../models/pelicula";
import {PeliculaService} from "../../services/pelicula.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  retrieveResonse:any;
  base64Data:any;
  retrievedImage:any;
  imagenFondo:any;
  pelicula:Pelicula;
  peliculaEscogida:any;
  numeroAleatorio:number;
  proximosEstrenos:Pelicula[];
  peliculasDisponibles:Pelicula[];
  peliculasCompletas:Pelicula[];


  constructor(private peliculaService:PeliculaService, private router:Router) {

  }

  ngOnInit(): void {
    this.peliculaService.obtenerListadoPeliculasPorEstado("Por estrenarse").subscribe(dato=>{
      this.peliculasDisponibles= dato;
      this.proximosEstrenos= this.agregarImages(this.peliculasDisponibles);
    });
    this.peliculaService.obtenerListadoPeliculasPorEstado("Disponible").subscribe(dato=>{
       this.peliculasDisponibles=dato;
       this.peliculasCompletas= this.agregarImages(this.peliculasDisponibles);
       this.numeroAleatorio=this.random(0,this.peliculasDisponibles.length-1);
       console.log(this.peliculasDisponibles[this.numeroAleatorio]);
       this.pelicula= this.peliculasDisponibles[this.numeroAleatorio];
       this.peliculaService.getImage(this.pelicula.imagen).subscribe(dato=>{
         this.retrieveResonse = dato;
         this.base64Data = this.retrieveResonse.picByte;
         this.imagenFondo = 'data:image/jpeg;base64,' + this.base64Data;
         this.cambiarImagen(this.imagenFondo);
       });
     });

  }

  funcionfuncionCarousel2Derecha(){

    const fila= document.querySelector('.contenedor-carousel2');



    // @ts-ignore
    fila.scrollLeft += fila.offsetWidth;

  }

  funcionCarousel2Izquierda(){

    const fila= document.querySelector('.contenedor-carousel2');
    console.log(fila);


    // @ts-ignore
    fila.scrollLeft -= fila.offsetWidth;

  }

  funcionfuncionCarouselDerecha(){

    const fila= document.querySelector('.contenedor-carousel');



    // @ts-ignore
    fila.scrollLeft += fila.offsetWidth;
    console.log(fila.scrollLeft);

  }

  funcionCarouselIzquierda(){

    const fila= document.querySelector('.contenedor-carousel');
    console.log(fila);


    // @ts-ignore
    fila.scrollLeft -= fila.offsetWidth;
    console.log(fila.scrollLeft);
  }


  agregarHover(event){
    const peliculas= document.querySelectorAll('.pelicula');


    peliculas.forEach((pelicula)=>{
      pelicula.addEventListener('mouseenter',(e)=>{
        const elemento = e.currentTarget;
        setTimeout(()=>{
          peliculas.forEach(peliculas=> pelicula.classList.remove('.hover'))
          // @ts-ignore
          elemento.classList.add('hover');
        },300);

      });
    });
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




  mostrarDetallesPelicula(id:number){
    this.router.navigate(['detalles-pelicula',id]);
  }

  cambiarImagen(name:string){
    let nombre= 'linear-gradient(rgba(0,0,0,.50) 100%,rgba(0,0,0, .50) 100%), url("'+name+'")';
    document.getElementById("pelicula-principal").style.setProperty('background-image', nombre);
    document.getElementById("pelicula-principal2").style.setProperty('background-image', nombre);
  }



  random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }


}
