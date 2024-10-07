"use client";

import Input from "@/app/components/forms/input";
import { getByIdPessoa } from "@/app/repository/pessoas/PessoaRepository";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface IUpdatePessoaParams {
    params: {
        id: string;
    };
}

export default function PessoaUpdate({ params }: IUpdatePessoaParams) {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");

    const { push } = useRouter();

    useEffect(() => {
        getByIdPessoa(params.id)
            .then((pessoa) => {
                setNome(pessoa.nome);
                setCpf(pessoa.cpf);
                setEmail(pessoa.email);
            })
            .catch(console.error);
    }, [params.id]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const data = { id: params.id, nome, cpf, email };

        const requisicao: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch("http://localhost:5000/pessoas", requisicao);

            if (response.ok) {
                const pessoa = await response.json();
                alert(`Pessoa atualizada com sucesso! Id: ${pessoa.id}`);
                push("/pessoas");
            }
        } catch (error) {
            alert("Erro ao atualizar a pessoa!");
            console.error(error);
        }
    };

    return (
        <main>
            <h1>Atualização de Pessoa</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Nome"
                    name="nome"
                    value={nome}
                    setValue={(e) => setNome(e.target.value)}
                />
                <Input
                    label="CPF"
                    name="cpf"
                    value={cpf}
                    setValue={(e) => setCpf(e.target.value)}
                />
                <Input
                    label="Email"
                    name="email"
                    value={email}
                    setValue={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </main>
    );
}
