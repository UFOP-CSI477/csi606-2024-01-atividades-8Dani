'use client';

import Link from "next/link";
import ILocalColeta from "../types/ILocalColeta";
import { useEffect, useState } from "react";

const getAllLocaisColeta = async () => {
    const response = await fetch('http://localhost:5000/locais-coleta', {
        cache: 'no-cache'
    });
    return response.json();
}

export default function LocalColetaTable() {
    const [locaisColeta, setLocaisColeta] = useState<ILocalColeta[]>([]);

    useEffect(() => {
        getAllLocaisColeta().then(data => setLocaisColeta(data));
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
            const response = await fetch('http://localhost:5000/locais-coleta', requisicao);
            if (response.ok) {
                const localColeta = await response.json();
                window.alert(`Local de coleta excluído com sucesso! Id: ${localColeta.id}`);
                setLocaisColeta(locaisColeta.filter(item => item.id !== localColeta.id));
            }
        } catch (error) {
            window.alert("Erro na exclusão do local de coleta!");
            console.error(error);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Rua</th>
                    <th>Numero</th>
                    <th>Complemento</th>
                    <th>Criado em</th>
                    <th>Atualizado em</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {locaisColeta.map((localColeta) => (
                    <tr key={localColeta.id}>
                        <td>{localColeta.id}</td>
                        <td>{localColeta.nome}</td>
                        <td>{localColeta.rua}</td>
                        <td>{localColeta.numero}</td>
                        <td>{localColeta.complemento}</td>
                        <td>{localColeta.created_at?.toString()}</td>
                        <td>{localColeta.updated_at?.toString()}</td>
                        <td>
                            <Link href={`/locais-coleta/update/${localColeta.id}`}>Alterar</Link>
                        </td>
                        <td>
                            <button onClick={() => {
                                if (window.confirm("Confirma exclusão?")) {
                                    handleDelete(localColeta.id);
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
