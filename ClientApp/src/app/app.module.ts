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
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { CadastroAtivosComponent } from './cadastro-ativos/cadastro-ativos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CarteiraComponent } from './carteira/carteira.component';
import { CadastroGerentesComponent } from './cadastro-gerentes/cadastro-gerentes.component';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcoesComponent } from './acoes/acoes.component';
import { FundosComponent } from './fundos/fundos.component';
import { CriptosComponent } from './criptos/criptos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    CadastroAtivosComponent,
    ClientesComponent,
    CarteiraComponent,
    CadastroGerentesComponent,
    AdminLandingPageComponent,
    AcoesComponent,
    FundosComponent,
    CriptosComponent
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
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'admin-landing-page', component: AdminLandingPageComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'cadastro-gerentes', component: CadastroGerentesComponent },
      { path: 'cadastro-ativos', component: CadastroAtivosComponent },
      { path: 'carteira', component: CarteiraComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
