import { Router } from "express";
import {
  listarArtigos,
  buscarArtigo,
  listarPorCategoria,
  criarArtigo,
  atualizarArtigo,
  deletarArtigo,
  buscarArtigosPorTexto,
  incrementarVisualizacao,
} from "../controllers/artigosController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

// Rotas públicas (qualquer um acessa)
router.get("/", listarArtigos);
router.get("/busca", buscarArtigosPorTexto);
router.get("/categoria/:categoria", listarPorCategoria);
router.get("/:slug", buscarArtigo);

// Incrementar visualização (público, sem autenticação)
router.post("/:slug/visualizar", incrementarVisualizacao);

// Rotas protegidas (só quem tem token)
router.post("/", autenticar, criarArtigo);
router.put("/:slug", autenticar, atualizarArtigo);
router.delete("/:slug", autenticar, deletarArtigo);

export default router;