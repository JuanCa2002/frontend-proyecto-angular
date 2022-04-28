import { Component, OnInit } from '@angular/core';
import {EmailPasswordService} from "../../../services/email-password.service";
import {EmailValuesDTO} from "../../../models/email-values-dto";
import swal from "sweetalert2";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  mailTo:string;
  dto:EmailValuesDTO;

  constructor(private emailPasswordServie:EmailPasswordService) { }

  ngOnInit(): void {
  }

  onSendEmail():void{
    this.dto= new EmailValuesDTO(this.mailTo);
    this.emailPasswordServie.sendEmail(this.dto).subscribe(dato=>{
      swal(
        'Correo Enviado!',
        'Se ta enviado un correo, por favor revisalo y sigue los pasos!',
        'success'
      )
    },error => {
      swal(
        'Ocurrio un error',
        'Ingresa un correo o usuario existente',
        'error'
      )
    });
  }

}
