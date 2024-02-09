import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Correo } from './correo';

@Injectable({
  providedIn: 'root'
})
export class ServicioClienteService {

  constructor(private httpCliente:HttpClient) {
  }

  mostrarTodosMensajes(nombreUs:string):Observable<Correo[]>{
    return this.httpCliente.get<Correo[]>('http://moralo.atwebpages.com/serviciosMail/ObtenerMensajesMail_R.php?usuario='+nombreUs)
  }

  mostrarMensajesNoLeidos(nombreUs:string):Observable<Correo[]>{
    return this.httpCliente.get<Correo[]>('http://moralo.atwebpages.com/serviciosMail/ObtenerMensajesMail_RN.php?usuario='+nombreUs)
  }

  mostrarMensajesEnviados(nombreUs:string):Observable<Correo[]>{
    return this.httpCliente.get<Correo[]>('http://moralo.atwebpages.com/serviciosMail/ObtenerMensajesMail_E.php?usuario='+nombreUs)
  }

  escribirMensaje(email:Correo){
    return this.httpCliente.post('http://moralo.atwebpages.com/serviciosMail/MandarMensajeMail.php',email,{responseType: 'text'})
  }

  leerMensajes(email:Correo){
    return this.httpCliente.post('http://moralo.atwebpages.com/serviciosMail/LeerMensaje.php',email,{responseType: 'text'})
  }

  borrarMensaje(email:Correo){
  return this.httpCliente.delete('http://moralo.atwebpages.com/serviciosMail/eliminarMail.php?id='+ email.id)
  }

  logeoMail(pwd:string): Observable<string>{
    return this.httpCliente.get<string>('http://moralo.atwebpages.com/serviciosMail/logeoMail.php?pwd='+pwd)
  }
}
