"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await login(email, senha);
      router.push("/admin");
    } catch (err: any) {
      setErro(err.message || "Erro ao fazer login");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-16">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-orange-500 p-3 rounded-lg inline-flex items-center justify-center mb-4">
            <span className="text-black font-bold text-2xl">🔧</span>
          </div>
          <h1 className="text-2xl font-bold">Entrar no AutoTech</h1>
          <p className="text-gray-500 text-sm mt-2">Acesso restrito à equipe</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white px-3 py-2.5 rounded-lg transition"
            />
          </div>

          {erro && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm rounded-lg p-3">
              ⚠️ {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-2.5 rounded-lg transition"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-gray-600 text-xs text-center mt-6">
          Esqueceu a senha? Contate o administrador.
        </p>
      </div>
    </main>
  );
}