'use client';

import Link from "next/link";
import IDoacao from "../types/IDoacao";
import { useEffect, useState } from "react";

const getAllDoacoes = async () => {

    const response = await fetch('http://localhost:5000/doacoes', {
        cache: 'no-cache'
    });

    return response.json();
}


export default function DoacaoTable() {

    const [doacoes, setDoacoes] = useState<IDoacao[]>([]);

    useEffect(() => {
        getAllDoacoes().then(data => setDoacoes(data));
    }, []);

    const handleDelete = async (id: number) => {
        
        const data = { id };
        const requisicao: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch('http://localhost:5000/doacoes', requisicao);
            if (response.ok) {
                const doacao = await response.json();
                window.alert(`Doação excluída com sucesso! Id: ${doacao.id}`);
                setDoacoes(doacoes.filter(item => item.id !== doacao.id));
            }
        } catch (error) {
            window.alert("Erro na exclusão da doação!");
            console.error(error);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Pessoa</th>
                    <th>Local de Coleta</th>
                    <th>Criado em</th>
                    <th>Atualizado em</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {doacoes.map((doacao) => (
                    <tr key={doacao.id}>
                        <td>{doacao.id}</td>
                        <td>{doacao.pessoa.nome}</td>
                        <td>{doacao.local.nome}</td>
                        <td>{doacao.created_at?.toString()}</td>
                        <td>{doacao.updated_at?.toString()}</td>
                        <td>
                            <Link href={`/doacoes/update/${doacao.id}`}>Alterar</Link>
                        </td>
                        <td>
                            <button onClick={() => {
                                if (window.confirm("Confirma exclusão?")) {
                                    handleDelete(doacao.id);
                                }
                            }}>
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
