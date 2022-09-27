import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
registerLocaleData(localeBr, 'br');

import { cgrupos, Grupo, Ativo } from '../cadastro-ativos/cadastro-ativos.component';
import { Cliente } from '../cadastro-clientes/cadastro-clientes.component';

export interface Investimento {
  cliente: string;
  ativo: string;
  grupo: string;
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

  clientes: Cliente[] = [];
  cliente: string | null = "Ana Pereira";
  idade = 28;
  saldo = 0;

  x = new cgrupos();
  grupos: Grupo[] = this.x.lista;
  ativos: Ativo[] = [];
  valorCompra: number | null = null;
  ativoCompra: Ativo | null = null;

  constructor(private http: HttpClient) {
    this.carregaCliente();
  }

  carregaCliente() {
    this.recuperaInvestimentos();
    this.recuperaAtivos();
    this.recuperaSaldo(this.cliente!);
    this.recuperaClientes();
  }

  ngOnInit(): void { }

  recuperaClientes() {
    this.http.get<Cliente[]>('clientes')
    .subscribe(clientes => (this.clientes = clientes));
  }

  atualizaSaldo(saldo: string, cliente: string) {
    let cmd: string =  "UPDATE clientes SET saldo = " + saldo.toString() + " WHERE CONVERT(VARCHAR, nome) = '" + cliente + "';";
    this.postDB([cmd, 'w']).subscribe(() => {});
  }

  recuperaSaldo(cliente: string) {
    let cmd: string =  "SELECT saldo FROM clientes WHERE CONVERT(VARCHAR, nome) = '" + cliente + "';";
    this.postDB([cmd, 'r']).subscribe((r) => {this.saldo = parseFloat(r[0]);});
  }

  async recuperaInvestimentos() {
    this.recuperaInvestimento('fixa', this.cliente!);
    this.recuperaInvestimento('variavel', this.cliente!);
    this.recuperaInvestimento('fundos', this.cliente!);
    this.recuperaInvestimento('acoes', this.cliente!);
    this.recuperaInvestimento('tesouro', this.cliente!);
    this.recuperaInvestimento('poupanca', this.cliente!);
    this.recuperaInvestimento('cripto', this.cliente!);
    //await new Promise(f => setTimeout(f, 500));
    //this.atualizaSaldo(this.saldo.toString(), this.cliente!);
    //console.log('saldo: ' + this.saldo);
  }

  Vender() {
    if (this.ativoCompra != null && this.valorCompra != null) {
      let venda: Investimento = {
        cliente: this.cliente!,
        ativo: this.ativoCompra.nome,
        grupo: this.ativoCompra.grupo,
        quantidade: 1,
        valor: this.valorCompra!
      }
      this.saldo -= venda.quantidade * venda.valor;
      let cmdSaldo: string =  "UPDATE clientes SET saldo = " + this.saldo.toString() + " WHERE CONVERT(VARCHAR, nome) = '" + this.cliente + "';";
      this.postDB([cmdSaldo, 'w']).subscribe(() => {});
      //let cmdAtivo: string =  "UPDATE " + venda.grupo + " SET valor = " + this.saldo + " WHERE cliente = '" + this.cliente + "';";
    }
  }

  Comprar() {
    if (this.ativoCompra != null && this.valorCompra != null) {
      let compra: Investimento = {
        cliente: this.cliente!,
        ativo: this.ativoCompra.nome,
        grupo: this.ativoCompra.grupo,
        quantidade: 1,
        valor: this.valorCompra!
      }
      this.enviaCompra(compra).subscribe(() => {
        this.recuperaInvestimento(this.ativoCompra!.grupo, this.cliente!);
        this.saldo += compra.quantidade * compra.valor;
        this.atualizaSaldo(this.saldo.toString(), this.cliente!);
        this.valorCompra = null;
        this.ativoCompra = null;
      });
    }
  }

  codigoGrupo(gr: string): string {
    let cod: string = '';
    switch (gr) {
      case 'Renda Fixa': cod = 'fixa'; break;
      case 'Renda Variável': cod = 'variavel'; break;
      case 'Fundos': cod = 'fundos'; break;
      case 'Ações': cod = 'acoes'; break;
      case 'Tesouro Direto': cod = 'tesouro'; break;
      case 'Poupança': cod = 'poupanca'; break;
      case 'Criptomoedas': cod = 'cripto'; break;
    }
    return cod;
  }

  enviaCompra(compra: Investimento): Observable<Investimento> {
    return this.http.post<Investimento>('comprar', compra);
  }

  postDB(cmd: string[]): Observable<string[]> {
    return this.http.post<string[]>('db', cmd);
  }

  recuperaInvestimento(grupo: string, cliente: string) {
    let res: Investimento[] | null = null;
      this.send(grupo, cliente).subscribe(inv => {
        switch (grupo) {
          case 'fixa': this.fixa = inv; break;
          case 'variavel': this.variavel = inv; break;
          case 'fundos': this.fundos = inv; break;
          case 'acoes': this.acoes = inv; break;
          case 'tesouro': this.tesouro = inv; break;
          case 'poupanca': this.poupanca = inv; break;
          case 'cripto': this.cripto = inv; break;
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
