import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { UsuariosListComponent }    from '../component/usuarios-list.component';
import { UsuariosDetailComponent }  from '../component/usuarios-detail.component';

const usuariosRoutes: Routes = [
    { path: 'usuarios', component: UsuariosListComponent },
    { path: 'usuarios/:id', component: UsuariosDetailComponent }
];

export const usuariosRouting: ModuleWithProviders = RouterModule.forChild(usuariosRoutes);