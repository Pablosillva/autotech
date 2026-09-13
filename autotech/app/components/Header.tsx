"use client";

import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { usuario } = useAuth();

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-orange-500 p-2 rounded-lg">
            <span className="text-black font-bold text-xl">🔧</span>
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-bold text-orange-500">AutoTech</h1>
            <p className="text-[10px] text-gray-400">
              Mecânica • Funilaria • Diagnóstico
            </p>
          </div>
        </a>

        {/* MENU */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <a
            href="/"
            className="text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
          >
            Início
          </a>
          <a href="/categoria/mecanica" className="hover:text-orange-500 transition">Mecânica</a>
          <a href="/categoria/funilaria" className="hover:text-orange-500 transition">Funilaria</a>
          <a href="/categoria/diagnostico" className="hover:text-orange-500 transition">Diagnóstico</a>
          <a href="/categoria/carros" className="hover:text-orange-500 transition">Carros</a>
          <a href="/categoria/ferramentas" className="hover:text-orange-500 transition">Ferramentas</a>
          <a href="/categoria/noticias" className="hover:text-orange-500 transition">Notícias</a>
          <a href="/categoria/calculadoras" className="hover:text-orange-500 transition">Calculadoras</a>
        </nav>

        {/* BUSCA E BOTÕES */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 w-56">
            <span className="text-gray-500 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Buscar no AutoTech..."
              className="bg-transparent outline-none text-sm text-white placeholder-gray-500 ml-2 w-full"
            />
          </div>

          {usuario ? (
            <a
              href="/admin"
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm px-4 py-2 rounded-lg transition"
            >
              ⚙️ Painel
            </a>
          ) : (
            <>
              <a
                href="/login"
                className="hidden md:flex items-center gap-1 text-sm hover:text-orange-500 transition"
              >
                👤 Entrar
              </a>
              <a
                href="/login"
                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm px-4 py-2 rounded-lg transition"
              >
                Cadastrar
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}