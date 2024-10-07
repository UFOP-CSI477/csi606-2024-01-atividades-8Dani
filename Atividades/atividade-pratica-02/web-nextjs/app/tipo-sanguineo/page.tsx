import Link from "next/link";
import TipoSanguineoTable from "../components/TipoSanguineoTable";

export default function TipoSanguineo() {
    return (
        <main>
            <h1>Lista de Tipos Sanguíneos</h1>

            <Link href="/">Home</Link>
            <Link href="/tipo-sanguineo/create">Adicionar</Link>

            <TipoSanguineoTable />
        </main>
    );
}
