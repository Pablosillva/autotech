const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export type Artigo = {
  id: number;
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  tempo_leitura: string;
  visualizacoes: string;
  imagem: string;
  conteudo: string;
  autor: string;
  data: string;
  criado_em: string;
};

export async function buscarArtigos(categoria?: string): Promise<Artigo[]> {
  const url = categoria
    ? `${API_URL}/artigos/categoria/${categoria}`
    : `${API_URL}/artigos`;

  const resposta = await fetch(url, { cache: "no-store" });

  if (!resposta.ok) {
    throw new Error("Erro ao buscar artigos");
  }

  return resposta.json();
}

export async function buscarArtigo(slug: string): Promise<Artigo | null> {
  const resposta = await fetch(`${API_URL}/artigos/${slug}`, {
    cache: "no-store",
  });

  if (resposta.status === 404) {
    return null;
  }

  if (!resposta.ok) {
    throw new Error("Erro ao buscar artigo");
  }

  return resposta.json();
}

// ============ AUTENTICAÇÃO ============

export type Usuario = {
  id: number;
  email: string;
  nome: string;
};

export type RespostaLogin = {
  token: string;
  usuario: Usuario;
};

export async function fazerLogin(
  email: string,
  senha: string
): Promise<RespostaLogin> {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.erro || "Erro ao fazer login");
  }

  return resposta.json();
}

export async function buscarUsuarioLogado(
  token: string
): Promise<Usuario | null> {
  const resposta = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!resposta.ok) {
    return null;
  }

  const dados = await resposta.json();
  return dados.usuario;
}

// ============ CRUD DE ARTIGOS (PROTEGIDO) ============

export type ArtigoInput = {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  tempo_leitura: string;
  visualizacoes: string;
  imagem: string;
  conteudo: string;
  autor: string;
  data: string;
};

export async function criarArtigo(
  dados: ArtigoInput,
  token: string
): Promise<Artigo> {
  const resposta = await fetch(`${API_URL}/artigos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.erro || "Erro ao criar artigo");
  }

  return resposta.json();
}

export async function atualizarArtigo(
  slug: string,
  dados: ArtigoInput,
  token: string
): Promise<Artigo> {
  const resposta = await fetch(`${API_URL}/artigos/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.erro || "Erro ao atualizar artigo");
  }

  return resposta.json();
}

export async function deletarArtigo(
  slug: string,
  token: string
): Promise<void> {
  const resposta = await fetch(`${API_URL}/artigos/${slug}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.erro || "Erro ao deletar artigo");
  }
}