import NewsSidebar from "./NewsSidebar";
import CoursesSidebar from "./CoursesSidebar";
import Newsletter from "./Newsletter";

const ferramentas = [
  { nome: "Código OBD2", icone: "📟", href: "/ferramentas/obd2" },
  { nome: "Consumo", icone: "⛽", href: "/ferramentas/consumo" },
  { nome: "IPVA", icone: "🧾", href: "/ferramentas/ipva" },
  { nome: "Financiamento", icone: "💰", href: "/ferramentas/financiamento" },
  { nome: "Torque", icone: "🔧", href: "/ferramentas/torque" },
  { nome: "Conversor", icone: "🔄", href: "/ferramentas/conversor" },
];

export default function Sidebar() {
  return (
    <>
      <aside className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">🛠️</span>
          <div>
            <h3 className="text-white font-bold text-sm">
              Calculadoras e Ferramentas
            </h3>
            <p className="text-gray-500 text-xs">
              +10 ferramentas úteis para o seu dia a dia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {ferramentas.map((ferramenta) => (
            <a
              key={ferramenta.nome}
              href={ferramenta.href}
              className="group bg-gray-950 border border-gray-800 hover:border-orange-500 rounded-lg p-3 flex flex-col items-center justify-center gap-2 text-center transition"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {ferramenta.icone}
              </span>
              <span className="text-[10px] text-gray-400 group-hover:text-orange-500 transition leading-tight">
                {ferramenta.nome}
              </span>
            </a>
          ))}
        </div>

        <a
          href="/ferramentas"
          className="block mt-5 text-orange-500 text-xs font-semibold hover:text-orange-400 transition"
        >
          Ver todas as ferramentas →
        </a>
      </aside>

      <NewsSidebar />
      <CoursesSidebar />
      <Newsletter />
    </>
  );
}