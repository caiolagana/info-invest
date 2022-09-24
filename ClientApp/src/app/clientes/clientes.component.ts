import { Component, OnInit } from '@angular/core';

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

  clientes: Cliente[] = [
    {nome: "Ana Pereira", idade: 28, saldo: 94809.10},
    {nome: "Carlos Nogueira", idade: 49, saldo: 1114719.28},
    {nome: "Almir Soares", idade: 37, saldo: 6798111.42},
  ];

  constructor() { }

  ngOnInit(): void {
    console.log("hi im logging")
  }

  cadastraCliente() {}
}
