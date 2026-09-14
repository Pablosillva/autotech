"use client";

import { useState } from "react";
import Link from "next/link";

export default function FinanciamentoPage() {
  const [valorCarro, setValorCarro] = useState("");
  const [entrada, setEntrada] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("1.5");
  const [prazo, setPrazo] = useState("48");
  const [resultado, setResultado] = useState<{
    valorFinanciado: number;
    parcela: number;
    totalPago: number;
    totalJuros: number;
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();

    const carro = parseFloat(valorCarro.replace(/\./g, "").replace(",", "."));
    const entradaNum = parseFloat(
      (entrada || "0").replace(/\./g, "").replace(",", ".")
    );
    const taxa = parseFloat(taxaJuros.replace(",", ".")) / 100;
    const meses = parseInt(prazo);

    if (!carro || carro <= 0) {
      alert("Digite um valor válido para o carro.");
      return;
    }

    if (taxa <= 0) {
      alert("Digite uma taxa de juros válida (maior que 0).");
      return;
    }

    if (!meses || meses <= 0) {
      alert("Digite um prazo válido.");
      return;
    }

    const valorFinanciado = carro - entradaNum;

    if (valorFinanciado <= 0) {
      alert("A entrada não pode ser maior ou igual ao valor do carro.");
      return;
    }

    // Fórmula da Tabela Price
    const parcela =
      (valorFinanciado * taxa * Math.pow(1 + taxa, meses)) /
      (Math.pow(1 + taxa, meses) - 1);

    const totalPago = parcela * meses;
    const totalJuros = totalPago - valorFinanciado;

    setResultado({
      valorFinanciado,
      parcela,
      totalPago,
      totalJuros,
    });
  };

  const limpar = () => {
    setValorCarro("");
    setEntrada("");
    setTaxaJuros("1.5");
    setPrazo("48");
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
            💰 Simulador de Financiamento
          </h1>
          <p className="text-gray-400 mt-3">
            Simule as parcelas do financiamento do seu carro com a Tabela
            Price.
          </p>
        </div>

        <form
          onSubmit={calcular}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Valor do carro (R$)
            </label>
            <input
              type="text"
              value={valorCarro}
              onChange={(e) => setValorCarro(e.target.value)}
              placeholder="Ex: 60000"
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Entrada (R$) — opcional
            </label>
            <input
              type="text"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Ex: 20000 (deixe vazio se não tiver)"
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Taxa de juros mensal (%)
              </label>
              <input
                type="text"
                value={taxaJuros}
                onChange={(e) => setTaxaJuros(e.target.value)}
                placeholder="Ex: 1,5"
                className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
              />
              <p className="text-gray-600 text-xs mt-1">
                Bancos costumam cobrar entre 1,2% e 2,5% ao mês.
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Prazo (meses)
              </label>
              <select
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
              >
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
                <option value="36">36 meses</option>
                <option value="48">48 meses</option>
                <option value="60">60 meses</option>
                <option value="72">72 meses</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 rounded-lg transition"
            >
              Simular financiamento
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
                Parcela mensal
              </p>
              <p className="text-4xl font-bold mt-2">
                {formatarMoeda(resultado.parcela)}
              </p>
              <p className="text-xs mt-1 opacity-80">
                em {prazo}x de {formatarMoeda(resultado.parcela)}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                  Valor financiado
                </p>
                <p className="text-xl font-bold text-white">
                  {formatarMoeda(resultado.valorFinanciado)}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                  Total pago
                </p>
                <p className="text-xl font-bold text-white">
                  {formatarMoeda(resultado.totalPago)}
                </p>
              </div>

              <div className="bg-gray-900 border border-red-500/40 rounded-xl p-5">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                  Total de juros
                </p>
                <p className="text-xl font-bold text-red-400">
                  {formatarMoeda(resultado.totalJuros)}
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-xs mt-6 text-center">
              ⚠️ Simulação aproximada pela Tabela Price. Taxas, seguros e
              tarifas podem alterar o valor final. Consulte o banco para
              valores oficiais.
            </p>
          </>
        )}
      </section>
    </main>
  );
}