import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Genero} from "../models/genero";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private baseUrl="http://localhost:8081/api/v1/generos";

  constructor(private httpClient:HttpClient) { }

  createGender(genero:Genero):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`,genero)
  }

  obtenerListaGeneros():Observable<Genero[]>{
    return this.httpClient.get<Genero[]>(`${this.baseUrl}`)
  }

  actualizarGeneros(id:number, genero:Genero):Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,genero)
  }

  eliminarGenero(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  obtenerGeneroPorId(id:number):Observable<Genero>{
    return this.httpClient.get<Genero>(`${this.baseUrl}/${id}`)
  }
}
