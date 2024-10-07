import { prisma } from '../../database/client.js';

export class UpdateLocalController { 

        async handle(request, response) {
        const { id } = request.params;
        const { nome, rua, numero, complemento, cidade_id } = request.body;

        try {
            const localColeta = await prisma.localColeta.findFirstOrThrow({ where: { id: parseInt(id) } });

            const updatedLocalColeta = await prisma.localColeta.update({
                where: { id: parseInt(id) },
                data: {
                    nome: nome || localColeta.nome,
                    rua: rua || localColeta.rua,
                    numero: numero || localColeta.numero,
                    complemento: complemento || localColeta.complemento,
                    cidade: cidade_id ? { connect: { id: parseInt(cidade_id) } } : undefined
                }
            });

            return response.status(200).json(updatedLocalColeta);
        } catch (error) {
            return response.status(404).json({ message: 'Local de Coleta não encontrado.' });
        }
    }
}
