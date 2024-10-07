import ICidade from "./ICidade";
import ITipoSanguineo from "./ITipoSanguineo";

interface IPessoa {
    
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento?: string;
    rg: string;
    created_at?: Date;
    updated_at?: Date;

    cidade: ICidade;
    tipo: ITipoSanguineo;
}

export default IPessoa;
