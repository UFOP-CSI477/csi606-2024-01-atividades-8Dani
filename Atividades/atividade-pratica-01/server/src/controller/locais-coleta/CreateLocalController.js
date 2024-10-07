import { prisma } from '../../database/client.js';

export class CreateLocalController {
    
    async handle (request, response) {
        const { nome, rua, numero, complemento, cidade_id } = request.body;

        try {
            await prisma.cidade.findFirstOrThrow({ where: { id: parseInt(cidade_id) } });
        } catch (error) {
            return response.status(400).json({ message: 'Invalid cidade_id.', error });
        }

        const localColeta = await prisma.localColeta.create({
            data: {
                nome,
                rua,
                numero,
                complemento,
                cidade: { connect: { id: parseInt(cidade_id) } }
            }
        });

        return response.status(201).json(localColeta);
    }
}
