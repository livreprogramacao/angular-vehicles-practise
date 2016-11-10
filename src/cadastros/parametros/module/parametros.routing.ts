import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametrosListComponent }  from '../component/parametros-list.component';
import { ParametrosDetailComponent }  from '../component/parametros-detail.component';

const parametrosRoutes: Routes = [
    { path: 'parametros', component: ParametrosListComponent },
    { path: 'parametros/:id', component: ParametrosDetailComponent }
];

export const parametrosRouting: ModuleWithProviders = RouterModule.forChild(parametrosRoutes);