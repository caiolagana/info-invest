import { Component, OnInit } from '@angular/core';

interface Ativo {
  nome: string,
  grupo: string
}

interface Grupo {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-cadastro-ativos',
  templateUrl: './cadastro-ativos.component.html',
  styleUrls: ['./cadastro-ativos.component.css']
})
export class CadastroAtivosComponent implements OnInit {

  ativos: Ativo[] = [
    { nome: "PETR4", grupo: "Ações" },
    { nome: "PETR4", grupo: "Ações" },
    { nome: "PETR4", grupo: "Ações" },
    { nome: "PETR4", grupo: "Ações" },
  ]

  grupos: Grupo[] = [
    {value: 'renda-fixa', viewValue: 'Renda Fixa'},
    {value: 'renda-vari', viewValue: 'Renda Variável'},
    {value: 'fundos', viewValue: 'Fundos'},
    {value: 'acoes', viewValue: 'Ações'},
    {value: 'tesouro', viewValue: 'Tesouro Direto'},
    {value: 'poupanca', viewValue: 'Poupança'},
    {value: 'cripto', viewValue: 'Criptomoeda'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

  cadastraAtivo() {}
}
