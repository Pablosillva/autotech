"use client";

import { useEffect, useState } from "react";
import { buscarArtigos, Artigo } from "../services/api";

const categoriasInfo: Record<string, { nome: string; cor: string }> = {
  mecanica: { nome: "Mecânica", cor: "bg-orange-500" },
  funilaria: { nome: "Funilaria", cor: "bg-blue-500" },
  diagnostico: { nome: "Diagnóstico", cor: "bg-green-500" },
  carros: { nome: "Carros", cor: "bg-purple-500" },
  ferramentas: { nome: "Ferramentas", cor: "bg-yellow-500" },
  noticias: { nome: "Notícias", cor: "bg-red-500" },
  calculadoras: { nome: "Calculadoras", cor: "bg-cyan-500" },
};

type Ordenacao = "recentes" | "vistos" | "az";

export default function ArtigosPage() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("recentes");

  useEffect(() => {
    buscarArtigos()
      .then(setArtigos)
      .catch((erro) => console.error(erro))
      .finally(() => setCarregando(false));
  }, []);

  // Filtra por categoria
  const filtrados = artigos.filter((a) =>
    categoriaAtiva === "todas" ? true : a.categoria === categoriaAtiva
  );

  // Ordena
  const ordenados = [...filtrados].sort((a, b) => {
    if (ordenacao === "recentes") {
      return (
        new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime()
      );
    }
    if (ordenacao === "vistos") {
      return Number(b.visualizacoes) - Number(a.visualizacoes);
    }
    if (ordenacao === "az") {
      return a.titulo.localeCompare(b.titulo);
    }
    return 0;
  });

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-orange-500 text-xs font-semibold tracking-widest">
            BLOG
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            📚 Todos os artigos
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Dicas, tutoriais e guias completos para cuidar do seu carro.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            {ordenados.length} artigos encontrados
          </p>
        </div>

        {/* Filtros e ordenação */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Filtro por categoria */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoriaAtiva("todas")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                categoriaAtiva === "todas"
                  ? "bg-orange-500 text-black"
                  : "bg-gray-900 border border-gray-800 text-gray-300 hover:border-orange-500/50"
              }`}
            >
              Todas
            </button>
            {Object.entries(categoriasInfo).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setCategoriaAtiva(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  categoriaAtiva === key
                    ? "bg-orange-500 text-black"
                    : "bg-gray-900 border border-gray-800 text-gray-300 hover:border-orange-500/50"
                }`}
              >
                {cat.nome}
              </button>
            ))}
          </div>

          {/* Ordenação */}
          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value as Ordenacao)}
            className="bg-gray-900 border border-gray-800 focus:border-orange-500 outline-none text-white text-sm px-3 py-2 rounded-lg transition"
          >
            <option value="recentes">📅 Mais recentes</option>
            <option value="vistos">👁 Mais vistos</option>
            <option value="az">🔤 A-Z</option>
          </select>
        </div>

        {/* Lista de artigos */}
        {carregando && (
          <div className="text-center py-16 text-gray-500">
            Carregando artigos...
          </div>
        )}

        {!carregando && ordenados.length === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
            <p className="text-4xl mb-4">😕</p>
            <p className="text-gray-400">
              Nenhum artigo encontrado nessa categoria.
            </p>
          </div>
        )}

        {!carregando && ordenados.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordenados.map((artigo) => {
              const cat = categoriasInfo[artigo.categoria] ?? {
                nome: artigo.categoria,
                cor: "bg-gray-500",
              };

              return (
                <a
                  key={artigo.slug}
                  href={`/artigo/${artigo.slug}`}
                  className="group bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-xl overflow-hidden transition-all hover:-translate-y-1"
                >
                  <div className="relative h-40 bg-gray-800">
                    <img
                      src={artigo.imagem}
                      alt={artigo.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className={`absolute top-3 left-3 ${cat.cor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      {cat.nome}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-white font-bold text-base leading-snug group-hover:text-orange-500 transition">
                      {artigo.titulo}
                    </h3>
                    <p className="mt-2 text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {artigo.descricao}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                      <span>🕐 {artigo.tempo_leitura}</span>
                      <span>👁 {artigo.visualizacoes}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}