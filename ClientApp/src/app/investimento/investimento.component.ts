import { Component, OnInit, Input } from '@angular/core';
import { Investimento } from '../carteira/carteira.component';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrls: ['./investimento.component.css']
})
export class InvestimentoComponent implements OnInit {

  @Input() investimentos: Investimento[] | null = null;
  @Input() titulo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
