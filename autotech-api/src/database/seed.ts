import { pool } from "./connection";
import { artigos } from "./artigos";

async function seed() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...");

    // Limpar a tabela antes de inserir (útil para rodar várias vezes)
    await pool.query("TRUNCATE TABLE artigos RESTART IDENTITY");

    for (const artigo of artigos) {
      await pool.query(
        `INSERT INTO artigos 
          (slug, titulo, descricao, categoria, tempo_leitura, visualizacoes, imagem, conteudo, autor, data)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          artigo.slug,
          artigo.titulo,
          artigo.descricao,
          artigo.categoria,
          artigo.tempoLeitura,
          artigo.visualizacoes,
          artigo.imagem,
          artigo.conteudo,
          artigo.autor,
          artigo.data,
        ]
      );
      console.log(`   ✅ Inserido: ${artigo.titulo}`);
    }

    console.log(`\n🎉 Seed concluído! ${artigos.length} artigos inseridos.`);
    await pool.end();
    process.exit(0);
  } catch (erro) {
    console.error("❌ Erro no seed:", erro);
    process.exit(1);
  }
}

seed();