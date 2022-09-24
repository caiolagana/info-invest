import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAtivosComponent } from './cadastro-ativos.component';

describe('CadastroAtivosComponent', () => {
  let component: CadastroAtivosComponent;
  let fixture: ComponentFixture<CadastroAtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroAtivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
