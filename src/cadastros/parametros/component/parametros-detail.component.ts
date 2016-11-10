import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { Subscription }             from 'rxjs/Subscription';

import { DialogService }            from '../../../shared/service/dialog.service';

import { Parametro }                                from '../model/parametro.model';
import { ParametrosService }                        from '../service/parametros.service';

@Component({
    templateUrl: './parametros-detail.component.html',
    providers: [ParametrosService]
})
export class ParametrosDetailComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ParametrosService,
        public dialogService: DialogService) {
        console.clear();
        console.log("Bum! ParametrosDetailComponent constructor init. done!");
    }

    selectedParametro: Parametro;
    private sub: Subscription;
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            if (id) {
                console.log("Bum! ParametrosDetailComponent ngOnInit buscar o recurso com o id = " + id);
                this.service.get(id)
                    .subscribe(parametro => {
                        this.selectedParametro = parametro;
                    });
            } else {
                console.log("Bum! ParametrosDetailComponent incluir um novo recurso.");
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
    newResource() {
        this.operacao = "Incluir";
        this.selectedParametro = new Parametro({});
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    update() {
        this.service.update(this.selectedParametro)
            .subscribe(parametro => {
                this.selectedParametro = parametro;
            });
        this.list();
    }

    create() {
        this.service.create(this.selectedParametro)
            .subscribe(parametro => {
                this.selectedParametro = parametro;
            });
        this.list();
    }

    list() {
        let servicoId = this.selectedParametro ? this.selectedParametro.id : null;
        this.router.navigate(['/parametros']);
    }

}