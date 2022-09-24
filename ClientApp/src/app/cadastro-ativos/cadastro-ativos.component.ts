import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

  ativos: Ativo[] = [];

  grupos: Grupo[] = [
    {value: 'renda-fixa', viewValue: 'Renda Fixa'},
    {value: 'renda-vari', viewValue: 'Renda Variável'},
    {value: 'fundos', viewValue: 'Fundos'},
    {value: 'acoes', viewValue: 'Ações'},
    {value: 'tesouro', viewValue: 'Tesouro Direto'},
    {value: 'poupanca', viewValue: 'Poupança'},
    {value: 'cripto', viewValue: 'Criptomoeda'},
  ]

  constructor(http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
    http.get<Ativo[]>(baseUrl + 'ativos')
      .subscribe(ativos => (this.ativos = ativos));
  }

  ngOnInit(): void { }

  cadastraAtivo() {}
}
