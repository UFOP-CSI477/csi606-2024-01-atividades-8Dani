import { prisma } from '../../database/client.js';

export class UpdateTipoController{
    async function(request, response) {
        const { id } = request.params;
        const { tipo, fator } = request.body;

        try {
            await prisma.tipoSanguineo.findFirstOrThrow({ where: { id: parseInt(id) } });
        } catch (error) {
            return response.status(404).json({ message: 'Tipo sanguíneo não encontrado.' });
        }

        const tipoSanguineo = await prisma.tipoSanguineo.update({
            where: { id: parseInt(id) },
            data: { tipo, fator }
        });

        return response.status(200).json(tipoSanguineo);
    }
}