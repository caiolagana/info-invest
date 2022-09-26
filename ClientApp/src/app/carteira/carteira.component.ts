import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
registerLocaleData(localeBr, 'br');

import { cgrupos, Grupo, Ativo } from '../cadastro-ativos/cadastro-ativos.component';

export interface Investimento {
  cliente: string;
  titulo: string;
  quantidade: number;
  valor: number;
}

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent implements OnInit {

  fixa: Investimento[] | null = null;
  variavel: Investimento[] | null = null;
  fundos: Investimento[] | null = null;
  acoes: Investimento[] | null = null;
  tesouro: Investimento[] | null = null;
  poupanca: Investimento[] | null = null;
  cripto: Investimento[] | null = null;

  cliente: string | null = "Ana Pereira";
  nome = "Ana Pereira";
  idade = 28;
  saldo = 0;

  x = new cgrupos();
  grupos: Grupo[] = this.x.lista;
  ativos: Ativo[] = [];
  valorCompra: number | null = null;
  ativoCompra: string | null = null;

  constructor(private http: HttpClient) {
    this.recuperaInvestimento('fixa', this.cliente!);
    this.recuperaInvestimento('variavel', this.cliente!);
    this.recuperaInvestimento('fundos', this.cliente!);
    this.recuperaInvestimento('acoes', this.cliente!);
    this.recuperaInvestimento('tesouro', this.cliente!);
    this.recuperaInvestimento('poupanca', this.cliente!);
    this.recuperaInvestimento('cripto', this.cliente!);
    this.recuperaAtivos();
  }

  ngOnInit(): void { }

  Comprar() {
    this.valorCompra = null;
    this.ativoCompra = null;
  }

  recuperaInvestimento(grupo: string, cliente: string) {
    let res: Investimento[] | null = null;
      this.send(grupo, cliente).subscribe(inv => {
        switch (grupo) {
          case 'fixa': this.fixa = inv; this.saldo += this.somaSaldo(inv); break;
          case 'variavel': this.variavel = inv; this.saldo += this.somaSaldo(inv); break;
          case 'fundos': this.fundos = inv; this.saldo += this.somaSaldo(inv); break;
          case 'acoes': this.acoes = inv; this.saldo += this.somaSaldo(inv); break;
          case 'tesouro': this.tesouro = inv; this.saldo += this.somaSaldo(inv); break;
          case 'poupanca': this.poupanca = inv; this.saldo += this.somaSaldo(inv); break;
          case 'cripto': this.cripto = inv; this.saldo += this.somaSaldo(inv); break;
        }
      });
  }

  send(grupo: string, cliente: string): Observable<Investimento[]> {
    return this.http.post<Investimento[]>('carteira', [grupo, cliente]);
  }

  somaSaldo(invs: Investimento[]): number {
    let soma = 0;
    invs.forEach(inv => soma += inv.quantidade * inv.valor);
    return soma;
  }

  recuperaAtivos() {
    this.http.get<Ativo[]>('ativos')
    .subscribe(ativos => (this.ativos = ativos));
  }
}
