import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { Subscription }             from 'rxjs/Subscription';

import { DialogService }            from '../../../shared/service/dialog.service';
import { Servico }                  from '../model/servico.model';
import { ServicosService }          from '../service/servicos.service';
import { Subarea }                  from '../../subareas/model/subareas.model';
import { SubareasService }          from '../../subareas/service/subareas.service';

@Component({
    selector: 'servicos-detail',
    templateUrl: './servicos-detail.component.html',
    providers: [SubareasService]
})
export class ServicosDetailComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ServicosService,
        private serviceSubareas: SubareasService,
        public dialogService: DialogService
    ) { }

    selectedServico: Servico;
    private sub: Subscription;
    ngOnInit() {
        this.getSubareas();
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            if (id) {
                this.service.getServico(id)
                    .subscribe(servico => {
                        this.selectedServico = servico;
                    });
            } else {
                this.newServico();
            }
        });
    }

    subareas$: Observable<Subarea>
    getSubareas() {
        this.subareas$ = this.serviceSubareas.get();
    } 

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.dialogService.confirm('Descartar mudanças?');
    }

    cancel() {
        this.gotoServicos();
    }

    active: boolean = true;
    operacao: string = "Editar";
    newServico() {
        this.operacao = "Incluir";
        this.selectedServico = new Servico({});
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    submitted = false;
    onSubmit() { this.submitted = true; }

    gotoServicos() {
        let servicoId = this.selectedServico ? this.selectedServico.id : null;
        this.router.navigate(['/servicos']);
    }

    create() {
        this.service.createServico(this.selectedServico)
            .subscribe(servico => {
                this.selectedServico = servico;
            });
        this.gotoServicos();
    }

    update() {
        this.service.updateServico(this.selectedServico)
            .subscribe(servico => {
                this.selectedServico = servico;
            });
        this.gotoServicos();
    }

}