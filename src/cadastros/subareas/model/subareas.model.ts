export class Subarea {
    id: number;
    descricao: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
};