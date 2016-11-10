import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { usuariosRouting }          from './usuarios.routing';
import { UsuariosService }          from '../service/usuarios.service';
import { UsuariosListComponent }    from '../component/usuarios-list.component';
import { UsuariosDetailComponent }  from '../component/usuarios-detail.component';

@NgModule({
    imports:        [ CommonModule, FormsModule, usuariosRouting ],
    declarations:   [ UsuariosListComponent, UsuariosDetailComponent ],
    exports:        [ ],
    providers:      [ UsuariosService ]
})
export class UsuariosModule { }