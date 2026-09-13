import { Request, Response } from "express";
import { pool } from "../database/connection";

// GET /artigos — lista todos os artigos (com filtro opcional por categoria)
export async function listarArtigos(req: Request, res: Response) {
  try {
    const { categoria } = req.query;

    let query = "SELECT * FROM artigos ORDER BY criado_em DESC";
    let valores: string[] = [];

    if (categoria) {
      query = "SELECT * FROM artigos WHERE categoria = $1 ORDER BY criado_em DESC";
      valores = [String(categoria)];
    }

    const resultado = await pool.query(query, valores);
    res.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao listar artigos:", erro);
    res.status(500).json({ erro: "Erro ao buscar artigos" });
  }
}

// GET /artigos/:slug — busca um artigo pelo slug
export async function buscarArtigo(req: Request, res: Response) {
  try {
    const { slug } = req.params;

    const resultado = await pool.query(
      "SELECT * FROM artigos WHERE slug = $1",
      [slug]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Artigo não encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao buscar artigo:", erro);
    res.status(500).json({ erro: "Erro ao buscar artigo" });
  }
}

// GET /artigos/categoria/:categoria — lista artigos por categoria
export async function listarPorCategoria(req: Request, res: Response) {
  try {
    const { categoria } = req.params;

    const resultado = await pool.query(
      "SELECT * FROM artigos WHERE categoria = $1 ORDER BY criado_em DESC",
      [categoria]
    );

    res.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao listar por categoria:", erro);
    res.status(500).json({ erro: "Erro ao buscar artigos da categoria" });
  }
}

// POST /artigos — cria um novo artigo (protegido)
export async function criarArtigo(req: Request, res: Response) {
  try {
    const {
      slug,
      titulo,
      descricao,
      categoria,
      tempo_leitura,
      visualizacoes,
      imagem,
      conteudo,
      autor,
      data,
    } = req.body;

    // Validação básica
    if (!slug || !titulo || !categoria || !conteudo) {
      return res.status(400).json({
        erro: "Slug, título, categoria e conteúdo são obrigatórios",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO artigos 
        (slug, titulo, descricao, categoria, tempo_leitura, visualizacoes, imagem, conteudo, autor, data)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        slug,
        titulo,
        descricao || "",
        categoria,
        tempo_leitura || "5 min de leitura",
        visualizacoes || "0",
        imagem || "/placeholder.png",
        conteudo,
        autor || "AutoTech",
        data || new Date().toLocaleDateString("pt-BR"),
      ]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao criar artigo:", erro);
    res.status(500).json({ erro: "Erro ao criar artigo" });
  }
}

// PUT /artigos/:slug — atualiza um artigo (protegido)
export async function atualizarArtigo(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const {
      titulo,
      descricao,
      categoria,
      tempo_leitura,
      visualizacoes,
      imagem,
      conteudo,
      autor,
      data,
    } = req.body;

    const resultado = await pool.query(
      `UPDATE artigos SET
        titulo = $1,
        descricao = $2,
        categoria = $3,
        tempo_leitura = $4,
        visualizacoes = $5,
        imagem = $6,
        conteudo = $7,
        autor = $8,
        data = $9
       WHERE slug = $10
       RETURNING *`,
      [
        titulo,
        descricao,
        categoria,
        tempo_leitura,
        visualizacoes,
        imagem,
        conteudo,
        autor,
        data,
        slug,
      ]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Artigo não encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao atualizar artigo:", erro);
    res.status(500).json({ erro: "Erro ao atualizar artigo" });
  }
}

// DELETE /artigos/:slug — apaga um artigo (protegido)
export async function deletarArtigo(req: Request, res: Response) {
  try {
    const { slug } = req.params;

    const resultado = await pool.query(
      "DELETE FROM artigos WHERE slug = $1 RETURNING *",
      [slug]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Artigo não encontrado" });
    }

    res.json({ mensagem: "Artigo deletado com sucesso" });
  } catch (erro) {
    console.error("Erro ao deletar artigo:", erro);
    res.status(500).json({ erro: "Erro ao deletar artigo" });
  }
}