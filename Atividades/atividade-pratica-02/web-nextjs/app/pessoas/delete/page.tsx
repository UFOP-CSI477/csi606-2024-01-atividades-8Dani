"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getByIdPessoa } from "@/app/repository/pessoas/PessoaRepository";

interface IDeletePessoaParams {
    params: {
        id: string;
    };
}

export default function PessoaDelete({ params }: IDeletePessoaParams) {
    const [pessoa, setPessoa] = useState(null);
    const { push } = useRouter();

    useEffect(() => {
        getByIdPessoa(params.id)
            .then(setPessoa)
            .catch(console.error);
    }, [params.id]);

    const handleDelete = async () => {
        const requisicao: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: params.id }),
        };

        try {
            const response = await fetch("http://localhost:5000/pessoas", requisicao);
            if (response.ok) {
                alert("Pessoa excluída com sucesso!");
                push("/pessoas");
            }
        } catch (error) {
            alert("Erro ao excluir a pessoa!");
            console.error(error);
        }
    };

    return (
        <main>
            {pessoa ? (
                <div>
                    <h1>Excluir Pessoa</h1>
                    <p>Deseja realmente excluir?</p>
                    <button onClick={handleDelete}>Confirmar Excluir</button>
                    <button onClick={() => push("/pessoas")}>Cancelar</button>
                </div>
            ) : (
                <p>Carregando pessoa...</p>
            )}
        </main>
    );
}
