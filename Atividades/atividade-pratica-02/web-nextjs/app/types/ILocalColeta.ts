import ICidade from "./ICidade";

interface ILocalColeta {
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento?: string;
    created_at?: Date;
    updated_at?: Date;

    cidade: ICidade;
}

export default ILocalColeta;
