import { Injectable }                                               from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import '../../../shared/common/rxjs-operators';
import { Observable }                                               from 'rxjs/Observable';

import { PaginationPage, PaginationPropertySort }                   from '../../../shared/common/pagination';
import { webServiceEndpoint }                                       from '../../../constants'

import { Subarea }                                                  from '../model/subareas.model';

@Injectable()
export class SubareasService {
    resourceUrl: string; // URL to web API
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
        this.resourceUrl = `${webServiceEndpoint}/subareas`;
    }

    get(): Observable<Subarea> {
        console.log("buscar a lista de servicos na URL: ", this.resourceUrl);
        return this.http.get(this.resourceUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getSubarea(id: number): Observable<Subarea> {
        return this.http.get(`${this.resourceUrl}/${id}`)
            .map(response => response.json())
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

    /*get Subareas() {
        return [
            new Subarea({
                "id": 1999540441,
                "descricao": "GESTÃO DE SERVIÇOS DE SAÚDE"
            }),
            new Subarea({
                "id": 1999770220,
                "descricao": "FARMÁCIA"
            }),
            new Subarea({
                "id": 1999885110,
                "descricao": "ÓPTICA"
            }),
            new Subarea({
                "id": 1999942555,
                "descricao": "PODOLOGIA"
            }),
            new Subarea({
                "id": 1999971277,
                "descricao": "ODONTOLOGIA"
            }),
            new Subarea({
                "id": 1999985638,
                "descricao": "MASSOTERAPIA"
            }),
            new Subarea({
                "id": 1999992819,
                "descricao": "ESTÉTICA"
            }),
            new Subarea({
                "id": 1999996409,
                "descricao": "PRÁTICAS INTEGRATIVAS E COMPLEMENTARES"
            }),
            new Subarea({
                "id": 1999998204,
                "descricao": "ENFERMAGEM"
            }),
            new Subarea({
                "id": 1999999102,
                "descricao": "RADIODIAGNÓSTICO"
            }),
            new Subarea({
                "id": 1999999551,
                "descricao": "HEMOTERAPIA"
            }),
            new Subarea({
                "id": 1999999775,
                "descricao": "ATIVIDADES FÍSICAS"
            })
        ]

    }*/

}