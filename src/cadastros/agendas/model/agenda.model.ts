import { Unidade }      from '../../unidades/model/unidade.model';
import { Subarea }      from '../../subareas/model/subareas.model';
import { Servico }      from '../../servicos/model/servico.model';
import { Usuario }      from '../../usuarios/model/usuario.model';
import { DataHora }     from '../model/data-hora.model';

export class Agenda {
    
    id: number;
    unidade: Unidade = new Unidade({"id": 103});
    subarea: Subarea = new Subarea({});
    servico: Servico = new Servico({});
    usuario: Usuario = new Usuario({"id": 5});
    data: string = new Date().toISOString().slice(0, 10);
    hora: string = new Date().toISOString().slice(11, 16);
    dataPublicacao: Date = new Date();
    agendaDatasHoras: Array<DataHora> = [];
    tipoAgenda: string = 'Individual';
    status: string = 'Ativo';
    idUsuarioCadastro: number = 5;
    dataCadastro: Date = new Date();
    idUsuarioAlteracao: number;
    dataAlteracao: Date = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}