import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { AgendasListComponent }     from '../component/agendas-list.component';
import { AgendasDetailComponent }   from '../component/agendas-detail.component';

const agendaRoutes: Routes = [
    { path: 'agendas', component: AgendasListComponent },
    { path: 'agendas/:id', component: AgendasDetailComponent }
];

export const agendasRouting: ModuleWithProviders = RouterModule.forChild(agendaRoutes);
