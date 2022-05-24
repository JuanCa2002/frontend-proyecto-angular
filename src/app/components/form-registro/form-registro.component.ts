import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Pelicula} from "../../models/pelicula";
import {PeliculaService} from "../../services/pelicula.service";
import {Router} from "@angular/router";
import swal from "sweetalert2";
import {Genero} from "../../models/genero";
import {GeneroService} from "../../services/genero.service";

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {

  idVideo:string;
  generos:Genero[];
  urlVideo:string;
  url:any;
  formReactive:FormGroup;
  file:File
  selectFiles: FileList;
  pelicula: Pelicula= new Pelicula();


  constructor(private peliculaService:PeliculaService, private router:Router, private formBuilder: FormBuilder,
              private generoService:GeneroService) {
    this.crearFormulario();
    this.listarGeneros();

  }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  selectFile(event) {
    this.selectFiles = event.target.files;
    this.file = this.selectFiles.item(0);
  }

  listarGeneros(){
    this.generoService.obtenerListaGeneros().subscribe(dato=>{
      this.generos= dato;
    })
  }


  guardarPelicula(){
    if(this.formReactive.invalid){
      swal(
        'Ha ocurrido un error!',
        'Por favor verifique los datos del formulario!',
        'error'
      )
    }
    else{
      this.peliculaService.uploadImage(this.file,this.file.name).subscribe(dato=>{
        console.log(dato);
      });
      this.pelicula.urlVideo=this.idVideo;
      this.pelicula.imagen=this.file.name;
      this.peliculaService.registrarPelicula(this.pelicula).subscribe(dato=>{
        console.log(dato);
        this.irListaPeliculas();
          swal(
            'Película Registrada!',
            'La película fue registrada con éxito!',
            'success'
          )
        },error => {
          console.log(error);
        }
      )

    }



  }

  irListaPeliculas(){
    this.router.navigate(['/peliculas']);
  }


  crearFormulario(){
    this.formReactive= this.formBuilder.group({
      titulo:['',[Validators.required,
                  Validators.minLength(2)]],
      director:['',[Validators.required,
                   Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"),
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
      imagen:['',[Validators.required]],
      url:['',[Validators.required]]
    });
  }

  get tituloNoValido(){
    return this.formReactive.get('titulo').invalid && this.formReactive.get('titulo').touched;
  }

  get directorNoValido(){
    return this.formReactive.get('director').invalid ;
  }

  get imagenNoValida(){
    return this.formReactive.get('imagen').invalid && this.formReactive.get('imagen').touched;
  }

  get touchedDirector(){
    return  this.formReactive.get('director').touched;
  }

  get fecha_estrenoNoValido(){
    return this.formReactive.get('fecha_estreno').invalid;
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(this.url);
      }
    }

}
  GFG_Fun() {
    this.idVideo = this.urlVideo.split("v=")[1].substring(0, 11);
  }






}
