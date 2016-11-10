export class DataHora {

    id: number;
    data: string = new Date().toISOString().slice(0, 10);
    hora: string = '08:00:00';
    dataHora: Date = new Date();
    numeroPacoteData: number = 0;
    quantidadeVaga: number = 1;
    quantidadeEspera: number = 1;
    dataCadastro: Date = new Date();

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}