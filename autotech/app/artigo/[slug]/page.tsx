import { buscarArtigo } from "../../services/api";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import ShareButtons from "../../components/ShareButtons";

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
          <span>👁 {artigo.visualizacoes}</span>
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