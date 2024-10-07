"use client";

import Input from "@/app/components/forms/input";
import { getAllCidades } from "@/app/repository/cidades/CidadeRepository";
import { getAllTiposSanguineos } from "@/app/repository/tipo-sanguineo/TipoSanguineoRepository";
import ICidade from "@/app/types/ICidade";
import ITipoSanguineo from "@/app/types/ITipoSanguineo";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function CreatePessoa() {

    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [rg, setRg] = useState('');
    const [cidadeId, setCidadeId] = useState('');
    const [tipoId, setTipoId] = useState('');

    const [cidades, setCidades] = useState<ICidade[]>([]);
    const [tiposSanguineos, setTiposSanguineos] = useState<ITipoSanguineo[]>([]);

    const { push } = useRouter();

    useEffect(() => {
        getAllCidades().then(setCidades).catch(console.error);
        getAllTiposSanguineos().then(setTiposSanguineos).catch(console.error);
    }, []);

    
    const handleSubmit = async (event: FormEvent) => {

        event.preventDefault();

        const data = {
            nome,
            rua,
            numero,
            complemento,
            rg,
            cidade_id: cidadeId,
            tipo_id: tipoId
        };

        const requisicao: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch('http://localhost:5000/pessoas', requisicao);
            if (response.ok) {
                const pessoa = await response.json();
                window.alert(`Pessoa inserida com sucesso! Id: ${pessoa.id}`);
                push('/pessoas');
            }
        } catch (error) {
            window.alert("Erro na inclusão da Pessoa!");
            console.error(error);
        }
    };

    return (
        <main>
            <h1>Cadastro de Pessoa</h1>

            <form onSubmit={handleSubmit}>
                <Input label="Nome" name="nome" value={nome} setValue={(e) => setNome(e.target.value)} />
                <Input label="Rua" name="rua" value={rua} setValue={(e) => setRua(e.target.value)} />
                <Input label="Número" name="numero" value={numero} setValue={(e) => setNumero(e.target.value)} />
                <Input label="Complemento" name="complemento" value={complemento} setValue={(e) => setComplemento(e.target.value)} />
                <Input label="RG" name="rg" value={rg} setValue={(e) => setRg(e.target.value)} />

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
                    <label htmlFor="tipoId">Tipo Sanguíneo</label>
                    <select name="tipoId" id="tipoId" value={tipoId} onChange={(e) => setTipoId(e.target.value)}>
                        <option value="" disabled>Selecione:</option>
                        {tiposSanguineos.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
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
