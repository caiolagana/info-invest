import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

interface Cliente {
  nome: string;
  idade: number;
  saldo: number;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  nomeCliente: string | null = null;
  idadeCliente: number | null = null;

  constructor(private http: HttpClient) {
    this.recuperaClientes();
  }

  ngOnInit(): void {}

  recuperaClientes() {
    this.http.get<Cliente[]>('clientes')
    .subscribe(clientes => (this.clientes = clientes));
  }

  cadastraCliente() {
    if (this.nomeCliente != null && this.idadeCliente != null)
      this.send().subscribe(() => {this.recuperaClientes()});
    this.nomeCliente = null;
    this.idadeCliente = null;
  }

  send(): Observable<Cliente> {
    let cliente: Cliente = { nome: this.nomeCliente!, idade: this.idadeCliente!, saldo: 0 };
    return this.http.post<Cliente>('clientes', cliente);
  }
}
