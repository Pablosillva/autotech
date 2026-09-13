"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fazerLogin, buscarUsuarioLogado, Usuario } from "../services/api";

type AuthContextType = {
  usuario: Usuario | null;
  token: string | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("autotech_token");

    if (!tokenSalvo) {
      setCarregando(false);
      return;
    }

    buscarUsuarioLogado(tokenSalvo)
      .then((u) => {
        if (u) {
          setUsuario(u);
          setToken(tokenSalvo);
        } else {
          localStorage.removeItem("autotech_token");
        }
      })
      .finally(() => setCarregando(false));
  }, []);

  const login = async (email: string, senha: string) => {
    const resposta = await fazerLogin(email, senha);
    localStorage.setItem("autotech_token", resposta.token);
    setToken(resposta.token);
    setUsuario(resposta.usuario);
  };

  const logout = () => {
    localStorage.removeItem("autotech_token");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  }
  return ctx;
}