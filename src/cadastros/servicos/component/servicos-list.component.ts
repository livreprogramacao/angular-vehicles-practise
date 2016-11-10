import { Component, OnInit, OnDestroy }             from '@angular/core';
import { ActivatedRoute, Router }                   from '@angular/router';
import { Subscription }                             from 'rxjs/Subscription';
import { Observable }                               from 'rxjs/Observable';

import { Table }                                    from '../../../shared/components/table/table';
import { PaginationPage, PaginationPropertySort }   from '../../../shared/common/pagination';
import { showLoading, hideLoading }                 from "../../../shared/common/loader";
import { defaultItemsCountPerPage }                 from '../../../constants'
import { Servico }                                  from '../model/servico.model';
import { ServicosService }                          from '../service/servicos.service';
import { Subarea }                                  from '../../subareas/model/subareas.model';
import { SubareasService }                          from '../../subareas/service/subareas.service';

@Component({
    templateUrl: './servicos-list.component.html',
    providers: [SubareasService]
})
export class ServicosListComponent implements OnInit, OnDestroy, Table {
    servicoPage: PaginationPage<Servico>;
    self: ServicosListComponent;
    errorMessage: string;
    filter: Servico = new Servico({});
    filterApply: Object = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ServicosService,
        private serviceSubareas: SubareasService) { }

    ngOnInit() {
        let observable: Observable<PaginationPage<any>> = this.fetchPage(0, defaultItemsCountPerPage, null);
        showLoading();
        observable.subscribe(servicoPage => { this.servicoPage = servicoPage }, hideLoading, hideLoading);
        this.self = this;
    }

    ngOnDestroy() {
        this.servicoPage = null;
    }

    fetchPage(
        pageNumber: number,
        pageSize: number,
        sort: PaginationPropertySort): Observable<PaginationPage<Servico>> {
        
        let observable: Observable<PaginationPage<Servico>> = this.service.fetchAll(
            pageNumber, 
            pageSize, 
            sort, 
            this.filterApply);
        observable.subscribe(servicoPage => this.servicoPage = servicoPage);
        return observable;
    }

    onSelect(servico: Servico) {
        this.router.navigate(['/servicos', servico.id]);
    }

    newServico() {
        this.router.navigate(['/servicos', "new"]);
    }

    applyFilter(){
        this.filterApply = {'subareaId': this.filter.subarea.id, 'titulo': this.filter.titulo};
        this.ngOnInit();
    }

    update(servico: Servico) {
        this.router.navigate(['/servicos', servico.id]);
    }

}