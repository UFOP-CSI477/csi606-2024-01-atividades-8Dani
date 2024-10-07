import { prisma } from '../../database/client.js';

export class CreateDoacaoController {
    
    async handle(request, response) {
        const { pessoa_id, local_id, data } = request.body;

        try {
            await prisma.pessoa.findFirstOrThrow({ where: { id: parseInt(pessoa_id) } });
            await prisma.localColeta.findFirstOrThrow({ where: { id: parseInt(local_id) } });
        } catch (error) {
            return response.status(400).json({ message: 'Invalid pessoa_id or local_id.', error });
        }

        const doacao = await prisma.doacao.create({
            data: {
                pessoa: { connect: { id: parseInt(pessoa_id) } },
                local: { connect: { id: parseInt(local_id) } },
                data: new Date(data)
            }
        });

        return response.status(201).json(doacao);
    }
}