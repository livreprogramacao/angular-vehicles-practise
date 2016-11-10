import { Injectable }                                               from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import '../../../shared/common/rxjs-operators';
import { Observable }                                               from 'rxjs/Observable';

import { PaginationPage, PaginationPropertySort }                   from '../../../shared/common/pagination';
import { webServiceEndpoint }                                       from '../../../constants'
import { Servico }                                                  from '../model/servico.model';

@Injectable()
export class ServicosService {
    resourceUrl: string; // URL to web API
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
        this.resourceUrl = `${webServiceEndpoint}/servicos`;
    }

    fetchAll(page: number,
        pageSize: number,
        sort: PaginationPropertySort,
        filter: Object
        ): Observable<PaginationPage<Servico>> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let urlSearchParams = new URLSearchParams();
        let servicos: Observable<PaginationPage<Servico>> = null;

        urlSearchParams.set('size', pageSize.toString());
        urlSearchParams.set('page', page.toString());

        if (sort != null) {
            urlSearchParams.set('sort', `${sort.property},${sort.direction}`);
        }

        if (filter.hasOwnProperty('subareaId')) {
            urlSearchParams.set('subareaId', filter['subareaId']);
        }

        if (filter.hasOwnProperty('titulo')) {
            urlSearchParams.set('titulo', filter['titulo']);
        }

        let options = new RequestOptions({ headers: headers, search: urlSearchParams });

        servicos = this.http.get(this.resourceUrl, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);

        return servicos;
    }

    get(): Observable<PaginationPage<Servico>> {
        console.log("buscar a lista de servicos na URL: ", this.resourceUrl);
        return this.http.get(this.resourceUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getServico(id: number): Observable<Servico> {
        return this.http.get(`${this.resourceUrl}/${id}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    deleteServico(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`).catch(this.handleError);
    }

    create(resource: Servico) {
        this.http.post(this.resourceUrl, JSON.stringify(resource), { headers: this.headers })
            .map(response => response.json());
    }

    createServico(resource: Servico): Observable<Servico> {
        return this.http.post(this.resourceUrl, JSON.stringify(resource), { headers: this.headers })
            .map((res: Response) => res.json());
    }

    updateServico(resource: Servico) {
        return this.http.put(`${this.resourceUrl}/${resource.id}`, JSON.stringify(resource), { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Ocorreu um erro no servidor na busca de servicos!';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}