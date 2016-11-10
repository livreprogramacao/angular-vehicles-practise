import { Unidade } from '../../unidades/model/unidade.model';

export class Usuario {
    id: number;
    unidade: Unidade = new Unidade({});
    nome: string = '';
    chapa: string = '';
    status: string = 'Ativo';
    idUsuarioCadastro: number;
    dataCadastro: Date = new Date();
    idUsuarioAlteracao: number;
    dataAlteracao: Date = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}