import { prisma } from '../../database/client.js';

export class CreatePessoaController {
    async handle (request, response) {
        const { nome, rua, numero, complemento, rg, cidade_id, tipo_id } = request.body;

        try {
            await prisma.cidade.findFirstOrThrow({ where: { id: parseInt(cidade_id) } });
            await prisma.tipoSanguineo.findFirstOrThrow({ where: { id: parseInt(tipo_id) } });
        } catch (error) {
            return response.status(400).json({ message: 'Invalid cidade_id or tipo_id.', error });
        }

        const pessoa = await prisma.pessoa.create({
            data: {
                nome,
                rua,
                numero,
                complemento,
                rg,
                cidade: { connect: { id: parseInt(cidade_id) } },
                tipo: { connect: { id: parseInt(tipo_id) } }
            }
        });

        return response.status(201).json(pessoa);
}
}
