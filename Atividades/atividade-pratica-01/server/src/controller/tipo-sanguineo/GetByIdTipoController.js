import { prisma } from '../../database/client.js'

export class GetByIdTipoController {

    async handle(request, response) {

        const { id } = request.params;

        try {
            const tipoSanguineo = await prisma.tipoSanguineo.findFirstOrThrow({
                where: {
                    id: parseInt(id)
                },

                include: {
                    pessoa: true
                }
            })
            
            return response.json(cidade)

        } catch (error) {
            return response.status(400)
                .json({
                    message: 'Invalid request.',
                    error
                })
        }
    }    
}