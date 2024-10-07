import { prisma } from '../../database/client.js'

export class GetByIdLocalController {

    async handle(request, response) {

        const { id } = request.params;

        try {
            const localColeta = await prisma.localColeta.findFirstOrThrow({
                where: {
                    id: parseInt(id)
                },

                include: {
                    estado: true
                }
            })
            
            return response.json(localColeta)

        } catch (error) {
            return response.status(400)
                .json({
                    message: 'Invalid request.',
                    error
                })
        }
    }    
}