import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Correo } from '../correo';
import { ServicioClienteService } from '../servicio-cliente.service';

@Component({
  selector: 'app-enviados',
  templateUrl: './enviados.component.html',
  styleUrls: ['./enviados.component.css']
})
export class EnviadosComponent implements OnInit {
  constructor(private httpCliente:ServicioClienteService){}

  ngOnInit(): void {
    this.listarMail();
  }
  dataSource=new MatTableDataSource<Correo>();
  columnas:string[]=['id', 'origen', 'destinatario','mensaje','asunto','fecha','leido'];
  nombreUs:string='Mauro';
  listarMail(){
    this.httpCliente.mostrarMensajesEnviados(this.nombreUs).subscribe((x)=>{
      console.log("Mensajes Enviados!!!");
      this.dataSource.data=x;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
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
