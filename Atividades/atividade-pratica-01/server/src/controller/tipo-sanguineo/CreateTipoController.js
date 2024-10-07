import { prisma } from '../../database/client.js';

export class CreateTipoController{
    
    async handle (request, response) {

        const { tipo, fator } = request.body;
        
        const tipoSanguineo = await prisma.tipoSanguineo.create({
            data: { tipo, fator }
        });
        return response.status(201).json(tipoSanguineo);
    }
}
