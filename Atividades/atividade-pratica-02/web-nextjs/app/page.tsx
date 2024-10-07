import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Sistema de Controle de Doação de Sangue</h1>
      <div>
        <Link href="/estados">Estados</Link>
        <Link href="/cidades">Cidades</Link>
        <Link href="/locais-coleta">Locais de coleta</Link>
        <Link href="/pessoas">Pessoas</Link>
        <Link href="/doacoes">Doações</Link>
      </div>
    </div>
  );
}