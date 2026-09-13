"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import {
  criarArtigo,
  atualizarArtigo,
  Artigo,
  ArtigoInput,
} from "../../services/api";

const categorias = [
  { valor: "mecanica", nome: "Mecânica" },
  { valor: "funilaria", nome: "Funilaria" },
  { valor: "diagnostico", nome: "Diagnóstico" },
  { valor: "carros", nome: "Carros" },
  { valor: "ferramentas", nome: "Ferramentas" },
  { valor: "noticias", nome: "Notícias" },
  { valor: "calculadoras", nome: "Calculadoras" },
];

function gerarSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function ArtigoForm({ artigo }: { artigo?: Artigo }) {
  const editando = !!artigo;
  const router = useRouter();
  const { token } = useAuth();

  const [form, setForm] = useState<ArtigoInput>({
    slug: artigo?.slug || "",
    titulo: artigo?.titulo || "",
    descricao: artigo?.descricao || "",
    categoria: artigo?.categoria || "mecanica",
    tempo_leitura: artigo?.tempo_leitura || "5 min de leitura",
    visualizacoes: artigo?.visualizacoes || "0",
    imagem: artigo?.imagem || "/placeholder.png",
    conteudo: artigo?.conteudo || "",
    autor: artigo?.autor || "AutoTech",
    data: artigo?.data || new Date().toLocaleDateString("pt-BR"),
  });

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const atualizarCampo = (campo: keyof ArtigoInput, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleTituloChange = (valor: string) => {
    setForm((prev) => ({
      ...prev,
      titulo: valor,
      slug: editando ? prev.slug : gerarSlug(valor),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!token) {
      setErro("Você precisa estar logado.");
      return;
    }

    setSalvando(true);

    try {
      if (editando) {
        await atualizarArtigo(artigo.slug, form, token);
      } else {
        await criarArtigo(form, token);
      }
      router.push("/admin");
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar artigo");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.titulo}
          onChange={(e) => handleTituloChange(e.target.value)}
          required
          placeholder="Ex: Como trocar a correia dentada"
          className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Slug (URL) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => atualizarCampo("slug", e.target.value)}
          required
          placeholder="como-trocar-a-correia-dentada"
          className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
        />
        <p className="text-gray-600 text-xs mt-1">
          URL final: <span className="text-orange-500">/artigo/{form.slug || "..."}</span>
        </p>
      </div>

      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Descrição curta <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.descricao}
          onChange={(e) => atualizarCampo("descricao", e.target.value)}
          required
          rows={2}
          placeholder="Uma frase que resume o artigo (aparece na listagem)"
          className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition resize-y"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-gray-400 block mb-2">
            Categoria <span className="text-red-500">*</span>
          </label>
          <select
            value={form.categoria}
            onChange={(e) => atualizarCampo("categoria", e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
          >
            {categorias.map((c) => (
              <option key={c.valor} value={c.valor}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-2">Autor</label>
          <input
            type="text"
            value={form.autor}
            onChange={(e) => atualizarCampo("autor", e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-gray-400 block mb-2">
            Tempo de leitura
          </label>
          <input
            type="text"
            value={form.tempo_leitura}
            onChange={(e) => atualizarCampo("tempo_leitura", e.target.value)}
            placeholder="5 min de leitura"
            className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-2">
            Visualizações
          </label>
          <input
            type="text"
            value={form.visualizacoes}
            onChange={(e) => atualizarCampo("visualizacoes", e.target.value)}
            placeholder="0"
            className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Caminho da imagem
        </label>
        <input
          type="text"
          value={form.imagem}
          onChange={(e) => atualizarCampo("imagem", e.target.value)}
          placeholder="/artigo-exemplo.png"
          className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
        />
        <p className="text-gray-600 text-xs mt-1">
          Coloque o arquivo na pasta <code className="text-orange-500">public/</code> e use o caminho <code className="text-orange-500">/nome.png</code>
        </p>
      </div>

      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Conteúdo (Markdown) <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.conteudo}
          onChange={(e) => atualizarCampo("conteudo", e.target.value)}
          required
          rows={16}
          placeholder="## Título da seção&#10;&#10;Texto do parágrafo..."
          className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition font-mono text-sm leading-relaxed"
        />
      </div>

      {erro && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm rounded-lg p-3">
          ⚠️ {erro}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={salvando}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold px-6 py-2.5 rounded-lg transition"
        >
          {salvando ? "Salvando..." : editando ? "💾 Salvar alterações" : "➕ Criar artigo"}
        </button>
        <a
          href="/admin"
          className="bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 font-semibold px-6 py-2.5 rounded-lg transition"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}