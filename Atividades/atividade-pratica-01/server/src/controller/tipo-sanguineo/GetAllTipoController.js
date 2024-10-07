import { prisma } from '../../database/client.js';

export class GetAllTipoController{
    
    async handle(request, response) {

    const tiposSanguineos = await prisma.tipoSanguineo.findMany({
        include: {
            pessoa: true
        }
    });

    return response.status(200).json(tiposSanguineos);
    }
}
