"use client";

import Input from "@/app/components/forms/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateTipoSanguineo() {
    
    const [tipo, setTipo] = useState('');
    const [fator, setFator] = useState('');

    const { push } = useRouter();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            tipo,
            fator
        };

        const requisicao: RequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch('http://localhost:5000/tipo-sanguineo', requisicao);
            if (response.ok) {
                const tipoSanguineo = await response.json();
                const { id } = tipoSanguineo;

                window.alert(`Tipo Sanguíneo inserido com sucesso! Id: ${id}`);
                push('/tipos-sanguineos');
            }
        } catch (error) {
            window.alert('Erro na inclusão do Tipo Sanguíneo!');
            console.error(error);
        }
    }

    return (
        <main>
            <h1>Cadastro de Tipo Sanguíneo</h1>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Tipo"
                    name="tipo"
                    value={tipo}
                    setValue={(event) => setTipo(event.target.value)}
                />
                <Input
                    label="Fator"
                    name="fator"
                    value={fator}
                    setValue={(event) => setFator(event.target.value)}
                />
                <div>
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </div>
            </form>
        </main>
    );
}
