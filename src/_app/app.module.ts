import { NgModule }                           from '@angular/core';
import { BrowserModule }                      from '@angular/platform-browser';
import { FormsModule }                        from '@angular/forms';
import { HttpModule }                         from '@angular/http';

import { AppComponent }                       from './app.component';
import { PageNotFoundComponent }              from './../page-not-found.component';
import { routing, appRoutingProviders }       from './app.routing';

import { ServicosModule }                     from './../cadastros/servicos/module/servicos.module';
import { AgendasModule }                      from './../cadastros/agendas/module/agendas.module';
import { UsuariosModule }                     from './../cadastros/usuarios/module/usuarios.module';
import { ParametrosModule }                   from './../cadastros/parametros/module/parametros.module';

import { ModelosInscritosFilterComponent }    from './../relatorios/modelos-inscritos/component/modelos-inscritos-filter.component';
import { ModelosInscritosListComponent }      from './../relatorios/modelos-inscritos/component/modelos-inscritos-list.component';

import { HistoricoInscricoesFilterComponent } from './../relatorios/historico-inscricoes/component/historico-inscricoes-filter.component';
import { HistoricoInscricoesListComponent }   from './../relatorios/historico-inscricoes/component/historico-inscricoes-list.component';

import { RegistroPresencaFilterComponent }    from './../registro-presenca/component/registro-presenca-filter.component';
import { RegistroPresencaListComponent }      from './../registro-presenca/component/registro-presenca-list.component';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule,
    routing,
    ServicosModule, AgendasModule, UsuariosModule, ParametrosModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ModelosInscritosFilterComponent, ModelosInscritosListComponent,
    HistoricoInscricoesFilterComponent, HistoricoInscricoesListComponent,
    RegistroPresencaFilterComponent, RegistroPresencaListComponent
  ],
  exports:    [],
  providers:  [ appRoutingProviders ],
  bootstrap:  [ AppComponent ]
})
export class AppModule { }