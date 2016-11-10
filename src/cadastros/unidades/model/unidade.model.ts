export class Unidade {
    id: number;
    sigla: string = '';
    nome: string = '';
    endereco: string = '';
    bairro: string = '';
    cidade: string = '';
    email: string = '';
    telefone: string = '';
    tipoUnidade: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}