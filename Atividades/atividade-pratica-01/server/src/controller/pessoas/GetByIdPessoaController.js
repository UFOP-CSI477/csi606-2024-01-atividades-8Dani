import { prisma } from '../../database/client.js';

export class GetByIdPessoaController {
    
    async handle (request, response) {

        const { id } = request.params;

        try {
            const pessoa = await prisma.pessoa.findFirstOrThrow({
                where: {
                    id: parseInt(id)
                },
            })
            
            return response.json(pessoa)

        } catch (error) {
            return response.status(400)
                .json({
                    message: 'Invalid request.',
                    error
                })
        }
}
}