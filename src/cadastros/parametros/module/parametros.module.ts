import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';

import { DialogService }                    from '../../../shared/service/dialog.service';
import { SharedModule }                     from '../../../shared/module/shared.module';

import { ParametrosService }                from '../service/parametros.service';
import { ParametrosListComponent }          from '../component/parametros-list.component';
import { ParametrosDetailComponent }        from '../component/parametros-detail.component';

import { parametrosRouting }                from './parametros.routing';

@NgModule({
    imports:        [ CommonModule, FormsModule, SharedModule, parametrosRouting ],
    declarations:   [ ParametrosListComponent, ParametrosDetailComponent ],
    exports:        [ ],
    providers:      [ ParametrosService, DialogService ]
})
export class ParametrosModule { }