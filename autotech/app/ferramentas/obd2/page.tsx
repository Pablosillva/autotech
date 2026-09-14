"use client";

import { useState } from "react";
import Link from "next/link";

type CodigoOBD2 = {
  codigo: string;
  descricao: string;
  causa: string;
  solucao: string;
  gravidade: "baixa" | "media" | "alta";
  sistema: "powertrain" | "body" | "chassis" | "network";
};

const codigos: CodigoOBD2[] = [
  // POWERTRAIN (P) — os mais comuns
  {
    codigo: "P0100",
    descricao: "Falha no circuito do sensor MAF (fluxo de ar)",
    causa: "Sensor MAF sujo, com defeito ou fiação danificada.",
    solucao: "Limpe ou substitua o sensor MAF. Verifique os conectores.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0101",
    descricao: "Faixa/desempenho do sensor MAF",
    causa: "Entrada de ar falsa, filtro entupido ou sensor com defeito.",
    solucao: "Verifique o filtro de ar e a vedação do sistema de admissão.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0110",
    descricao: "Falha no circuito do sensor de temperatura do ar (IAT)",
    causa: "Sensor IAT com defeito ou fiação com problema.",
    solucao: "Substitua o sensor IAT e verifique os conectores.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0115",
    descricao: "Falha no circuito do sensor de temperatura do motor",
    causa: "Sensor de temperatura com defeito, termostato ou fiação.",
    solucao: "Substitua o sensor de temperatura. Verifique o termostato.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0120",
    descricao: "Falha no circuito do sensor de posição da borboleta (TPS)",
    causa: "Sensor TPS com defeito ou corpo de borboleta sujo.",
    solucao: "Limpe o corpo de borboleta. Substitua o sensor TPS se necessário.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0130",
    descricao: "Falha no circuito do sensor de oxigênio (sonda lambda) — banco 1, sensor 1",
    causa: "Sonda lambda com defeito ou fiação danificada.",
    solucao: "Substitua a sonda lambda. Verifique a fiação.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0135",
    descricao: "Falha no circuito do aquecedor da sonda lambda",
    causa: "Aquecedor da sonda queimado.",
    solucao: "Substitua a sonda lambda.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0171",
    descricao: "Mistura pobre — banco 1",
    causa: "Entrada de ar falsa, baixa pressão de combustível, injetor sujo.",
    solucao: "Verifique entradas de ar falsas, pressão de combustível e injetores.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0172",
    descricao: "Mistura rica — banco 1",
    causa: "Injetor travado aberto, sensor MAF defeituoso ou pressão alta.",
    solucao: "Verifique injetores, sensor MAF e regulador de pressão.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0201",
    descricao: "Falha no circuito do injetor do cilindro 1",
    causa: "Injetor com defeito ou fiação danificada.",
    solucao: "Teste o injetor. Substitua se necessário.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0300",
    descricao: "Falha de ignição em vários cilindros",
    causa: "Velas, bobinas, cabos ou mistura inadequada.",
    solucao: "Verifique velas, bobinas e cabos. Teste a compressão.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0301",
    descricao: "Falha de ignição no cilindro 1",
    causa: "Vela, bobina ou injetor do cilindro 1.",
    solucao: "Substitua vela e bobina do cilindro 1. Teste o injetor.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0302",
    descricao: "Falha de ignição no cilindro 2",
    causa: "Vela, bobina ou injetor do cilindro 2.",
    solucao: "Substitua vela e bobina do cilindro 2. Teste o injetor.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0303",
    descricao: "Falha de ignição no cilindro 3",
    causa: "Vela, bobina ou injetor do cilindro 3.",
    solucao: "Substitua vela e bobina do cilindro 3. Teste o injetor.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0304",
    descricao: "Falha de ignição no cilindro 4",
    causa: "Vela, bobina ou injetor do cilindro 4.",
    solucao: "Substitua vela e bobina do cilindro 4. Teste o injetor.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0401",
    descricao: "Fluxo insuficiente no EGR",
    causa: "Válvula EGR entupida ou com defeito.",
    solucao: "Limpe ou substitua a válvula EGR.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0420",
    descricao: "Eficiência do catalisador abaixo do limite — banco 1",
    causa: "Catalisador desgastado, sonda lambda com defeito.",
    solucao: "Verifique as sondas lambda. Substitua o catalisador se necessário.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0440",
    descricao: "Falha no sistema de evaporação (EVAP)",
    causa: "Tampa do combustível solta, mangueira furada ou válvula EVAP.",
    solucao: "Verifique a tampa do combustível e o sistema EVAP.",
    gravidade: "baixa",
    sistema: "powertrain",
  },
  {
    codigo: "P0442",
    descricao: "Vazamento pequeno no sistema EVAP",
    causa: "Pequeno vazamento em mangueiras ou vedação.",
    solucao: "Verifique mangueiras, tampa e válvulas do sistema EVAP.",
    gravidade: "baixa",
    sistema: "powertrain",
  },
  {
    codigo: "P0500",
    descricao: "Falha no sensor de velocidade do veículo (VSS)",
    causa: "Sensor VSS com defeito ou fiação.",
    solucao: "Substitua o sensor VSS. Verifique a fiação.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0505",
    descricao: "Falha no sistema de controle de marcha lenta",
    causa: "Atuador de marcha lenta sujo ou com defeito.",
    solucao: "Limpe ou substitua o atuador de marcha lenta.",
    gravidade: "media",
    sistema: "powertrain",
  },
  {
    codigo: "P0562",
    descricao: "Tensão do sistema baixa",
    causa: "Bateria fraca, alternador com defeito ou fiação.",
    solucao: "Teste a bateria e o alternador. Verifique a fiação.",
    gravidade: "alta",
    sistema: "powertrain",
  },
  {
    codigo: "P0700",
    descricao: "Falha no sistema de controle da transmissão",
    causa: "Falha na transmissão automática (códigos específicos na TCM).",
    solucao: "Leia os códigos específicos da transmissão. Procure uma oficina especializada.",
    gravidade: "alta",
    sistema: "powertrain",
  },

  // BODY (B)
  {
    codigo: "B0001",
    descricao: "Falha no módulo de controle do airbag do motorista",
    causa: "Módulo com defeito ou fiação danificada.",
    solucao: "Verifique a fiação do airbag. Consulte uma oficina especializada.",
    gravidade: "alta",
    sistema: "body",
  },
  {
    codigo: "B1000",
    descricao: "Falha na configuração do módulo de carroceria",
    causa: "Módulo BCM com problema de configuração.",
    solucao: "Reprogramar o módulo BCM em uma concessionária.",
    gravidade: "media",
    sistema: "body",
  },

  // CHASSIS (C)
  {
    codigo: "C0035",
    descricao: "Falha no sensor de velocidade da roda dianteira esquerda",
    causa: "Sensor ABS com defeito ou sujo.",
    solucao: "Limpe ou substitua o sensor ABS.",
    gravidade: "alta",
    sistema: "chassis",
  },
  {
    codigo: "C0040",
    descricao: "Falha no sensor de velocidade da roda dianteira direita",
    causa: "Sensor ABS com defeito ou sujo.",
    solucao: "Limpe ou substitua o sensor ABS.",
    gravidade: "alta",
    sistema: "chassis",
  },

  // NETWORK (U)
  {
    codigo: "U0100",
    descricao: "Perda de comunicação com o módulo do motor (ECM)",
    causa: "Problema na rede CAN ou módulo ECM com defeito.",
    solucao: "Verifique a rede CAN e o módulo ECM. Procure uma oficina especializada.",
    gravidade: "alta",
    sistema: "network",
  },
  {
    codigo: "U0101",
    descricao: "Perda de comunicação com o módulo da transmissão (TCM)",
    causa: "Rede CAN ou módulo TCM com defeito.",
    solucao: "Verifique a rede CAN e o módulo TCM.",
    gravidade: "alta",
    sistema: "network",
  },
];

const gravidadeInfo = {
  baixa: { nome: "Baixa", cor: "bg-green-500", descricao: "Pode aguardar, mas monitore." },
  media: { nome: "Média", cor: "bg-yellow-500", descricao: "Procure uma oficina em breve." },
  alta: { nome: "Alta", cor: "bg-red-500", descricao: "Ação imediata recomendada." },
};

export default function OBD2Page() {
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState<CodigoOBD2 | null>(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  const consultar = (e: React.FormEvent) => {
    e.preventDefault();

    const codigo = busca.trim().toUpperCase();

    if (!codigo) {
      alert("Digite um código OBD2.");
      return;
    }

    const encontrado = codigos.find((c) => c.codigo === codigo);

    if (encontrado) {
      setResultado(encontrado);
      setNaoEncontrado(false);
    } else {
      setResultado(null);
      setNaoEncontrado(true);
    }
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
            📟 Consulta de Código OBD2
          </h1>
          <p className="text-gray-400 mt-3">
            Digite o código de erro do scanner e descubra o que ele significa,
            as causas prováveis e como resolver.
          </p>
        </div>

        <form
          onSubmit={consultar}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 mb-8"
        >
          <label className="text-sm text-gray-400 block mb-2">
            Código OBD2
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value.toUpperCase())}
              placeholder="Ex: P0300"
              maxLength={5}
              className="flex-1 bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-3 rounded-lg transition text-lg font-mono tracking-widest uppercase"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 rounded-lg transition"
            >
              Consultar
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-3">
            Exemplos: P0300, P0420, P0171, P0100
          </p>
        </form>

        {resultado && (
          <div className="space-y-4">
            <div className="bg-gray-900 border border-orange-500/40 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-orange-500 font-mono text-3xl font-bold">
                    {resultado.codigo}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    {resultado.descricao}
                  </p>
                </div>
                <span
                  className={`${gravidadeInfo[resultado.gravidade].cor} text-black text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap`}
                >
                  {gravidadeInfo[resultado.gravidade].nome}
                </span>
              </div>

              <p className="text-gray-500 text-xs">
                ⚠️ Gravidade: {gravidadeInfo[resultado.gravidade].descricao}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                🔍 Causas prováveis
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {resultado.causa}
              </p>
            </div>

            <div className="bg-gray-900 border border-green-500/40 rounded-xl p-6">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                🔧 Como resolver
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {resultado.solucao}
              </p>
            </div>
          </div>
        )}

        {naoEncontrado && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
            <p className="text-4xl mb-4">😕</p>
            <p className="text-gray-400">
              Código <strong className="text-white font-mono">{busca}</strong>{" "}
              não encontrado na nossa base.
            </p>
            <p className="text-gray-600 text-sm mt-3">
              Consulte o manual do seu veículo ou uma oficina especializada.
            </p>
          </div>
        )}

        {/* Lista de códigos comuns */}
        <div className="mt-12">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2">
            📚 Códigos mais comuns
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["P0300", "P0420", "P0171", "P0100", "P0301", "P0440"].map((cod) => (
              <button
                key={cod}
                onClick={() => {
                  setBusca(cod);
                  const item = codigos.find((c) => c.codigo === cod);
                  setResultado(item || null);
                  setNaoEncontrado(!item);
                }}
                className="bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-lg p-3 text-left transition"
              >
                <span className="font-mono text-orange-500 font-semibold">
                  {cod}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-xs mt-8 text-center">
          ⚠️ Base informativa. Cada veículo pode ter particularidades.
          Consulte sempre uma oficina de confiança para diagnóstico preciso.
        </p>
      </section>
    </main>
  );
}