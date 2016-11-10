import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicosListComponent }  from '../component/servicos-list.component';
import { ServicosDetailComponent }  from '../component/servicos-detail.component';

const servicosRoutes: Routes = [
    { path: 'servicos', component: ServicosListComponent },
    { path: 'servicos/:id', component: ServicosDetailComponent }
];

export const servicosRouting: ModuleWithProviders = RouterModule.forChild(servicosRoutes);