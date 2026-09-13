"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { usuario, carregando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!carregando && !usuario) {
      router.push("/login");
    }
  }, [carregando, usuario, router]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-400">Verificando acesso...</p>
        </div>
      </main>
    );
  }

  if (!usuario) {
    return null;
  }

  return <>{children}</>;
}