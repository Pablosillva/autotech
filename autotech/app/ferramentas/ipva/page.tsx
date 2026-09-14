"use client";

import { useState } from "react";
import Link from "next/link";

const aliquotas: Record<string, { nome: string; taxa: number }> = {
  SP: { nome: "São Paulo", taxa: 0.04 },
  RJ: { nome: "Rio de Janeiro", taxa: 0.04 },
  MG: { nome: "Minas Gerais", taxa: 0.04 },
  PR: { nome: "Paraná", taxa: 0.035 },
  RS: { nome: "Rio Grande do Sul", taxa: 0.03 },
  SC: { nome: "Santa Catarina", taxa: 0.02 },
  BA: { nome: "Bahia", taxa: 0.025 },
  PE: { nome: "Pernambuco", taxa: 0.03 },
  CE: { nome: "Ceará", taxa: 0.03 },
  DF: { nome: "Distrito Federal", taxa: 0.035 },
  GO: { nome: "Goiás", taxa: 0.0375 },
  MT: { nome: "Mato Grosso", taxa: 0.03 },
  MS: { nome: "Mato Grosso do Sul", taxa: 0.035 },
  ES: { nome: "Espírito Santo", taxa: 0.02 },
};

export default function IpvaPage() {
  const [valorVenal, setValorVenal] = useState("");
  const [estado, setEstado] = useState("SP");
  const [resultado, setResultado] = useState<{
    valorIpva: number;
    valorComDesconto: number;
    desconto: number;
    parcela: number;
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();

    const valor = parseFloat(
      valorVenal.replace(/\./g, "").replace(",", ".")
    );

    if (!valor || valor <= 0) {
      alert("Digite um valor válido para o carro.");
      return;
    }

    const taxa = aliquotas[estado]?.taxa || 0.04;
    const valorIpva = valor * taxa;
    const desconto = valorIpva * 0.05; // 5% de desconto à vista
    const valorComDesconto = valorIpva - desconto;
    const parcela = valorIpva / 3; // geralmente 3 parcelas

    setResultado({
      valorIpva,
      valorComDesconto,
      desconto,
      parcela,
    });
  };

  const limpar = () => {
    setValorVenal("");
    setEstado("SP");
    setResultado(null);
  };

  const formatarMoeda = (valor: number) =>
    `R$ ${valor.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <Link
            href="/ferramentas"
            className="text-orange-500 text-sm font-semibold hover:text-orange-400 transition"
          >
            ← Voltar para ferramentas
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            🧾 Calculadora de IPVA
          </h1>
          <p className="text-gray-400 mt-3">
            Calcule o valor do IPVA do seu carro de acordo com o estado.
          </p>
        </div>

        <form
          onSubmit={calcular}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Valor venal do carro (R$)
            </label>
            <input
              type="text"
              value={valorVenal}
              onChange={(e) => setValorVenal(e.target.value)}
              placeholder="Ex: 50000"
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            />
            <p className="text-gray-600 text-xs mt-1">
              Valor de mercado do veículo (consulte na tabela FIPE).
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Estado
            </label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            >
              {Object.entries(aliquotas).map(([uf, dados]) => (
                <option key={uf} value={uf}>
                  {uf} — {dados.nome} ({(dados.taxa * 100).toFixed(2)}%)
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 rounded-lg transition"
            >
              Calcular IPVA
            </button>
            <button
              type="button"
              onClick={limpar}
              className="bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg transition"
            >
              Limpar
            </button>
          </div>
        </form>

        {resultado && (
          <>
            <div className="mt-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-black">
              <p className="text-xs uppercase tracking-widest font-semibold opacity-80">
                Valor do IPVA 2026
              </p>
              <p className="text-4xl font-bold mt-2">
                {formatarMoeda(resultado.valorIpva)}
              </p>
              <p className="text-xs mt-1 opacity-80">
                Alíquota: {(aliquotas[estado].taxa * 100).toFixed(2)}%
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-green-500/40 rounded-xl p-5">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                  💰 À vista (5% desconto)
                </p>
                <p className="text-2xl font-bold text-green-400">
                  {formatarMoeda(resultado.valorComDesconto)}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Economia de {formatarMoeda(resultado.desconto)}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                  📅 Em 3 parcelas
                </p>
                <p className="text-2xl font-bold text-white">
                  {formatarMoeda(resultado.parcela)}
                </p>
                <p className="text-gray-500 text-xs mt-1">por parcela</p>
              </div>
            </div>

            <p className="text-gray-600 text-xs mt-6 text-center">
              ⚠️ Cálculo aproximado. Consulte a Secretaria da Fazenda do seu
              estado para valores oficiais.
            </p>
          </>
        )}
      </section>
    </main>
  );
}