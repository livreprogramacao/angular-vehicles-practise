import { Injectable }                               from '@angular/core';
import { Http, Response }                           from '@angular/http';

import '../../../shared/common/rxjs-operators';
import { Observable }                               from 'rxjs/Observable';

import { webServiceEndpoint }                       from '../../../constants'
import { Unidade }                                  from '../model/unidade.model';

@Injectable()
export class UnidadesService {
    resourceUrl: string; // URL to web API

    constructor(private http: Http) {
        this.resourceUrl = `${webServiceEndpoint}/unidades`;
    }

    get(): Observable<Unidade> {

        let unidades: Observable<Unidade> = null;

        unidades = this.http.get(this.resourceUrl)
            .map((res: Response) => res.json())
            .catch(this.handleError);

        return unidades;
    }

    getUnidade(id: number): Observable<Unidade> {
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
            error.status ? `${error.status} - ${error.statusText}` : 'Ocorreu um erro no servidor na busca de unidades!';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}