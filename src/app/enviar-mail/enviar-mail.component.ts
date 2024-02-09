import { Component } from '@angular/core';
import { Correo } from '../correo';
import { ServicioClienteService } from '../servicio-cliente.service';

@Component({
  selector: 'app-enviar-mail',
  templateUrl: './enviar-mail.component.html',
  styleUrls: ['./enviar-mail.component.css'],
})
export class EnviarMailComponent {
  constructor(private httpCliente: ServicioClienteService) {}
  usuario: string = '';
  password!: string;
  enviar() {
    this.mail.origen=this.usuario;
    this.httpCliente.escribirMensaje(this.mail).subscribe(()=>{
      alert("Mensaje Enviado");
      this.mail=new Correo(0, this.usuario, '', '','', new Date().toString(), 0);
    });
  }

  buscarUsuario(){
this.httpCliente.logeoMail(this.password).subscribe((x)=>{
  console.log(JSON.stringify(x[0]));
this.usuario=JSON.stringify(x[0]);
})
  }
  mail: Correo = {
    id: 0,
    origen: this.usuario,
    destinatario: '',
    mensaje: '',
    asunto: '',
    fecha: new Date().toString(),
    leido: 0,
  };
}
