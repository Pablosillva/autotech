const categorias = [
  { nome: "Mecânica", icone: "🔧", href: "/categoria/mecanica" },
  { nome: "Funilaria", icone: "🎨", href: "/categoria/funilaria" },
  { nome: "Diagnóstico", icone: "📟", href: "/categoria/diagnostico" },
  { nome: "Carros", icone: "🚗", href: "/categoria/carros" },
  { nome: "Ferramentas", icone: "🛠️", href: "/categoria/ferramentas" },
  { nome: "Calculadoras", icone: "🧮", href: "/categoria/calculadoras" },
];

export default function CategoriesSection() {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          Explore por categoria
        </h2>
        <a
          href="/categorias"
          className="text-orange-500 text-sm font-semibold hover:text-orange-400 transition"
        >
          Ver todos →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categorias.map((cat) => (
          <a
            key={cat.nome}
            href={cat.href}
            className="group bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all hover:-translate-y-1"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">
              {cat.icone}
            </span>
            <span className="text-sm font-semibold text-white group-hover:text-orange-500 transition">
              {cat.nome}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}