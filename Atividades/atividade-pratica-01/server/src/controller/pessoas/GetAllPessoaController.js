import { prisma } from '../../database/client.js';

export class GetAllPessoaController {
    
    async handle (request, response) {

    const pessoas = await prisma.pessoa.findMany();
    return response.status(200).json(pessoas);
}
}
