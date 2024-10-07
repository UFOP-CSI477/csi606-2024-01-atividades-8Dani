import { prisma } from '../../database/client.js';

export class UpdateDoacaoController{
    async handle(request, response) {
        const { id } = request.params;
        const { pessoa_id, local_id, data } = request.body;

        try {
            const doacao = await prisma.doacao.findFirstOrThrow({ where: { id: parseInt(id) } });

            const updatedDoacao = await prisma.doacao.update({
                where: { id: parseInt(id) },
                data: {
                    pessoa: pessoa_id ? { connect: { id: parseInt(pessoa_id) } } : undefined,
                    local: local_id ? { connect: { id: parseInt(local_id) } } : undefined,
                    data: data ? new Date(data) : doacao.data
                }
            });

            return response.status(200).json(updatedDoacao);
        } catch (error) {
            return response.status(404).json({ message: 'Doação não encontrada.' });
        }
    }
}
