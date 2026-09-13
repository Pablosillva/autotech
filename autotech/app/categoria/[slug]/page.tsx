import { buscarArtigos } from "../../services/api";

const categorias = {
  mecanica: {
    nome: "Mecânica",
    icone: "🔧",
    descricao:
      "Tutoriais, dicas e guias completos sobre motor, suspensão, freios, transmissão, arrefecimento, injeção eletrônica e elétrica.",
  },
  funilaria: {
    nome: "Funilaria",
    icone: "🎨",
    descricao:
      "Tudo sobre pintura, martelinho de ouro, reparos de lataria, polimento e estética automotiva.",
  },
  diagnostico: {
    nome: "Diagnóstico",
    icone: "📟",
    descricao:
      "Como identificar falhas, entender códigos OBD2, luzes do painel e resolver problemas do seu carro.",
  },
  carros: {
    nome: "Carros",
    icone: "🚗",
    descricao:
      "Análises, comparativos e avaliações dos principais modelos do mercado brasileiro.",
  },
  ferramentas: {
    nome: "Ferramentas",
    icone: "🛠️",
    descricao:
      "As melhores ferramentas para manutenção, diagnóstico e reparo do seu veículo.",
  },
  noticias: {
    nome: "Notícias",
    icone: "📰",
    descricao:
      "As principais novidades do mundo automotivo, lançamentos e tendências.",
  },
  calculadoras: {
    nome: "Calculadoras",
    icone: "🧮",
    descricao:
      "Ferramentas para calcular IPVA, consumo, financiamento e muito mais.",
  },
};

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = categorias[slug as keyof typeof categorias];

  if (!categoria) {
    return (
      <main className="min-h-screen bg-gray-950 text-white">
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold">Categoria não encontrada 😕</h1>
          <p className="text-gray-400 mt-4">
            A categoria &ldquo;{slug}&rdquo; não existe.
          </p>
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

  const artigos = await buscarArtigos(slug);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-orange-500 text-xs font-semibold tracking-widest">
            CATEGORIA
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            {categoria.icone} {categoria.nome}
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl">{categoria.descricao}</p>
        </div>

        {artigos.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
            <p className="text-gray-500">
              Em breve: artigos de {categoria.nome} aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artigos.map((artigo) => (
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
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-orange-500 transition">
                    {artigo.titulo}
                  </h3>
                  <p className="mt-2 text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {artigo.descricao}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                    <span>🕐 {artigo.tempo_leitura}</span>
                    <span>👁 {artigo.visualizacoes}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}