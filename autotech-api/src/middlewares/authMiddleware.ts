import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta-dev";

// Estende o tipo Request para incluir `usuario`
export interface RequestAutenticado extends Request {
  usuario?: { id: number; email: string; nome: string };
}

export function autenticar(
  req: RequestAutenticado,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  // O header vem como "Bearer eyJhbGc..."
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: "Token mal formatado" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      nome: string;
    };

    req.usuario = payload;
    next(); // continua para o controller
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}