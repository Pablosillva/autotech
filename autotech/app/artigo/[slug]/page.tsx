import { buscarArtigo, buscarArtigosRelacionados } from "../../services/api";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import ShareButtons from "../../components/ShareButtons";
import ContadorVisualizacao from "../../components/ContadorVisualizacao";

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artigo = await buscarArtigo(slug);

  if (!artigo) {
    return (
      <main className="min-h-screen bg-gray-950 text-white">
        <section className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold">Artigo não encontrado 😕</h1>
          <a
            href="/"
            className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            Voltar para a home
          </a>
        </section>
      </main>
    );
  }

  const relacionados = await buscarArtigosRelacionados(
    artigo.slug,
    artigo.categoria
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase">
          {artigo.categoria}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
          {artigo.titulo}
        </h1>
        <p className="text-gray-400 mt-4">{artigo.descricao}</p>

        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-500 border-y border-gray-800 py-4">
          <span>✍️ {artigo.autor}</span>
          <span>📅 {artigo.data}</span>
          <span>🕐 {artigo.tempo_leitura}</span>
          <ContadorVisualizacao
            slug={artigo.slug}
            visualizacoesInicial={Number(artigo.visualizacoes) || 0}
          />
        </div>

        <div className="mt-8 rounded-xl overflow-hidden">
          <img
            src={artigo.imagem}
            alt={artigo.titulo}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="mt-10">
          <MarkdownRenderer conteudo={artigo.conteudo} />
        </div>

        {relacionados.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              📚 Artigos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relacionados.map((rel) => (
                <a
                  key={rel.slug}
                  href={`/artigo/${rel.slug}`}
                  className="group bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-xl overflow-hidden transition-all hover:-translate-y-1"
                >
                  <div className="h-32 bg-gray-800 overflow-hidden">
                    <img
                      src={rel.imagem}
                      alt={rel.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm font-semibold leading-snug group-hover:text-orange-500 transition line-clamp-2">
                      {rel.titulo}
                    </h3>
                    <span className="text-gray-500 text-xs mt-2 block">
                      🕐 {rel.tempo_leitura}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <ShareButtons titulo={artigo.titulo} slug={artigo.slug} />

        <a
          href="/"
          className="inline-block mt-12 text-orange-500 font-semibold hover:text-orange-400 transition"
        >
          ← Voltar para a home
        </a>
      </article>
    </main>
  );
}