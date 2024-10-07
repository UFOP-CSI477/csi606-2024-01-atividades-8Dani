"use client"

import Input from "@/app/components/forms/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

export default function CreateEstado() {
    // ordem dos elementos importa
    const [ nome, setNome ] = useState('');
    const [ sigla, setSigla ] = useState('');

    const { push } = useRouter();

    async function handleSubmit(event : FormEvent) {

        event.preventDefault();
        // Validação dos dados
        // ...

        const data = {
            nome,
            sigla   
        }
        // Invocar a API - para gravar UF
        const requisicao : RequestInit = {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data) // converte javascript para um objeto json
        }

        try {
            
            const response = await fetch('http://localhost:5000/estados', requisicao)
            // Se tudo correto, redirecionar lista de ufs
            if (response.ok) {

                const estado = await response.json() // recupera dados do estado

                const { id } = estado // recupera o id

                window.alert(`Estado inserido com sucesso! Id: ${id}`)

                // Redirecionar
                push('/estados')

            }
            
        } catch (error) {
            // Caso contrário, reportar o erro.
            window.alert('Erro na inclusão do Estado!')
            console.error(error)
        }


    }

    return(
        <main>
            <h1>Cadastro de estado: {nome}-{sigla}</h1>

            <form onSubmit={handleSubmit} action="/cadastrar">
                

                <Input
                    label="Nome"
                    name="nome"
                    value={nome}
                    setValue={(event) => {
                        setNome(event.target.value) // a partir do disparo do evento é possível recuperar o valor atualizado.
                    }} 
                />

                <Input 
                
                    label="Sigla"
                    name="sigla"
                    value={sigla}
                    placeholder="Sigla da Unidade Federativa"
                    setValue={(event) => {
                        setSigla(event.target.value)
                    }}

                />

                {/* <div>
                    <label htmlFor="nome">Nome</label>
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome"
                        value={nome} 
                        onChange={(event) =>{
                            setNome(event.target.value)
                        }}  
                    />
                </div>                
                <div>
                    <label htmlFor="sigla">Sigla</label>
                    <input 
                        type="text" 
                        name="sigla" 
                        id="sigla" 
                        value={sigla}
                        onChange={(event) => {
                            setSigla(event.target.value)
                        }}
                    />
                </div> */}

                <div>
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </div>

            </form>

        </main>
    )

}