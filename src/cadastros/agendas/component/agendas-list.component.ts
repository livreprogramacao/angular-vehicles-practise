import { Component, OnInit, OnDestroy }             from '@angular/core';
import { Observable }                               from 'rxjs/Observable';
import { ActivatedRoute, Router }                   from '@angular/router';

import { Table }                                    from '../../../shared/components/table/table';
import { PaginationPage, PaginationPropertySort }   from '../../../shared/common/pagination';
import { showLoading, hideLoading }                 from "../../../shared/common/loader";
import { defaultItemsCountPerPage }                 from '../../../constants'

import { AgendasService }                           from '../service/agendas.service';
import { Agenda }                                   from '../model/agenda.model';

@Component({
    templateUrl: './agendas-list.component.html',
    providers: [AgendasService]
})
export class AgendasListComponent implements OnInit, OnDestroy, Table {
    resourcesPage: PaginationPage<Agenda>;
    self: AgendasListComponent;
    filter: Agenda = new Agenda({});
    filterApply: Object = {};
    errorMessage: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: AgendasService
    ) {
        console.log("Bum! AgendasListComponent constructor init. done!");
     }

    ngOnInit() {
        console.log("Bum! AgendasListComponent ngOnInit. done!");
        let observable: Observable<PaginationPage<any>> = this.fetchPage(0, defaultItemsCountPerPage, null);
        showLoading();
        observable.subscribe(resourcesPage => { this.resourcesPage = resourcesPage }, hideLoading, hideLoading);
        this.self = this;
    }

    ngOnDestroy() {
        this.resourcesPage = null;
    }

    fetchPage(
        pageNumber: number,
        pageSize: number,
        sort: PaginationPropertySort): Observable<PaginationPage<Agenda>> {

        let observable: Observable<PaginationPage<Agenda>> = this.service.fetchAll(
            pageNumber,
            pageSize,
            sort,
            this.filterApply);
        observable.subscribe(resourcesPage => this.resourcesPage = resourcesPage);
        return observable;
    }

    applyFilter(){
        this.filterApply = {'subarea': this.filter.subarea, 'servico': this.filter.servico};
        console.log("Bum! Aplicar um novo filtro nos recursos. " + JSON.stringify(this.filterApply) );
        this.ngOnInit();
    }

    new() {
        console.log("Bum! Incluir um novo recurso.");
        this.router.navigate(['/agendas', "new"]);
    }

    onShow(resource: Agenda) {
        console.log("Bum! Exibir o recurso com o id = " + resource.id);
    }

    onSelect(resource: Agenda) {
        console.log("Bum! Selecionar o recurso com o id = " + resource.id);
        this.router.navigate(['/agendas', resource.id]);
    }

    update(resource: Agenda) {
        console.log("Bum! Atualizar um recurso.");
        this.router.navigate(['/agendas', resource.id]);
    }

}