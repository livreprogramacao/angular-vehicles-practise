import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PaginationPage, PaginationPropertySort } from '../../../shared/common/pagination';

import { DialogService } from '../../../shared/service/dialog.service';

import { Unidade } from '../../unidades/model/unidade.model';
import { Subarea } from '../../subareas/model/subareas.model';
import { Servico } from '../../servicos/model/servico.model';

import { ServicosService } from '../../servicos/service/servicos.service';
import { SubareasService } from '../../subareas/service/subareas.service';

import { Agenda } from '../model/agenda.model';
import { DataHora } from '../model/data-hora.model';
import { AgendasService } from '../service/agendas.service';

@Component({
    templateUrl: './agendas-detail.component.html',
    providers: [AgendasService]
})
export class AgendasDetailComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: AgendasService,
        private serviceSubareas: SubareasService,
        private serviceServicos: ServicosService,
        public dialogService: DialogService) {
        console.clear();
        console.log("Bum! AgendasDetailComponent constructor init. done!");
    }

    publicar: string = 'true'
    selectedAgenda: Agenda;
    newDataHora: DataHora = new DataHora();
    datasHoras: Array<DataHora> = new Array();
    private sub: Subscription;
    editar: DataHora
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            if (id) {
                console.log("Bum! AgendasDetailComponent ngOnInit buscar o recurso com o id = " + id);
                this.service.get(id)
                    .subscribe(resource => {
                        this.selectedAgenda = resource;
                    });
            } else {
                console.log("Bum! AgendasDetailComponent incluir um novo recurso.");
                this.newResource();
            }
        });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.dialogService.confirm('Descartar mudanças?');
    }

    cancel() {
        this.list();
    }

    submitted = false;
    onSubmit() { this.submitted = true; }

    active: boolean = true;
    operacao: string = "Editar";
    hoje: string = '2016-10-24'
    newResource() {
        this.operacao = "Incluir";
        this.selectedAgenda = new Agenda({});
        this.active = false;
        setTimeout(() => this.active = true, 0);

        this.hoje = this.selectedAgenda.data;
        this.getSubareas()
        this.getServicos();
    }

    subareas$: Observable<Subarea>
    getSubareas() {
        this.subareas$ = this.serviceSubareas.get();
    }

    servicos: Array<Servico>;
    getServicos(): Observable<PaginationPage<Servico>> {
        let observable: Observable<PaginationPage<Servico>> = this.serviceServicos.get();
        observable.subscribe(servicoPage => this.servicos = servicoPage.content);
        return observable;
    }

    update() {
        this.service.update(this.selectedAgenda)
            .subscribe(resource => {
                this.selectedAgenda = resource;
            });
        this.list();
    }

    tipoAgenda: string;
    create() {
        console.log("Bum! Esta agenda será incluida na base.", this.selectedAgenda);
        this.service.create(this.selectedAgenda)
            .subscribe(resource => {
                this.selectedAgenda = resource;
            });
        this.list();
    }

    list() {
        let servicoId = this.selectedAgenda ? this.selectedAgenda.id : null;
        this.router.navigate(['/agendas']);
    }

    incluirDataHora() {
        console.log("Bum! Incluir uma nova Data e Hora na agenda.", this.newDataHora);
        let data: Date = new Date(this.newDataHora.data + 'T12:00:01');
        let dataHora = new DataHora({
            "data": data.toISOString().slice(0, 10),
            "hora": this.newDataHora.hora,
            "numeroPacoteData": this.numeroPacoteData,
            "quantidadeVaga": this.newDataHora.quantidadeVaga,
            "quantidadeEspera": this.newDataHora.quantidadeEspera
        });
        this.updateDataHorasCollection(dataHora);
    }

    editarDataHora(dh: DataHora) {
        console.log("Bum! Edita uma Data e Hora da lista da agenda.", dh.hora);
        this.editar = dh;
        this.newDataHora = new DataHora({
            "data": dh.dataHora.toISOString().slice(0, 10),
            "hora": dh.hora,
            "numeroPacoteData": dh.numeroPacoteData,
            "quantidadeVaga": dh.quantidadeVaga,
            "quantidadeEspera": dh.quantidadeEspera
        });
    }

    excluirDataHora(dataHora: DataHora) {
        let index = this.datasHoras.indexOf(dataHora);
        if (index > -1) {
            console.log("Bum! Exclui uma Data e Hora da lista da agenda.", index, dataHora);
            this.datasHoras.splice(index, 1);
        } else {
            console.log("Kabum! DataHora anterior não encontrado!");
        }
        this.resetDataHora();
    }

    updateDataHorasCollection(dataHora: DataHora) {
        if (this.editar === undefined) {
            console.log("Bum! Incluir na lista da agenda, a nova data e hora.", dataHora);
            this.datasHoras.push(dataHora);
        } else {
            let index = this.datasHoras.indexOf(this.editar);
            if (index > -1) {
                console.log("Bum! Atualizar a lista da agenda.", dataHora);
                console.log(this.datasHoras[index] + ' anterior.');
                console.log(dataHora + ' atualizado.');
                this.datasHoras[index] = dataHora;
            } else {
                console.log("Kabum! DataHora anterior não encontrado!");
            }
        }
        this.resetDataHora();
    }

    clearDatasHoras() {
        this.datasHoras = new Array();
    }

    resetDataHora() {
        this.editar = undefined;
        this.newDataHora = new DataHora();
        this.selectedAgenda.agendaDatasHoras = this.datasHoras;
    }

    getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    numeroPacoteData: number = 1;
    definirPacote() {
        console.log("Bum! Definir um novo pacote de Data e Hora na lista da agenda.", this.numeroPacoteData);
        if (this.datasHoras.length > 1) {
            this.numeroPacoteData += 1;
        }
    }

}