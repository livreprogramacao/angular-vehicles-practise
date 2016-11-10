import { Component, OnInit, OnDestroy }             from '@angular/core';
import { Observable }                               from 'rxjs/Observable';
import { ActivatedRoute, Router }                   from '@angular/router';

import { Table }                                    from '../../../shared/components/table/table';
import { PaginationPage, PaginationPropertySort }   from '../../../shared/common/pagination';
import { showLoading, hideLoading }                 from "../../../shared/common/loader";
import { defaultItemsCountPerPage }                 from '../../../constants'

import { ParametrosService }                        from '../service/parametros.service';
import { Parametro }                                from '../model/parametro.model';

@Component({
    templateUrl: './parametros-list.component.html',
    providers: [ParametrosService]
})
export class ParametrosListComponent implements OnInit, OnDestroy, Table {
    resourcesPage: PaginationPage<Parametro>;
    self: ParametrosListComponent;
    filter: Parametro = new Parametro({});
    filterApply: Object = {};
    errorMessage: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ParametrosService
    ) {
        console.log("Bum! ParametrosListComponent constructor init. done!");
     }

    ngOnInit() {
        console.log("Bum! ParametrosListComponent ngOnInit. done!");
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
        sort: PaginationPropertySort): Observable<PaginationPage<Parametro>> {

        let observable: Observable<PaginationPage<Parametro>> = this.service.fetchAll(
            pageNumber,
            pageSize,
            sort,
            this.filterApply);
        observable.subscribe(resourcesPage => this.resourcesPage = resourcesPage);
        return observable;
    }

    applyFilter(){
        this.filterApply = {'chave': this.filter.chave, 'descricao': this.filter.descricao};
        console.log("Bum! Aplicar um novo filtro nos recursos. " + JSON.stringify(this.filterApply) );
        this.ngOnInit();
    }

    new() {
        console.log("Bum! Incluir um novo recurso.");
        this.router.navigate(['/parametros', "new"]);
    }

    onSelect(resource: Parametro) {
        console.log("Bum! Selecionar o recurso com o id = " + resource.id);
        this.router.navigate(['/parametros', resource.id]);
    }

    update(resource: Parametro) {
        console.log("Bum! Atualizar um recurso.");
        this.router.navigate(['/parametros', resource.id]);
    }

}