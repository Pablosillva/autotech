export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <span className="text-black font-bold text-xl">🔧</span>
            </div>
            <div className="leading-tight">
              <h2 className="text-lg font-bold text-orange-500">AutoTech</h2>
              <p className="text-[10px] text-gray-400">
                Mecânica • Funilaria • Diagnóstico • Dicas
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-400">
            <a href="/sobre" className="hover:text-orange-500 transition">Sobre nós</a>
            <a href="/contato" className="hover:text-orange-500 transition">Contato</a>
            <a href="/termos" className="hover:text-orange-500 transition">Termos de Uso</a>
            <a href="/privacidade" className="hover:text-orange-500 transition">Privacidade</a>
          </nav>

          <div className="flex items-center gap-3">
            {[
              { icone: "▶", href: "#", label: "YouTube" },
              { icone: "📷", href: "#", label: "Instagram" },
              { icone: "f", href: "#", label: "Facebook" },
              { icone: "𝕏", href: "#", label: "X" },
              { icone: "in", href: "#", label: "LinkedIn" },
            ].map((rede) => (
              <a
                key={rede.label}
                href={rede.href}
                aria-label={rede.label}
                className="bg-gray-900 border border-gray-800 hover:border-orange-500 hover:text-orange-500 w-8 h-8 rounded-lg flex items-center justify-center text-xs text-gray-400 transition"
              >
                {rede.icone}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <p>© 2026 AutoTech. Todos os direitos reservados.</p>
          <p className="italic text-orange-500/80">Seu carro, nosso conhecimento.</p>
        </div>
      </div>
    </footer>
  );
}