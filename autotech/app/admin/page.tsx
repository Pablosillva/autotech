"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  buscarArtigos,
  deletarArtigo,
  Artigo,
} from "../services/api";
import AdminGuard from "../components/admin/AdminGuard";

const categoriasInfo: Record<string, { nome: string; cor: string }> = {
  mecanica: { nome: "Mecânica", cor: "bg-orange-500" },
  funilaria: { nome: "Funilaria", cor: "bg-blue-500" },
  diagnostico: { nome: "Diagnóstico", cor: "bg-green-500" },
  carros: { nome: "Carros", cor: "bg-purple-500" },
  ferramentas: { nome: "Ferramentas", cor: "bg-yellow-500" },
  noticias: { nome: "Notícias", cor: "bg-red-500" },
  calculadoras: { nome: "Calculadoras", cor: "bg-cyan-500" },
};

function AdminContent() {
  const { usuario, token, logout } = useAuth();
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarArtigos = async () => {
    setCarregando(true);
    try {
      const dados = await buscarArtigos();
      setArtigos(dados);
      setErro("");
    } catch {
      setErro("Erro ao carregar artigos");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarArtigos();
  }, []);

  const handleDeletar = async (slug: string, titulo: string) => {
    if (!token) return;

    const confirmar = confirm(
      `Tem certeza que quer deletar "${titulo}"?\n\nEssa ação não pode ser desfeita.`
    );
    if (!confirmar) return;

    try {
      await deletarArtigo(slug, token);
      setArtigos((prev) => prev.filter((a) => a.slug !== slug));
    } catch (err: any) {
      alert(err.message || "Erro ao deletar");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-orange-500 text-xs font-semibold tracking-widest">
              PAINEL ADMIN
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              📋 Gerenciar Artigos
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Olá, {usuario?.nome}! Você tem {artigos.length} artigos cadastrados.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/admin/artigos/novo"
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-5 py-2.5 rounded-lg transition"
            >
              ➕ Novo artigo
            </a>
            <button
              onClick={logout}
              className="bg-gray-900 border border-gray-800 hover:border-red-500 hover:text-red-400 text-gray-300 font-semibold px-5 py-2.5 rounded-lg transition"
            >
              Sair
            </button>
          </div>
        </div>

        {carregando && (
          <div className="text-center py-16 text-gray-500">
            Carregando artigos...
          </div>
        )}

        {erro && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 rounded-lg p-4">
            ⚠️ {erro}
          </div>
        )}

        {!carregando && artigos.length === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
            <p className="text-gray-500">Nenhum artigo cadastrado ainda.</p>
          </div>
        )}

        {!carregando && artigos.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-950 border-b border-gray-800">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">
                    Título
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 hidden md:table-cell">
                    Categoria
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 hidden lg:table-cell">
                    Autor
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 hidden lg:table-cell">
                    Data
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {artigos.map((artigo) => {
                  const cat = categoriasInfo[artigo.categoria] ?? {
                    nome: artigo.categoria,
                    cor: "bg-gray-500",
                  };
                  return (
                    <tr
                      key={artigo.slug}
                      className="border-b border-gray-800 last:border-b-0 hover:bg-gray-950/50 transition"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white text-sm max-w-md truncate">
                          {artigo.titulo}
                        </div>
                        <div className="text-gray-600 text-xs mt-1 truncate">
                          /{artigo.slug}
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span
                          className={`${cat.cor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
                        >
                          {cat.nome}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-400 hidden lg:table-cell">
                        {artigo.autor}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500 hidden lg:table-cell">
                        {artigo.data}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`/admin/artigos/editar/${artigo.slug}`}
                            className="bg-gray-950 border border-gray-800 hover:border-orange-500 text-gray-300 text-xs font-semibold px-3 py-1.5 rounded-md transition"
                          >
                            ✏️ Editar
                          </a>
                          <button
                            onClick={() => handleDeletar(artigo.slug, artigo.titulo)}
                            className="bg-gray-950 border border-gray-800 hover:border-red-500 hover:text-red-400 text-gray-300 text-xs font-semibold px-3 py-1.5 rounded-md transition"
                          >
                            🗑️ Deletar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminContent />
    </AdminGuard>
  );
}