import { Router } from "express";
import { login } from "../controllers/authController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

// POST /auth/login
router.post("/login", login);

// GET /auth/me — rota protegida de teste
router.get("/me", autenticar, (req, res) => {
  res.json({ usuario: (req as any).usuario });
});

export default router;