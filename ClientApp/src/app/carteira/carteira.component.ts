import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent implements OnInit {

  nome = "Ana Pereira";
  idade = 28;

  constructor() { }

  ngOnInit(): void {
  }

}
