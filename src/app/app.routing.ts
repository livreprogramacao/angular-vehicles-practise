import { ModuleWithProviders }              from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { AppComponent }                     from './app.component';
import { PageNotFoundComponent }            from './../page-not-found.component';

import { ModelosInscritosListComponent }    from './../relatorios/modelos-inscritos/component/modelos-inscritos-list.component';
import { HistoricoInscricoesListComponent } from './../relatorios/historico-inscricoes/component/historico-inscricoes-list.component';
import { RegistroPresencaListComponent }    from './../registro-presenca/component/registro-presenca-list.component';

const appRoutes: Routes = [
    {
        path: '', component: AppComponent
    },
    {
        path: 'modelosinscritos', component: ModelosInscritosListComponent
    },
    {
        path: 'historicosinscricoes', component: HistoricoInscricoesListComponent
    },
    {
        path: 'registrospresenca', component: RegistroPresencaListComponent
    },
    {
        path: '**', component: PageNotFoundComponent
    }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);