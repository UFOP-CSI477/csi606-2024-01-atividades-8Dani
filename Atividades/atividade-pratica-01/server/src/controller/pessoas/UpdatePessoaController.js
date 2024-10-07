import { prisma } from '../../database/client.js';

export class UpdatePessoaController { 

    async handle (request, response) {
        const { id } = request.params;
        const { nome, rua, numero, complemento, rg, cidade_id, tipo_id } = request.body;

        try {
            // Verifica se a pessoa existe
            const pessoa = await prisma.pessoa.findFirstOrThrow({ where: { id: parseInt(id) } });

            // Atualiza a pessoa
            const updatedPessoa = await prisma.pessoa.update({
                where: { id: parseInt(id) },
                data: {
                    nome: nome || pessoa.nome,
                    rua: rua || pessoa.rua,
                    numero: numero || pessoa.numero,
                    complemento: complemento || pessoa.complemento,
                    rg: rg || pessoa.rg,
                    cidade: cidade_id ? { connect: { id: parseInt(cidade_id) } } : undefined,
                    tipo: tipo_id ? { connect: { id: parseInt(tipo_id) } } : undefined
                }
            });

            return response.status(200).json(updatedPessoa);
        } catch (error) {
            return response.status(404).json({ message: 'Pessoa não encontrada.' });
        }
    }
}