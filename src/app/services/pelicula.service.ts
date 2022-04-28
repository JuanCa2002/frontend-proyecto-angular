import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pelicula} from "../pelicula";
import {Byte} from "@angular/compiler/src/util";


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private baseUrl="http://localhost:8081/api/v1/peliculas";
  private baseUrl2="http://localhost:8081/api/v1";

  constructor(private httpClient: HttpClient) { }

  obtenerListadoPeliculas():Observable<Pelicula[]>{
    return this.httpClient.get<Pelicula[]>(`${this.baseUrl}`);
  }

  obtenerListadoPeliculasPorGenero(genero:string):Observable<Pelicula[]>{
    return this.httpClient.get<Pelicula[]>(`${this.baseUrl}/genero/${genero}`);
  }

  registrarPelicula(pelicula:Pelicula):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`,pelicula);
  }


  obtenerPeliculaPorId(id:number): Observable<Pelicula>{
    return this.httpClient.get<Pelicula>(`${this.baseUrl}/${id}`);
  }

  actualizarPelicula(id:number,pelicula:Pelicula):Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,pelicula);
  }

  eliminarPelicula(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  buscarPelicula(termino:string,peliculas:Pelicula[]):Pelicula[]{
    let peliculasEncontradas: Pelicula[]=[]
    termino= termino.toLowerCase();
    for(let pelicula of peliculas){
      let titulo=pelicula.titulo.toLowerCase();
      if(titulo.indexOf(termino)>=0){
        peliculasEncontradas.push(pelicula);
      }
    }
    return peliculasEncontradas;
  }

  uploadImage(file:File, name:string):Observable<any>{
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', file, name);
    return this.httpClient.post(`${this.baseUrl2}/image/upload`,uploadImageData);
  }

  getImage(name:string):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl2}/getImage/${name}`);
  }

  deleteImage(name:string):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl2}/image/${name}`);
  }

  updateImage(file:File,name:string):Observable<any>{
    const uploadImageData = new FormData();
    uploadImageData.append('File', file, name);
    return this.httpClient.put(`${this.baseUrl2}/image/${name}`,uploadImageData);
  }

  obtenerListadoPeliculasPorEstado(estado:string):Observable<Pelicula[]>{
    return this.httpClient.get<Pelicula[]>(`${this.baseUrl}/estado/${estado}`);
  }


}
