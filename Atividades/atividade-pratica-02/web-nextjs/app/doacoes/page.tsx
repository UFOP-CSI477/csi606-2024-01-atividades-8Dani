import Link from "next/link";
import DoacaoTable from "../components/DoacaoTable";

export default function Doacao() {
    return (
        <main>
            <h1>Lista de Doações</h1>

            <Link href="/">Home</Link>
            <Link href="/doacoes/create">Adicionar</Link>

            <DoacaoTable />
        </main>
    );
}
