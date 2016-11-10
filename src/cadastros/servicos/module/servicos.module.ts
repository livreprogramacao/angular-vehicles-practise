import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { DialogService }                from '../../../shared/service/dialog.service';
import { SharedModule }                 from '../../../shared/module/shared.module';

import { ServicosService }              from '../service/servicos.service';
import { ServicosListComponent }        from '../component/servicos-list.component';
import { ServicosDetailComponent }      from '../component/servicos-detail.component';

import { servicosRouting }              from './servicos.routing';

@NgModule({
    imports:        [ CommonModule, FormsModule, SharedModule, servicosRouting ],
    declarations:   [ ServicosListComponent, ServicosDetailComponent ],
    exports:        [ ],
    providers:      [ ServicosService, DialogService ]
})
export class ServicosModule { }