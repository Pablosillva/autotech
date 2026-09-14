"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { usuario } = useAuth();
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault();
    if (!busca.trim()) return;
    router.push(`/busca?q=${encodeURIComponent(busca.trim())}`);
    setBusca("");
    setMenuAberto(false);
  };

  const links = [
    { href: "/", label: "Início" },
    { href: "/categoria/mecanica", label: "Mecânica" },
    { href: "/categoria/funilaria", label: "Funilaria" },
    { href: "/categoria/diagnostico", label: "Diagnóstico" },
    { href: "/categoria/carros", label: "Carros" },
    { href: "/ferramentas", label: "Ferramentas" },
    { href: "/categoria/noticias", label: "Notícias" },
  ];

  return (
    <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-orange-500 p-2 rounded-lg">
            <span className="text-black font-bold text-xl">🔧</span>
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-bold text-orange-500">AutoTech</h1>
            <p className="text-[10px] text-gray-400 hidden sm:block">
              Mecânica • Funilaria • Diagnóstico
            </p>
          </div>
        </a>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition ${
                link.href === "/"
                  ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
                  : "hover:text-orange-500"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* BUSCA E BOTÕES */}
        <div className="flex items-center gap-3 shrink-0">
          <form
            onSubmit={handleBusca}
            className="hidden md:flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 w-56"
          >
            <span className="text-gray-500 text-sm">🔍</span>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar..."
              className="bg-transparent outline-none text-sm text-white placeholder-gray-500 ml-2 w-full"
            />
          </form>

          {usuario ? (
            <a
              href="/admin"
              className="hidden md:inline-block bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm px-4 py-2 rounded-lg transition"
            >
              ⚙️ Painel
            </a>
          ) : (
            <a
              href="/login"
              className="hidden md:flex items-center gap-1 text-sm hover:text-orange-500 transition"
            >
              👤 Entrar
            </a>
          )}

          {/* MENU HAMBÚRGUER MOBILE */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="lg:hidden bg-gray-900 border border-gray-700 hover:border-orange-500 w-10 h-10 rounded-lg flex items-center justify-center text-xl transition"
            aria-label="Menu"
          >
            {menuAberto ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MENU MOBILE ABERTO */}
      {menuAberto && (
        <div className="lg:hidden border-t border-gray-800 bg-black">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuAberto(false)}
                className="text-sm py-2 border-b border-gray-900 last:border-b-0 hover:text-orange-500 transition"
              >
                {link.label}
              </a>
            ))}

            {/* Busca no mobile */}
            <form onSubmit={handleBusca} className="flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 mt-3">
              <span className="text-gray-500 text-sm">🔍</span>
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar no AutoTech..."
                className="bg-transparent outline-none text-sm text-white placeholder-gray-500 ml-2 w-full"
              />
            </form>

            {/* Login no mobile */}
            {usuario ? (
              <a
                href="/admin"
                onClick={() => setMenuAberto(false)}
                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition text-center mt-2"
              >
                ⚙️ Painel
              </a>
            ) : (
              <a
                href="/login"
                onClick={() => setMenuAberto(false)}
                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition text-center mt-2"
              >
                👤 Entrar
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}