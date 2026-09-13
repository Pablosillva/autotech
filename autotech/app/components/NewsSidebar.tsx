const noticias = [
  {
    titulo: "Carros elétricos: vale a pena em 2026?",
    descricao: "Analisamos os prós e contras dos veículos elétricos no Brasil.",
    tempo: "2 dias atrás",
    imagem: "/noticia-eletricos.png",
    href: "/artigos",
  },
  {
    titulo: "Como identificar problemas na suspensão?",
    descricao: "Sinais de desgaste e como evitar prejuízos maiores.",
    tempo: "4 dias atrás",
    imagem: "/noticia-suspensao.png",
    href: "/artigos",
  },
  {
    titulo: "Melhores óleos de motor para o seu carro",
    descricao: "Confira a guia completa com as principais marcas.",
    tempo: "6 dias atrás",
    imagem: "/noticia-oleo.png",
    href: "/artigos",
  },
];

export default function NewsSidebar() {
  return (
    <aside className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🔥</span>
        <h3 className="text-white font-bold text-sm">Novidades e Tendências</h3>
      </div>

      <div className="flex flex-col gap-4">
        {noticias.map((noticia) => (
          <a
            key={noticia.titulo}
            href={noticia.href}
            className="group flex gap-3 items-start"
          >
            <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden shrink-0">
              <img
                src={noticia.imagem}
                alt={noticia.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-white text-xs font-semibold leading-tight group-hover:text-orange-500 transition">
                {noticia.titulo}
              </h4>
              <p className="text-gray-500 text-[11px] mt-1 leading-tight line-clamp-2">
                {noticia.descricao}
              </p>
              <span className="text-gray-600 text-[10px] mt-1 block">
                🕐 {noticia.tempo}
              </span>
            </div>
          </a>
        ))}
      </div>

      <a
        href="/artigos"
        className="block mt-5 text-orange-500 text-xs font-semibold hover:text-orange-400 transition"
      >
        Ver todas as notícias →
      </a>
    </aside>
  );
}