import { Subarea } from '../../subareas/model/subareas.model';

export class Servico {
    id: number;
    subarea: Subarea = new Subarea({
        id: 0,
        'descricao': ''
    });
    titulo: string = '';
    descricao: string = '';
    prerequisito: string = '';
    carencia: number;
    cancelamento: number;
    penalidade: number;
    instrucao: string = '';
    status: string = 'Ativo';
    idUsuarioCadastro: number;
    dataCadastro: Date = new Date();
    idUsuarioAlteracao: number;
    dataAlteracao: Date = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}