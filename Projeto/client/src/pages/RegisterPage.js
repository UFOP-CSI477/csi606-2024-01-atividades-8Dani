import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    async function registro(ev) {
        ev.preventDefault();
            const response = await fetch('http://localhost:4000/registro', {
                method: 'POST',
                body: JSON.stringify({username,password}),
                headers: {'Content-Type':'application/json'},
            })
            if (response.status === 200){
                alert('Cadastro realizado com sucesso!');
            } else{
                alert('Não foi possível cadastrar.');
            }
    }

    return (
        <form className="registro" onSubmit={registro}>

            <h1>Cadastro</h1>

            <input type="text" 
                   placeholder="usuário"
                   value={username} 
                   onChange={ev => setUsername(ev.target.value)}/>
            
            <input type="password" 
                   placeholder="senha"
                   value={password} 
                   onChange={ev => setPassword(ev.target.value)}/>

            <button>Cadastrar</button>
        </form>
    )
}