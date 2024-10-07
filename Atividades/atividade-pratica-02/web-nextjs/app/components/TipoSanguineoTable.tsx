'use client';

import Link from "next/link";
import ITipoSanguineo from "../types/ITipoSanguineo";
import { useEffect, useState } from "react";

const getAllTiposSanguineos = async () => {
    const response = await fetch('http://localhost:5000/tipo-sanguineo', {
        cache: 'no-cache'
    });
    return response.json();
}

export default function TipoSanguineoTable() {
    const [tiposSanguineos, setTiposSanguineos] = useState<ITipoSanguineo[]>([]);

    useEffect(() => {
        getAllTiposSanguineos().then(data => setTiposSanguineos(data));
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
            const response = await fetch('http://localhost:5000/tipo-sanguineo', requisicao);
            if (response.ok) {
                const tipoSanguineo = await response.json();
                window.alert(`Tipo sanguíneo excluído com sucesso! Id: ${tipoSanguineo.id}`);
                setTiposSanguineos(tiposSanguineos.filter(item => item.id !== tipoSanguineo.id));
            }
        } catch (error) {
            window.alert("Erro na exclusão do tipo sanguíneo!");
            console.error(error);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Tipo</th>
                    <th>Fator</th>
                    <th>Criado em</th>
                    <th>Atualizado em</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {tiposSanguineos.map((tipoSanguineo) => (
                    <tr key={tipoSanguineo.id}>
                        <td>{tipoSanguineo.id}</td>
                        <td>{tipoSanguineo.tipo}</td>
                        <td>{tipoSanguineo.fator}</td>
                        <td>{tipoSanguineo.created_at?.toString()}</td>
                        <td>{tipoSanguineo.updated_at?.toString()}</td>
                        <td>
                            <Link href={`/tipo-sanguineo/update/${tipoSanguineo.id}`}>Alterar</Link>
                        </td>
                        <td>
                            <button onClick={() => {
                                if (window.confirm("Confirma exclusão?")) {
                                    handleDelete(tipoSanguineo.id);
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
