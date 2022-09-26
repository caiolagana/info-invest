import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

interface Gerente {
  nome: string,
  idade: string
}

@Component({
  selector: 'app-cadastro-gerentes',
  templateUrl: './cadastro-gerentes.component.html',
  styleUrls: ['./cadastro-gerentes.component.css']
})
export class CadastroGerentesComponent implements OnInit {

  gerentes: Gerente[] = [];
  nomeGerente: string | null = null;
  idadeGerente: string | null = null;

  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
    this.recuperaGerentes();
  }

  ngOnInit(): void {
  }

  recuperaGerentes() {
    this.http.get<Gerente[]>('gerentes')
    .subscribe(gerentes => (this.gerentes = gerentes));
  }

  cadastraGerente() {
    if (this.nomeGerente != null && this.idadeGerente != null)
      this.send().subscribe(() => {this.recuperaGerentes()});
    this.nomeGerente = null;
    this.idadeGerente = null;
  }

  send(): Observable<Gerente> {
    let gerente: Gerente = { nome: this.nomeGerente!, idade: this.idadeGerente! };
    return this.http.post<Gerente>('gerentes', gerente);
  }
}
