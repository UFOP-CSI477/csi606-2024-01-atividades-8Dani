"use client";

import Input from "@/app/components/forms/input";
import { getAllCidades } from "@/app/repository/cidades/CidadeRepository";
import ICidade from "@/app/types/ICidade";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function CreateLocalColeta() {
    
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidadeId, setCidadeId] = useState('');

    const [cidades, setCidades] = useState<ICidade[]>([]);
    const { push } = useRouter();

    useEffect(() => {
        getAllCidades().then(setCidades).catch(console.error);
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const data = {
            nome,
            rua,
            numero,
            complemento,
            cidade_id: cidadeId
        };

        const requisicao: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch('http://localhost:5000/locais-coleta', requisicao);
            if (response.ok) {
                const localColeta = await response.json();
                window.alert(`Local de Coleta inserido com sucesso! Id: ${localColeta.id}`);
                push('/locais-coleta');
            }
        } catch (error) {
            window.alert("Erro na inclusão do Local de Coleta!");
            console.error(error);
        }
    };

    return (
        <main>
            <h1>Cadastro de Local de Coleta</h1>

            <form onSubmit={handleSubmit}>
                <Input label="Nome" name="nome" value={nome} setValue={(e) => setNome(e.target.value)} />
                <Input label="Rua" name="rua" value={rua} setValue={(e) => setRua(e.target.value)} />
                <Input label="Número" name="numero" value={numero} setValue={(e) => setNumero(e.target.value)} />
                <Input label="Complemento" name="complemento" value={complemento} setValue={(e) => setComplemento(e.target.value)} />

                <div>
                    <label htmlFor="cidadeId">Cidade</label>
                    <select name="cidadeId" id="cidadeId" value={cidadeId} onChange={(e) => setCidadeId(e.target.value)}>
                        <option value="" disabled>Selecione:</option>
                        {cidades.map((cidade) => (
                            <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </div>
            </form>
        </main>
    );
}
