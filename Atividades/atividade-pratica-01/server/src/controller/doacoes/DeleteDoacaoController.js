import { prisma } from '../../database/client.js';

export class DeleteDoacaoController {

    async handle(request, response) {
        const { id } = request.params;

        try {
            const doacao = await prisma.doacao.delete({ where: { id: parseInt(id) } });
            return response.json(doacao)
        } catch (error) {
            return response.status(404).json({ message: 'Doação não encontrada.' });
        }
    }
}
