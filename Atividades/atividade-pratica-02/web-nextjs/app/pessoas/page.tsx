import Link from "next/link";
import PessoaTable from "../components/PessoaTable";

export default function Pessoa() {
    return (
        <main>
            <h1>Lista de Pessoas</h1>

            <Link href="/">Home</Link>
            <Link href="/pessoas/create">Adicionar</Link>

            <PessoaTable />
        </main>
    );
}
