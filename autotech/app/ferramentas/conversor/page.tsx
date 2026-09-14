"use client";

import { useState } from "react";
import Link from "next/link";

type TipoConversao = "potencia" | "torque" | "velocidade" | "aro" | "volume" | "temperatura";

const conversoes: Record<
  TipoConversao,
  {
    nome: string;
    icone: string;
    unidadeA: string;
    unidadeB: string;
    converter: (valor: number, direcao: "AB" | "BA") => number;
  }
> = {
  potencia: {
    nome: "Potência",
    icone: "⚡",
    unidadeA: "CV",
    unidadeB: "kW",
    converter: (valor, direcao) =>
      direcao === "AB" ? valor * 0.7355 : valor * 1.3596,
  },
  torque: {
    nome: "Torque",
    icone: "🔧",
    unidadeA: "kgfm",
    unidadeB: "Nm",
    converter: (valor, direcao) =>
      direcao === "AB" ? valor * 9.80665 : valor * 0.10197,
  },
  velocidade: {
    nome: "Velocidade",
    icone: "🏎️",
    unidadeA: "km/h",
    unidadeB: "mph",
    converter: (valor, direcao) =>
      direcao === "AB" ? valor * 0.621371 : valor * 1.60934,
  },
  aro: {
    nome: "Aro de roda",
    icone: "⚙️",
    unidadeA: "polegadas",
    unidadeB: "cm",
    converter: (valor, direcao) =>
      direcao === "AB" ? valor * 2.54 : valor / 2.54,
  },
  volume: {
    nome: "Volume",
    icone: "⛽",
    unidadeA: "L",
    unidadeB: "gal (EUA)",
    converter: (valor, direcao) =>
      direcao === "AB" ? valor * 0.264172 : valor / 0.264172,
  },
  temperatura: {
    nome: "Temperatura",
    icone: "🌡️",
    unidadeA: "°C",
    unidadeB: "°F",
    converter: (valor, direcao) =>
      direcao === "AB" ? valor * 1.8 + 32 : (valor - 32) / 1.8,
  },
};

export default function ConversorPage() {
  const [tipo, setTipo] = useState<TipoConversao>("potencia");
  const [valor, setValor] = useState("");
  const [direcao, setDirecao] = useState<"AB" | "BA">("AB");
  const [resultado, setResultado] = useState<number | null>(null);

  const dados = conversoes[tipo];

  const converter = (e: React.FormEvent) => {
    e.preventDefault();

    const numero = parseFloat(valor.replace(",", "."));

    if (!numero && numero !== 0) {
      alert("Digite um valor válido.");
      return;
    }

    const resultado = dados.converter(numero, direcao);
    setResultado(resultado);
  };

  const limpar = () => {
    setValor("");
    setResultado(null);
    setDirecao("AB");
  };

  const unidadeOrigem = direcao === "AB" ? dados.unidadeA : dados.unidadeB;
  const unidadeDestino = direcao === "AB" ? dados.unidadeB : dados.unidadeA;

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
            🔄 Conversor de Unidades
          </h1>
          <p className="text-gray-400 mt-3">
            Converta medidas automotivas facilmente: potência, torque,
            velocidade, aro, volume e temperatura.
          </p>
        </div>

        {/* Seletor de tipo */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {(Object.keys(conversoes) as TipoConversao[]).map((key) => {
            const c = conversoes[key];
            return (
              <button
                key={key}
                onClick={() => {
                  setTipo(key);
                  setResultado(null);
                  setValor("");
                  setDirecao("AB");
                }}
                className={`p-4 rounded-xl border transition text-left ${
                  tipo === key
                    ? "bg-orange-500/10 border-orange-500 text-white"
                    : "bg-gray-900 border-gray-800 hover:border-orange-500/50 text-gray-300"
                }`}
              >
                <span className="text-2xl block mb-1">{c.icone}</span>
                <span className="text-sm font-semibold">{c.nome}</span>
              </button>
            );
          })}
        </div>

        {/* Formulário */}
        <form
          onSubmit={converter}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 space-y-5"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-orange-500 font-semibold">
              {dados.icone} {unidadeOrigem}
            </span>
            <button
              type="button"
              onClick={() => {
                setDirecao(direcao === "AB" ? "BA" : "AB");
                setResultado(null);
              }}
              className="bg-gray-950 border border-gray-800 hover:border-orange-500 px-4 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              🔄 Inverter
            </button>
            <span className="text-orange-500 font-semibold">
              {unidadeDestino}
            </span>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Valor em {unidadeOrigem}
            </label>
            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder={`Digite o valor em ${unidadeOrigem}`}
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-3 rounded-lg transition text-lg"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 rounded-lg transition"
            >
              Converter
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

        {resultado !== null && (
          <div className="mt-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-black">
            <p className="text-xs uppercase tracking-widest font-semibold opacity-80">
              Resultado
            </p>
            <p className="text-3xl font-bold mt-2">
              {resultado.toFixed(4).replace(".", ",")}{" "}
              <span className="text-lg">{unidadeDestino}</span>
            </p>
            <p className="text-xs mt-2 opacity-80">
              {valor} {unidadeOrigem} = {resultado.toFixed(4).replace(".", ",")}{" "}
              {unidadeDestino}
            </p>
          </div>
        )}

        <p className="text-gray-600 text-xs mt-6 text-center">
          Valores aproximados para uso comum. Para cálculos de precisão
          técnica, consulte tabelas oficiais.
        </p>
      </section>
    </main>
  );
}