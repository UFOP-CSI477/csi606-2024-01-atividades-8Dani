import { prisma } from '../../database/client.js';

export class DeleteLocalController {
    
    async handle (request, response) {
        const { id } = request.params;

        try {
            const localColeta = await prisma.localColeta.delete({ where: { id: parseInt(id) } });
            return response.json(localColeta)
        } catch (error) {
            return response.status(404).json({ message: 'Local de Coleta não encontrado.' });
        }

    }
}
