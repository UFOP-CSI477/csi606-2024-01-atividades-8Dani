'use client';

import Link from "next/link";
import IPessoa from "../types/IPessoa";
import { useEffect, useState } from "react";

const getAllPessoas = async () => {

    const response = await fetch('http://localhost:5000/pessoas', {
        cache: 'no-cache'
    });

    return response.json();
}


export default function PessoaTable() {

    const [pessoas, setPessoas] = useState<IPessoa[]>([]);

    useEffect(() => {
        getAllPessoas().then(data => setPessoas(data));
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
            const response = await fetch('http://localhost:5000/pessoas', requisicao);
            if (response.ok) {
                const pessoa = await response.json();
                window.alert(`Pessoa excluída com sucesso! Id: ${pessoa.id}`);
                setPessoas(pessoas.filter(item => item.id !== pessoa.id));
            }
        } catch (error) {
            window.alert("Erro na exclusão da pessoa!");
            console.error(error);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>RG</th>
                    <th>Criado em</th>
                    <th>Atualizado em</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {pessoas.map((pessoa) => (
                    <tr key={pessoa.id}>
                        <td>{pessoa.id}</td>
                        <td>{pessoa.nome}</td>
                        <td>{pessoa.rg}</td>
                        <td>{pessoa.created_at?.toString()}</td>
                        <td>{pessoa.updated_at?.toString()}</td>
                        <td>
                            <Link href={`/pessoas/update/${pessoa.id}`}>Alterar</Link>
                        </td>
                        <td>
                            <button onClick={() => {
                                if (window.confirm("Confirma exclusão?")) {
                                    handleDelete(pessoa.id);
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
