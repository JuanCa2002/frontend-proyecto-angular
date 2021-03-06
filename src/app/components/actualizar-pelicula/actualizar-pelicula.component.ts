import { Component, OnInit } from '@angular/core';
import {PeliculaService} from "../../services/pelicula.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pelicula} from "../../models/pelicula";
import swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneroService} from "../../services/genero.service";
import {Genero} from "../../models/genero";

@Component({
  selector: 'app-actualizar-pelicula',
  templateUrl: './actualizar-pelicula.component.html',
  styleUrls: ['./actualizar-pelicula.component.css']
})
export class ActualizarPeliculaComponent implements OnInit {

  id:number;
  idGenero:number;
  generos:Genero[];
  genero:Genero= new Genero();
  idVideo:string;
  url:string;
  formReactive:FormGroup;
  file:File
  selectFiles: FileList;
  imagen:any;
  pelicula:Pelicula= new Pelicula();

  constructor(private peliculaService:PeliculaService, private router:Router, private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder, private generoService:GeneroService) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.crearFormulario();
    this.id= this.activatedRoute.snapshot.params['id'];
    this.peliculaService.obtenerPeliculaPorId(this.id).subscribe(dato=>{
      this.pelicula= dato;
    }, error => {
      console.log(error);
    });
    this.listarGeneros();
  }

  selectFile(event) {
    this.selectFiles = event.target.files;
    this.file = this.selectFiles.item(0);

  }

  irListaPeliculas(){
    this.router.navigate(['/peliculas']);
  }

  listarGeneros(){
    this.generoService.obtenerListaGeneros().subscribe(dato=>{
      this.generos= dato;
    });
  }

  actualizarPelicula(){
    if(this.formReactive.invalid){
      swal(
        'Ha ocurrido un error!',
        'Por favor verifique los datos del formulario!',
        'error'
      )
    }
    else{
      if(this.idGenero!=null){
        this.generoService.obtenerGeneroPorId(this.idGenero).subscribe(dato=>{
          this.genero= dato;
          this.pelicula.genero= this.genero;
          if(this.file!=null){
            this.peliculaService.deleteImage(this.pelicula.imagen).subscribe(dato=>{
            });
            this.peliculaService.uploadImage(this.file,this.file.name).subscribe(dato=>{
            });
            this.pelicula.imagen= this.file.name;
          }
          if(this.idVideo!=null){
            this.pelicula.urlVideo=this.idVideo;
          }
          console.log(this.pelicula.genero)
          this.peliculaService.actualizarPelicula(this.id,this.pelicula).subscribe(dato=>{
            this.irListaPeliculas();
            swal(
              'Pel??cula actualizada!',
              'La pel??cula fue actualizada con ??xito!',
              'success'
            )
          })
        });
      }

  }
  }

  crearFormulario(){
    this.formReactive= this.formBuilder.group({
      titulo:['',[Validators.required,
        Validators.minLength(2)]],
      director:['',[Validators.required,
        Validators.pattern("^[a-zA-Z??-??\u00f1\u00d1]+(\\s*[a-zA-Z??-??\u00f1\u00d1]*)*[a-zA-Z??-??\u00f1\u00d1]+$"),
        Validators.minLength(5),
      ]],
      fecha_estreno:['',[Validators.required,
        Validators.pattern("^[0-9]+"),
        Validators.minLength(4)]],
      presupuesto:['',[Validators.required,
        Validators.minLength(5)]],
      descripcion:['',[Validators.required,
        Validators.minLength(10)]],
      genero:['',[Validators.required]],
      estado:['',[Validators.required]],
      url:[''],
      imagen:['']
    });
  }

  get tituloNoValido(){
    return this.formReactive.get('titulo').invalid && this.formReactive.get('titulo').touched;
  }

  get directorNoValido(){
    return this.formReactive.get('director').invalid ;
  }

  get touchedDirector(){
    return  this.formReactive.get('director').touched;
  }
  get imagenNoValida(){
    return this.formReactive.get('imagen').invalid;
  }


  get fecha_estrenoNoValido(){
    return this.formReactive.get('fecha_estreno').invalid ;
  }

  get touchedFecha(){
    return this.formReactive.get('fecha_estreno').touched;
  }

  get presupuestoNoValido(){
    return this.formReactive.get('presupuesto').invalid && this.formReactive.get('presupuesto').touched;
  }

  get descripcionNoValido(){
    return this.formReactive.get('descripcion').invalid && this.formReactive.get('descripcion').touched;
  }

  GFG_Fun() {
    if(this.url!=null){
      this.idVideo = this.url.split("v=")[1].substring(0, 11);
    }

  }

}
