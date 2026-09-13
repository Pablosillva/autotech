import { pool } from "./connection";
import bcrypt from "bcryptjs";

async function criarAdmin() {
  try {
    const email = "admin@autotech.com";
    const senhaPura = "admin123"; // ⚠️ Troque em produção!
    const nome = "Administrador";

    console.log("🔐 Gerando hash da senha...");
    const senhaHash = await bcrypt.hash(senhaPura, 10);

    console.log("💾 Inserindo usuário no banco...");
    await pool.query(
      `INSERT INTO usuarios (email, senha, nome) 
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET senha = $2`,
      [email, senhaHash, nome]
    );

    console.log("✅ Usuário admin criado com sucesso!");
    console.log(`   📧 Email: ${email}`);
    console.log(`   🔑 Senha: ${senhaPura}`);
    console.log(`   ⚠️  Troque essa senha em produção!`);

    await pool.end();
    process.exit(0);
  } catch (erro) {
    console.error("❌ Erro ao criar admin:", erro);
    process.exit(1);
  }
}

criarAdmin();