"use client";

import { useState } from "react";
import Link from "next/link";

type ItemTorque = {
  peca: string;
  torque: string;
  obs?: string;
  categoria: "motor" | "rodas" | "suspensao" | "freios" | "transmissao";
};

const torques: ItemTorque[] = [
  // Motor
  { peca: "Parafuso do cárter", torque: "25 Nm", categoria: "motor" },
  { peca: "Parafuso da tampa de válvulas", torque: "10 Nm", categoria: "motor" },
  { peca: "Vela de ignição", torque: "25 Nm", obs: "Verifique o manual", categoria: "motor" },
  { peca: "Parafuso do cabeçote", torque: "70-90 Nm", obs: "Sequência em cruz", categoria: "motor" },
  { peca: "Parafuso do coletor de escape", torque: "35 Nm", categoria: "motor" },
  { peca: "Parafuso do suporte do motor", torque: "60 Nm", categoria: "motor" },
  { peca: "Parafuso do filtro de óleo", torque: "20 Nm", obs: "Ou aperto manual", categoria: "motor" },
  { peca: "Parafuso da bomba de água", torque: "22 Nm", categoria: "motor" },
  { peca: "Parafuso do alternador", torque: "45 Nm", categoria: "motor" },

  // Rodas
  { peca: "Parafuso da roda (carro de passeio)", torque: "110 Nm", obs: "Em cruz", categoria: "rodas" },
  { peca: "Parafuso da roda (SUV/caminhonete)", torque: "140 Nm", obs: "Em cruz", categoria: "rodas" },
  { peca: "Porca do cubo de roda", torque: "200 Nm", obs: "Verifique o modelo", categoria: "rodas" },

  // Suspensão
  { peca: "Parafuso do amortecedor (superior)", torque: "50 Nm", categoria: "suspensao" },
  { peca: "Parafuso do amortecedor (inferior)", torque: "80 Nm", categoria: "suspensao" },
  { peca: "Parafuso da bandeja", torque: "90 Nm", categoria: "suspensao" },
  { peca: "Parafuso do pivô", torque: "60 Nm", categoria: "suspensao" },
  { peca: "Parafuso da bieleta", torque: "45 Nm", categoria: "suspensao" },

  // Freios
  { peca: "Parafuso da pinça de freio", torque: "35 Nm", categoria: "freios" },
  { peca: "Parafuso do disco de freio", torque: "15 Nm", categoria: "freios" },
  { peca: "Parafuso do cilindro de roda", torque: "10 Nm", categoria: "freios" },
  { peca: "Parafuso do servo-freio", torque: "25 Nm", categoria: "freios" },

  // Transmissão
  { peca: "Parafuso do câmbio (tampa)", torque: "25 Nm", categoria: "transmissao" },
  { peca: "Parafuso da embreagem", torque: "25 Nm", obs: "Sequência circular", categoria: "transmissao" },
  { peca: "Parafuso do volante do motor", torque: "80 Nm", categoria: "transmissao" },
];

const categorias = {
  todas: { nome: "Todas", icone: "📋" },
  motor: { nome: "Motor", icone: "🔧" },
  rodas: { nome: "Rodas", icone: "🛞" },
  suspensao: { nome: "Suspensão", icone: "⚙️" },
  freios: { nome: "Freios", icone: "🛑" },
  transmissao: { nome: "Transmissão", icone: "🔩" },
};

export default function TorquePage() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<keyof typeof categorias>("todas");

  const filtrados = torques.filter((item) => {
    const matchCategoria =
      categoriaAtiva === "todas" || item.categoria === categoriaAtiva;
    const matchBusca =
      busca.trim() === "" ||
      item.peca.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <Link
            href="/ferramentas"
            className="text-orange-500 text-sm font-semibold hover:text-orange-400 transition"
          >
            ← Voltar para ferramentas
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            🔧 Tabela de Torque
          </h1>
          <p className="text-gray-400 mt-3">
            Valores de aperto recomendados para os principais parafusos do
            carro. Sempre consulte o manual do fabricante.
          </p>
        </div>

        {/* Busca */}
        <div className="flex items-center bg-gray-900 border border-gray-800 focus-within:border-orange-500 rounded-lg px-4 py-3 mb-6 transition">
          <span className="text-gray-500">🔍</span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar peça... (ex: roda, cárter, vela)"
            className="bg-transparent outline-none text-white placeholder-gray-500 ml-3 w-full"
          />
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(categorias) as (keyof typeof categorias)[]).map((key) => (
            <button
              key={key}
              onClick={() => setCategoriaAtiva(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                categoriaAtiva === key
                  ? "bg-orange-500 text-black"
                  : "bg-gray-900 border border-gray-800 text-gray-300 hover:border-orange-500/50"
              }`}
            >
              {categorias[key].icone} {categorias[key].nome}
            </button>
          ))}
        </div>

        {/* Tabela */}
        {filtrados.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
            <p className="text-4xl mb-4">😕</p>
            <p className="text-gray-400">
              Nenhum item encontrado para <strong>{busca}</strong>.
            </p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-950 border-b border-gray-800">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">
                    Peça
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">
                    Torque
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 hidden md:table-cell">
                    Observação
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-800 last:border-b-0 hover:bg-gray-950/50 transition"
                  >
                    <td className="px-5 py-4 text-white text-sm">
                      {item.peca}
                    </td>
                    <td className="px-5 py-4 text-orange-500 font-semibold text-sm whitespace-nowrap">
                      {item.torque}
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-sm hidden md:table-cell">
                      {item.obs || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-gray-600 text-xs mt-6 text-center">
          ⚠️ Valores aproximados e genéricos. Cada fabricante tem
          especificações próprias. Sempre consulte o manual do seu veículo.
        </p>
      </section>
    </main>
  );
}