import fs from "fs";
import path from "path";
import { pool } from "./connection";

async function setup() {
  try {
    console.log("🔧 Conectando ao banco de dados...");

    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    console.log("📝 Executando schema.sql...");
    await pool.query(schema);

    console.log("✅ Banco de dados configurado com sucesso!");
    await pool.end();
    process.exit(0);
  } catch (erro) {
    console.error("❌ Erro ao configurar banco:", erro);
    process.exit(1);
  }
}

setup();