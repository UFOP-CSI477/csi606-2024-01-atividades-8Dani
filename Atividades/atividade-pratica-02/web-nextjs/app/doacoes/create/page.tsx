"use client";

import Input from "@/app/components/forms/input";
import { getAllPessoas } from "@/app/repository/pessoas/PessoaRepository";
import { getAllLocaisColeta } from "@/app/repository/locais-coleta/LocalColetaRepository";
import IPessoa from "@/app/types/IPessoa";
import ILocalColeta from "@/app/types/ILocalColeta";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function CreateDoacao() {
    const [data, setData] = useState('');
    const [pessoaId, setPessoaId] = useState('');
    const [localColetaId, setLocalColetaId] = useState('');

    const [pessoas, setPessoas] = useState<IPessoa[]>([]);
    const [locaisColeta, setLocaisColeta] = useState<ILocalColeta[]>([]);
    
    const { push } = useRouter();

    useEffect(() => {
        getAllPessoas().then(setPessoas).catch(console.error);
        getAllLocaisColeta().then(setLocaisColeta).catch(console.error);
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const dataToSubmit = {
            data,
            pessoa_id: pessoaId,
            local_coleta_id: localColetaId
        };

        const requisicao: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSubmit)
        };

        try {
            const response = await fetch('http://localhost:5000/doacoes', requisicao);
            if (response.ok) {
                const doacao = await response.json();
                window.alert(`Doação registrada com sucesso! Id: ${doacao.id}`);
                push('/doacoes');
            }
        } catch (error) {
            window.alert("Erro ao registrar a Doação!");
            console.error(error);
        }
    };

    return (
        <main>
            <h1>Cadastro de Doação</h1>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Data da Doação"
                    type="date"
                    name="data"
                    value={data}
                    setValue={(e) => setData(e.target.value)}
                />

                <div>
                    <label htmlFor="pessoaId">Pessoa</label>
                    <select name="pessoaId" id="pessoaId" value={pessoaId} onChange={(e) => setPessoaId(e.target.value)}>
                        <option value="" disabled>Selecione:</option>
                        {pessoas.map((pessoa) => (
                            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="localColetaId">Local de Coleta</label>
                    <select name="localColetaId" id="localColetaId" value={localColetaId} onChange={(e) => setLocalColetaId(e.target.value)}>
                        <option value="" disabled>Selecione:</option>
                        {locaisColeta.map((local) => (
                            <option key={local.id} value={local.id}>{local.nome}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <button type="submit">Registrar</button>
                    <button type="reset">Limpar</button>
                </div>
            </form>
        </main>
    );
}
