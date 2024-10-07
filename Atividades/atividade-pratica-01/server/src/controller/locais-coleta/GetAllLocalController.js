import { prisma } from '../../database/client.js';

export class GetAllLocalController {

    async handle(request, response) {
        
        const locaisColeta = await prisma.localColeta.findMany();
        return response.status(200).json(locaisColeta);
    }
}
