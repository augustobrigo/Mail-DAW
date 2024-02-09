import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Correo } from '../correo';
import { ServicioClienteService } from '../servicio-cliente.service';

@Component({
  selector: 'app-recibir-mail',
  templateUrl: './recibir-mail.component.html',
  styleUrls: ['./recibir-mail.component.css'],
})
export class RecibirMailComponent implements OnInit {

  constructor(private httpCliente:ServicioClienteService){}

  ngOnInit(): void {
    this.listarMail();
  }
  dataSource=new MatTableDataSource<Correo>();
  columnas:string[]=['id', 'origen', 'destinatario','mensaje','asunto','fecha','leido', 'borrar'];
  nombreUs:string='Mauro';
  listarMail(){
    this.httpCliente.mostrarTodosMensajes(this.nombreUs).subscribe((x)=>{
      console.log("");
      this.dataSource.data=x;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  borrarMensaje(mensaje: Correo){
this.httpCliente.borrarMensaje(mensaje).subscribe(()=>{
  this.listarMail();
})
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
