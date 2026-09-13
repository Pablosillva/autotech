"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminGuard from "../../../../components/admin/AdminGuard";
import ArtigoForm from "../../../../components/admin/ArtigoForm";
import { buscarArtigo, Artigo } from "../../../../services/api";

function EditarContent() {
  const params = useParams();
  const slug = params.slug as string;
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarArtigo(slug)
      .then((dados) => {
        if (dados) {
          setArtigo(dados);
        } else {
          setErro("Artigo não encontrado");
        }
      })
      .catch(() => setErro("Erro ao carregar artigo"))
      .finally(() => setCarregando(false));
  }, [slug]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-500">Carregando artigo...</p>
      </main>
    );
  }

  if (erro || !artigo) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="text-2xl font-bold">{erro || "Artigo não encontrado"}</h1>
          <a
            href="/admin"
            className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            Voltar para o painel
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <a
            href="/admin"
            className="text-orange-500 text-sm font-semibold hover:text-orange-400 transition"
          >
            ← Voltar para o painel
          </a>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            ✏️ Editar artigo
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Editando: <span className="text-white">{artigo.titulo}</span>
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8">
          <ArtigoForm artigo={artigo} />
        </div>
      </section>
    </main>
  );
}

export default function EditarArtigoPage() {
  return (
    <AdminGuard>
      <EditarContent />
    </AdminGuard>
  );
}