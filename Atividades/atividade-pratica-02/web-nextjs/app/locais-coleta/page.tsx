import Link from "next/link";
import LocalColetaTable from "../components/LocalColetaTable";

export default function LocalColeta() {
    return (
        <main>
            <h1>Lista de Locais de Coleta</h1>

            <Link href="/">Home</Link>
            <Link href="/locais-coleta/create">Adicionar</Link>

            <LocalColetaTable />
        </main>
    );
}
