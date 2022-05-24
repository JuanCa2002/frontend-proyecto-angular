import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPeliculasComponent } from './components/lista-peliculas/lista-peliculas.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ActualizarPeliculaComponent } from './components/actualizar-pelicula/actualizar-pelicula.component';
import { PeliculaDetallesComponent } from './components/pelicula-detalles/pelicula-detalles.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { HomeComponent } from './components/home/home.component';
import { NgChartsModule } from 'ng2-charts';
import {MatPaginatorModule} from '@angular/material/paginator';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import {interceptorProvider} from "./interceptors/peli-interceptor.service";
import { PerfilComponent } from './components/perfil/perfil.component';
import { AdministrarContrasenaComponent } from './components/administrar-contrasena/administrar-contrasena.component';
import { SendEmailComponent } from './components/changePassword/send-email/send-email.component';
import { ChangePasswordComponent } from './components/changePassword/change-password/change-password.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { RegistrarGeneroComponent } from './components/registrar-genero/registrar-genero.component';
import { ListGendersComponent } from './components/list-genders/list-genders.component';
import { ActualizarGeneroComponent } from './components/actualizar-genero/actualizar-genero.component';



@NgModule({
  declarations: [
    AppComponent,
    ListaPeliculasComponent,
    NavbarComponent,
    FormRegistroComponent,
    ActualizarPeliculaComponent,
    PeliculaDetallesComponent,
    BuscadorComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    PaginaPrincipalComponent,
    PerfilComponent,
    AdministrarContrasenaComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    EstadisticasComponent,
    RegistrarGeneroComponent,
    ListGendersComponent,
    ActualizarGeneroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    YouTubePlayerModule,
    NgChartsModule


  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
