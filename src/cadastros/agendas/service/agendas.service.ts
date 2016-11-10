import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../../../shared/common/rxjs-operators';

import { PaginationPage, PaginationPropertySort } from '../../../shared/common/pagination';
import { webServiceEndpoint } from '../../../constants'
import { Agenda } from '../model/agenda.model';

@Injectable()
export class AgendasService {

    resourceUrl: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
        this.resourceUrl = `${webServiceEndpoint}/agendas`;
        console.log("Bum! AgendasService constructor init. done!");
    }

    private handleError(error: any) {
        console.log("Bum! AgendasService handleError. begin...");
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Ocorreu um erro no servidor na busca de servicos!';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    fetchAll(page: number,
        pageSize: number,
        sort: PaginationPropertySort,
        filter: Object
    ): Observable<PaginationPage<Agenda>> {
        console.log("Bum! AgendasService fetchAll. " + JSON.stringify(filter) + " begin...");

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let urlSearchParams = new URLSearchParams();
        let servicos: Observable<PaginationPage<Agenda>> = null;

        urlSearchParams.set('size', pageSize.toString());
        urlSearchParams.set('page', page.toString());

        if (sort != null) {
            urlSearchParams.set('sort', `${sort.property},${sort.direction}`);
        }

        if (filter.hasOwnProperty('chave')) {
            urlSearchParams.set('chave', filter['chave']);
        }

        if (filter.hasOwnProperty('descricao')) {
            urlSearchParams.set('descricao', filter['descricao']);
        }

        let options = new RequestOptions({ headers: headers, search: urlSearchParams });

        // Fetch all existing resources
        // ...using get request
        servicos = this.http.get(this.resourceUrl, options)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch(this.handleError);

        return servicos;
    }

    get(id: number) {
        console.log("Bum! AgendasService get. begin...");
        return this.http.get(`${this.resourceUrl}/${id}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    delete(id: number): Observable<Response> {
        console.log("Bum! AgendasService delete. begin...");
        return this.http.delete(`${this.resourceUrl}/${id}`).catch(this.handleError);
    }

    create(resource: Agenda): Observable<Agenda> {
        console.log("Bum! AgendasService create. begin...");
        return this.http.post(this.resourceUrl, JSON.stringify(resource), { headers: this.headers })
            .map((res: Response) => res.json());
    }

    update(resource: Agenda) {
        console.log("Bum! AgendasService update. begin...");
        return this.http.put(`${this.resourceUrl}/${resource.id}`, JSON.stringify(resource), { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        console.log("Bum! AgendasService extractData. begin...");
        let body = res.json();
        return body.data || {};
    }

    createTeste(resource: Agenda) {
        console.log("Bum! AgendasService createTeste. begin...");
        this.http.post(this.resourceUrl, JSON.stringify(resource), { headers: this.headers })
            .map(response => response.json());
    }

}