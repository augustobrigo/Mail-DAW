import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Correo } from '../correo';
import { ServicioClienteService } from '../servicio-cliente.service';

@Component({
  selector: 'app-no-leidos',
  templateUrl: './no-leidos.component.html',
  styleUrls: ['./no-leidos.component.css']
})
export class NoLeidosComponent implements OnInit{

  constructor(private httpCliente:ServicioClienteService){}
  ngOnInit(): void {
    this.mostrarNoLeidos();
  }
  dataSource=new MatTableDataSource<Correo>();
  columnas:string[]=['id', 'origen', 'destinatario','mensaje','asunto','fecha','leido'];
  nombreUs:string='Mauro';

  mostrarNoLeidos(){
    this.httpCliente.mostrarMensajesNoLeidos(this.nombreUs).subscribe((x)=>{
      console.log("No leidos mostrándose!!!");
      this.dataSource.data=x;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }
  leerMensaje(mail:Correo) {
      this.httpCliente.leerMensajes(mail).subscribe((x)=>{
        console.log(mail);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
        this.mostrarNoLeidos();
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
