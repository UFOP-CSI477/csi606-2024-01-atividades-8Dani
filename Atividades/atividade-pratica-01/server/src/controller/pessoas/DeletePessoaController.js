import { prisma } from '../../database/client.js';

export class DeletePessoaController {

    async handle (request, response) {
        const { id } = request.params;

        try {
            // Verifica se a pessoa existe
            const pessoa = await prisma.pessoa.delete({ where: { id: parseInt(id) } });
            return reponse.json(pessoa)
            
        } catch (error) {
            return response.status(404).json({ message: 'Pessoa não encontrada.' });
        }

    }
}
