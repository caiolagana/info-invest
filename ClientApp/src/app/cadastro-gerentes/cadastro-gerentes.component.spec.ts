import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGerentesComponent } from './cadastro-gerentes.component';

describe('CadastroGerentesComponent', () => {
  let component: CadastroGerentesComponent;
  let fixture: ComponentFixture<CadastroGerentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroGerentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroGerentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
