import { Component, OnInit } from '@angular/core';

interface Gerente {
  nome: string,
  idade: number
}

@Component({
  selector: 'app-cadastro-gerentes',
  templateUrl: './cadastro-gerentes.component.html',
  styleUrls: ['./cadastro-gerentes.component.css']
})
export class CadastroGerentesComponent implements OnInit {

  gerentes: Gerente[] = [
    {nome: "Arnaldo de Souza", idade: 42},
    {nome: "Jorge Alcantara", idade: 50}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  cadastraGerente() {
    //SQL
    console.log('cadastra gerente no DB')
  }
}
