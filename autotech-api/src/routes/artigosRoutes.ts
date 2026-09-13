import { Router } from "express";
import {
  listarArtigos,
  buscarArtigo,
  listarPorCategoria,
  criarArtigo,
  atualizarArtigo,
  deletarArtigo,
} from "../controllers/artigosController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

// Rotas públicas (qualquer um acessa)
router.get("/", listarArtigos);
router.get("/categoria/:categoria", listarPorCategoria);
router.get("/:slug", buscarArtigo);

// Rotas protegidas (só quem tem token)
router.post("/", autenticar, criarArtigo);
router.put("/:slug", autenticar, atualizarArtigo);
router.delete("/:slug", autenticar, deletarArtigo);

export default router;