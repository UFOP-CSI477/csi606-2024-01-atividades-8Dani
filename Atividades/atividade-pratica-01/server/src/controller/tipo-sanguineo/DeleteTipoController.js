import { response } from "express";
import { prisma } from '../../database/client.js';

export class DeleteTipoController {
    
    async handle(request, reponse) {

        const { id } = request.body

        try {

            const tipoSanguineo = await prisma.tipoSanguineo.delete({ where: { id: parseInt(id) } });
            return reponse.json(tipoSanguineo)

        } catch (error){
            return response.status(400).json(error)
        }
    }
}