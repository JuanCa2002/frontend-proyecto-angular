import {Genero} from "./genero";

export class Pelicula {
  id:number;
  titulo: string;
  director:string;
  fecha_estreno:number;
  presupuesto: string;
  descripcion: string;
  imagen:string;
  genero:Genero= new Genero();
  estado:string;
  urlVideo:string;
  totalVotos:number;
  calificacion:number;
  retrieveImage:any;
}
