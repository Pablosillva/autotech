"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConsumoPage() {
  const [km, setKm] = useState("");
  const [litros, setLitros] = useState("");
  const [precoLitro, setPrecoLitro] = useState("");
  const [resultado, setResultado] = useState<{
    kmPorLitro: number;
    custoPorKm: number;
    custoMensal: number;
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();

    const kmNum = parseFloat(km.replace(",", "."));
    const litrosNum = parseFloat(litros.replace(",", "."));
    const precoNum = parseFloat(precoLitro.replace(",", "."));

    if (!kmNum || !litrosNum || !precoNum || litrosNum === 0) {
      alert("Preencha todos os campos com valores válidos.");
      return;
    }

    const kmPorLitro = kmNum / litrosNum;
    const custoPorKm = (litrosNum * precoNum) / kmNum;
    const custoMensal = custoPorKm * 1000; // supondo 1000 km/mês

    setResultado({
      kmPorLitro,
      custoPorKm,
      custoMensal,
    });
  };

  const limpar = () => {
    setKm("");
    setLitros("");
    setPrecoLitro("");
    setResultado(null);
  };

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
            ⛽ Calculadora de Consumo
          </h1>
          <p className="text-gray-400 mt-3">
            Descubra quantos km/l seu carro faz e quanto você gasta por
            quilômetro rodado.
          </p>
        </div>

        <form
          onSubmit={calcular}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Quilômetros rodados
            </label>
            <input
              type="text"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              placeholder="Ex: 350"
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Litros abastecidos
            </label>
            <input
              type="text"
              value={litros}
              onChange={(e) => setLitros(e.target.value)}
              placeholder="Ex: 30"
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Preço do litro (R$)
            </label>
            <input
              type="text"
              value={precoLitro}
              onChange={(e) => setPrecoLitro(e.target.value)}
              placeholder="Ex: 5,89"
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 rounded-lg transition"
            >
              Calcular
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-orange-500/40 rounded-xl p-6 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                Consumo
              </p>
              <p className="text-3xl font-bold text-orange-500">
                {resultado.kmPorLitro.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-gray-500 text-xs mt-1">km/l</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                Custo por km
              </p>
              <p className="text-3xl font-bold text-white">
                R$ {resultado.custoPorKm.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-gray-500 text-xs mt-1">por quilômetro</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                Custo mensal
              </p>
              <p className="text-3xl font-bold text-white">
                R$ {resultado.custoMensal.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-gray-500 text-xs mt-1">para 1.000 km/mês</p>
            </div>
          </div>
        )}

        {resultado && (
          <p className="text-gray-600 text-xs mt-4 text-center">
            Cálculo aproximado. Valores podem variar dependendo do estilo de
            condução, trânsito e manutenção.
          </p>
        )}
      </section>
    </main>
  );
}