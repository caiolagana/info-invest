import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { CadastroAtivosComponent } from './cadastro-ativos/cadastro-ativos.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { CarteiraComponent } from './carteira/carteira.component';
import { CadastroGerentesComponent } from './cadastro-gerentes/cadastro-gerentes.component';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcoesComponent } from './acoes/acoes.component';
import { InvestimentoComponent } from './investimento/investimento.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    CadastroAtivosComponent,
    CadastroClientesComponent,
    CarteiraComponent,
    CadastroGerentesComponent,
    AdminLandingPageComponent,
    AcoesComponent,
    InvestimentoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'admin-landing-page', component: AdminLandingPageComponent },
      { path: 'cadastro-clientes', component: CadastroClientesComponent },
      { path: 'cadastro-gerentes', component: CadastroGerentesComponent },
      { path: 'cadastro-ativos', component: CadastroAtivosComponent },
      { path: 'carteira-cliente', component: CarteiraComponent},
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
