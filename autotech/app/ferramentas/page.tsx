import Link from "next/link";

const ferramentas = [
  {
    icone: "📟",
    titulo: "Consulta de Código OBD2",
    descricao: "Digite o código de erro e descubra o que ele significa.",
    href: "/ferramentas/obd2",
    cor: "from-orange-500 to-orange-600",
  },
  {
    icone: "⛽",
    titulo: "Calculadora de Consumo",
    descricao: "Descubra quantos km/l seu carro faz e quanto gasta por mês.",
    href: "/ferramentas/consumo",
    cor: "from-green-500 to-green-600",
  },
  {
    icone: "🧾",
    titulo: "Calculadora de IPVA",
    descricao: "Calcule o valor do IPVA do seu carro por estado.",
    href: "/ferramentas/ipva",
    cor: "from-blue-500 to-blue-600",
  },
  {
    icone: "💰",
    titulo: "Simulador de Financiamento",
    descricao: "Simule as parcelas e veja o valor total com juros.",
    href: "/ferramentas/financiamento",
    cor: "from-purple-500 to-purple-600",
  },
  {
    icone: "🔧",
    titulo: "Tabela de Torque",
    descricao: "Valores de aperto recomendados por fabricante.",
    href: "/ferramentas/torque",
    cor: "from-red-500 to-red-600",
  },
  {
    icone: "🔄",
    titulo: "Conversor de Unidades",
    descricao: "Converta medidas automotivas facilmente.",
    href: "/ferramentas/conversor",
    cor: "from-cyan-500 to-cyan-600",
  },
];

export default function FerramentasPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-orange-500 text-xs font-semibold tracking-widest">
            FERRAMENTAS
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            🛠️ Ferramentas e Calculadoras
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Ferramentas úteis para o seu dia a dia com o carro. Tudo grátis e
            sem cadastro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ferramentas.map((ferramenta) => (
            <Link
              key={ferramenta.href}
              href={ferramenta.href}
              className="group bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-xl p-6 transition-all hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${ferramenta.cor} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}
              >
                {ferramenta.icone}
              </div>
              <h2 className="text-white font-bold text-lg mb-2 group-hover:text-orange-500 transition">
                {ferramenta.titulo}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {ferramenta.descricao}
              </p>
              <span className="inline-block mt-4 text-orange-500 text-sm font-semibold">
                Acessar →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}