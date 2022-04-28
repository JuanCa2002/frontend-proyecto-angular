import { Component, OnInit } from '@angular/core';
import {EmailPasswordService} from "../../../services/email-password.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ChangePasswordDTO} from "../../../models/change-password-dto";
import swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password:string;
  confirmarPassword:string;
  tokenPassword:string;
  formReactive:FormGroup;
  dto:ChangePasswordDTO;

  constructor( private emailPasswordService:EmailPasswordService, private router:Router,
               private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
   this.crearFormulario();
  }

  onChangePassword():void{
    if(this.formReactive.invalid){
      swal(
        'Ha ocurrido un error',
        'Verifica que las contraseñas si posean 8 carácteres',
        'error'
      )
    }
    if(this.password!==this.confirmarPassword){
      swal(
        'Contraseñas No coinciden!',
        'Verifica las contraseñas',
        'error'
      )
      return;
    }
    this.tokenPassword=this.activatedRoute.snapshot.params['tokenPassword'];
    this.dto= new ChangePasswordDTO(this.password, this.confirmarPassword,this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe(dato=>{
      swal(
        'Contraseña Actualizada!',
        'Se ha actualizado tu contraseña con éxito',
        'success'
      )
      this.router.navigate(['/login']);
    });
  }

  crearFormulario(){
    this.formReactive= this.formBuilder.group({
      newPassword:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8)]]
    });
  }

  get newPasswordNoValida(){
    return this.formReactive.get('newPassword').invalid && this.formReactive.get('newPassword').touched;
  }

  get confirmPasswordNoValida(){
    return this.formReactive.get('confirmPassword').invalid && this.formReactive.get('confirmPassword').touched;
  }

}
