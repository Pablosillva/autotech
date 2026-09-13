import { buscarArtigos } from "../services/api";

const categoriasInfo: Record<string, { nome: string; cor: string }> = {
  mecanica: { nome: "Mecânica", cor: "bg-orange-500" },
  funilaria: { nome: "Funilaria", cor: "bg-blue-500" },
  diagnostico: { nome: "Diagnóstico", cor: "bg-green-500" },
  carros: { nome: "Carros", cor: "bg-purple-500" },
  ferramentas: { nome: "Ferramentas", cor: "bg-yellow-500" },
  noticias: { nome: "Notícias", cor: "bg-red-500" },
  calculadoras: { nome: "Calculadoras", cor: "bg-cyan-500" },
};

export default async function FeaturedArticles() {
  const todos = await buscarArtigos();
  const destaques = todos.slice(0, 4);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🔥 Artigos em destaque
        </h2>
        <a
          href="/artigos"
          className="text-orange-500 text-sm font-semibold hover:text-orange-400 transition"
        >
          Ver todos →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destaques.map((artigo) => {
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
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-orange-500 transition">
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
    </section>
  );
}