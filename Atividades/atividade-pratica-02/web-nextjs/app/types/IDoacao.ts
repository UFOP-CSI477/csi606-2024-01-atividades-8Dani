import IPessoa from "./IPessoa";
import ILocalColeta from "./ILocalColeta";

interface IDoacao {

    id: number;
    data: Date;
    created_at?: Date;
    updated_at?: Date;

    pessoa: IPessoa;
    local: ILocalColeta;
    
}

export default IDoacao;
