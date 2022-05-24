import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NuevoUsuario} from "../models/nuevo-usuario";
import {Observable} from "rxjs";
import {LoginUsuario} from "../models/login-usuario";
import {JwtDTO} from "../models/jwt-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL= 'http://localhost:8081/auth/';

  constructor(private httpClient:HttpClient ) { }


  public nuevo(nuevoUsuario:NuevoUsuario):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'nuevo',nuevoUsuario);
  }

  public login(loginUsuario:LoginUsuario):Observable<JwtDTO>{
    return this.httpClient.post<any>(this.authURL+'login',loginUsuario);
  }

  public getUser(nombreUsuario:string):Observable<NuevoUsuario>{
    return this.httpClient.get<NuevoUsuario>(`${this.authURL}getUser/${nombreUsuario}`);
  }

  public updateUser(nuevoUsuario:NuevoUsuario, nombreUsuario:String):Observable<any>{
    return this.httpClient.put<any>(`${this.authURL}updateUser/${nombreUsuario}`,nuevoUsuario);
  }

  public updatePassword(nombreUsuario:string, formData:FormData):Observable<any>{
    return this.httpClient.put<any>(`${this.authURL}updateContrasena/${nombreUsuario}`,formData);
  }

  public getUserAmountForYear(year:number):Observable<number>{
    return this.httpClient.get<number>(`${this.authURL}usuarios/year/${year}`);
  }


}
