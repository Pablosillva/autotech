import Link from "next/link";
import { buscarArtigosPorTexto } from "../services/api";

const categoriasInfo: Record<string, { nome: string; cor: string }> = {
  mecanica: { nome: "Mecânica", cor: "bg-orange-500" },
  funilaria: { nome: "Funilaria", cor: "bg-blue-500" },
  diagnostico: { nome: "Diagnóstico", cor: "bg-green-500" },
  carros: { nome: "Carros", cor: "bg-purple-500" },
  ferramentas: { nome: "Ferramentas", cor: "bg-yellow-500" },
  noticias: { nome: "Notícias", cor: "bg-red-500" },
  calculadoras: { nome: "Calculadoras", cor: "bg-cyan-500" },
};

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const termo = q?.trim() || "";

  const artigos = termo ? await buscarArtigosPorTexto(termo) : [];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-orange-500 text-xs font-semibold tracking-widest">
            BUSCA
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-3">
            🔍 {termo ? `Resultados para "${termo}"` : "Digite algo para buscar"}
          </h1>
          {termo && (
            <p className="text-gray-500 text-sm mt-2">
              {artigos.length} {artigos.length === 1 ? "resultado" : "resultados"} encontrados
            </p>
          )}
        </div>

        {!termo && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
            <p className="text-gray-500">
              Use o campo de busca no topo da página para encontrar artigos.
            </p>
          </div>
        )}

        {termo && artigos.length === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
            <p className="text-4xl mb-4">😕</p>
            <p className="text-gray-400">
              Nenhum artigo encontrado para <strong className="text-white">&ldquo;{termo}&rdquo;</strong>.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Tente buscar por outro termo, como &ldquo;óleo&rdquo;, &ldquo;freio&rdquo; ou &ldquo;suspensão&rdquo;.
            </p>
          </div>
        )}

        {termo && artigos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artigos.map((artigo) => {
              const cat = categoriasInfo[artigo.categoria] ?? {
                nome: artigo.categoria,
                cor: "bg-gray-500",
              };

              return (
                <Link
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
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}