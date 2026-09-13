import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import artigosRoutes from "./routes/artigosRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({
    mensagem: "🚗 API do AutoTech está funcionando!",
    versao: "1.0.0",
  });
});

// Rotas da API
app.use("/artigos", artigosRoutes);
app.use("/auth", authRoutes);
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🔧 Servidor rodando em http://localhost:${PORT}`);
});