const ferramentas = [
  { icone: "📟", titulo: "Gerador de Código OBD2", descricao: "Decodifique falhas do seu veículo", href: "/ferramentas/obd2" },
  { icone: "🧮", titulo: "Calculadora de Consumo", descricao: "Saiba o gasto real do seu carro", href: "/ferramentas/consumo" },
  { icone: "🧾", titulo: "Calculadora de IPVA", descricao: "Calcule o valor do seu IPVA", href: "/ferramentas/ipva" },
  { icone: "💰", titulo: "Calculadora de Financiamento", descricao: "Simule parcelas e juros", href: "/ferramentas/financiamento" },
  { icone: "📊", titulo: "Tabela de Torque", descricao: "Valores de aperto por fabricante", href: "/ferramentas/torque" },
];

export default function PopularTools() {
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🔧 Ferramentas populares
        </h2>
        <a
          href="/ferramentas"
          className="text-orange-500 text-sm font-semibold hover:text-orange-400 transition"
        >
          Ver todas as ferramentas →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ferramentas.map((ferramenta) => (
          <a
            key={ferramenta.titulo}
            href={ferramenta.href}
            className="group flex items-center gap-3 bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-xl p-4 transition-all hover:-translate-y-1"
          >
            <div className="bg-gray-950 border border-gray-800 group-hover:border-orange-500 rounded-lg w-12 h-12 flex items-center justify-center text-xl shrink-0 transition">
              {ferramenta.icone}
            </div>
            <div className="min-w-0">
              <h3 className="text-white text-sm font-semibold leading-tight group-hover:text-orange-500 transition">
                {ferramenta.titulo}
              </h3>
              <p className="text-gray-500 text-xs mt-1 leading-tight">
                {ferramenta.descricao}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}