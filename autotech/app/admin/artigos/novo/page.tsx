"use client";

import AdminGuard from "../../../components/admin/AdminGuard";
import ArtigoForm from "../../../components/admin/ArtigoForm";

export default function NovoArtigoPage() {
  return (
    <AdminGuard>
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
              ➕ Novo artigo
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Preencha os campos abaixo para criar um novo artigo.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8">
            <ArtigoForm />
          </div>
        </section>
      </main>
    </AdminGuard>
  );
}