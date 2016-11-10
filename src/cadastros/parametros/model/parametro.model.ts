export class Parametro {
    id:                 number;
    chave:              string = '';
    valor:              string = '';
    descricao:          string = '';
    status:             string = 'Ativo';
    idUsuarioCadastro:  number;
    dataCadastro:       Date = new Date();
    idUsuarioAlteracao: number;
    dataAlteracao:      Date = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}