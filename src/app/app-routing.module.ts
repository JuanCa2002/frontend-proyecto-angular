import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaPeliculasComponent} from "./components/lista-peliculas/lista-peliculas.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FormRegistroComponent} from "./components/form-registro/form-registro.component";
import {ActualizarPeliculaComponent} from "./components/actualizar-pelicula/actualizar-pelicula.component";
import {PeliculaDetallesComponent} from "./components/pelicula-detalles/pelicula-detalles.component";
import {BuscadorComponent} from "./components/buscador/buscador.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistroComponent} from "./auth/registro/registro.component";
import {PaginaPrincipalComponent} from "./components/pagina-principal/pagina-principal.component";
import {PeliGuardService as guard} from "./guards/peli-guard.service";
import {PerfilComponent} from "./components/perfil/perfil.component";
import {AdministrarContrasenaComponent} from "./components/administrar-contrasena/administrar-contrasena.component";
import {SendEmailComponent} from "./components/changePassword/send-email/send-email.component";
import {ChangePasswordComponent} from "./components/changePassword/change-password/change-password.component";
import {EstadisticasComponent} from "./components/estadisticas/estadisticas.component";
import {RegistrarGeneroComponent} from "./components/registrar-genero/registrar-genero.component";
import {ListGendersComponent} from "./components/list-genders/list-genders.component";
import {ActualizarGeneroComponent} from "./components/actualizar-genero/actualizar-genero.component";


const routes: Routes = [
  {path:'generos',component:ListGendersComponent},
  {path:'actualizar-genero/:id',component:ActualizarGeneroComponent},
  {path:'registrar-genero', component: RegistrarGeneroComponent},
  {path:'sendEmail',component:SendEmailComponent},
  {path:'estadisticas', component: EstadisticasComponent},
  {path:'changePassword/:tokenPassword',component:ChangePasswordComponent},
  {path:'administrar-contrasena',component:AdministrarContrasenaComponent},
  {path:'login',component:LoginComponent},
  {path:'perfil',component:PerfilComponent},
  {path:'pagina-principal',component:PaginaPrincipalComponent},
  {path: 'registro', component:RegistroComponent},
  {path:'peliculas',component:ListaPeliculasComponent, canActivate:[guard],data:{expectedRol:['admin']}},
  {path:'home',component:HomeComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path: 'registrar-pelicula', component:FormRegistroComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path: 'actualizar-pelicula/:id',component:ActualizarPeliculaComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path: 'detalles-pelicula/:id',component:PeliculaDetallesComponent},
  {path: 'buscar/:termino',component:BuscadorComponent},
  {path:'**',pathMatch:'full', redirectTo:'pagina-principal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
