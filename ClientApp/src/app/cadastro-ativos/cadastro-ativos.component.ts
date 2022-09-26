import { Component, OnInit, OnChanges, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Ativo {
  nome: string,
  grupo: string
}

export interface Grupo {
  value: string,
  viewValue: string
}

export class cgrupos {
  lista: Grupo[] = [
    {value: 'fixa', viewValue: 'Renda Fixa'},
    {value: 'variavel', viewValue: 'Renda Variável'},
    {value: 'fundos', viewValue: 'Fundos'},
    {value: 'acoes', viewValue: 'Ações'},
    {value: 'tesouro', viewValue: 'Tesouro Direto'},
    {value: 'poupanca', viewValue: 'Poupança'},
    {value: 'cripto', viewValue: 'Criptomoeda'},
  ]
}

@Component({
  selector: 'app-cadastro-ativos',
  templateUrl: './cadastro-ativos.component.html',
  styleUrls: ['./cadastro-ativos.component.css']
})
export class CadastroAtivosComponent implements OnInit {

  ativos: Ativo[] = [];
  grupoSelecionado: string | null = null;
  nomeAtivo: string | null = null;

  x = new cgrupos();
  grupos: Grupo[] = this.x.lista;

  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
    this.recuperaAtivos();
  }

  ngOnInit(): void { }

  recuperaAtivos() {
    this.http.get<Ativo[]>('ativos')
    .subscribe(ativos => (this.ativos = ativos));
  }

  cadastraAtivo() {
    if (this.grupoSelecionado != null && this.nomeAtivo != null)
      this.send().subscribe(() => { this.recuperaAtivos() });
    this.grupoSelecionado = null;
    this.nomeAtivo = null;
  }

  send(): Observable<Ativo> {
    let ativo: Ativo = { nome: this.nomeAtivo!, grupo: this.grupoSelecionado! };
    return this.http.post<Ativo>('ativos', ativo);
  }
}
