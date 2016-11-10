import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { DialogService }            from '../../../shared/service/dialog.service';
import { SharedModule }             from '../../../shared/module/shared.module';

import { ServicosService }          from '../../servicos/service/servicos.service';
import { SubareasService }          from '../../subareas/service/subareas.service';
import { UnidadesService }          from '../../unidades/service/unidades.service';

import { agendasRouting }           from './agendas.routing';
import { AgendasListComponent }     from '../component/agendas-list.component';
import { AgendasDetailComponent }   from '../component/agendas-detail.component';
import { AgendasService }           from '../service/agendas.service';

@NgModule({
    imports:        [ CommonModule, FormsModule, SharedModule, agendasRouting ],
    declarations:   [ AgendasListComponent, AgendasDetailComponent ],
    exports:        [ ],
    providers:      [ UnidadesService, SubareasService, ServicosService, AgendasService, DialogService ]
})
export class AgendasModule { }