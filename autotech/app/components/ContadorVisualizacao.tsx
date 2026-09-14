"use client";

import { useEffect, useState } from "react";
import { incrementarVisualizacao } from "../services/api";

export default function ContadorVisualizacao({
  slug,
  visualizacoesInicial,
}: {
  slug: string;
  visualizacoesInicial: number;
}) {
  const [visualizacoes, setVisualizacoes] = useState(visualizacoesInicial);

  useEffect(() => {
    const chave = `view_${slug}`;

    if (sessionStorage.getItem(chave)) {
      return;
    }

    incrementarVisualizacao(slug).then((novoTotal) => {
      if (novoTotal > 0) {
        setVisualizacoes(novoTotal);
      }
      sessionStorage.setItem(chave, "1");
    });
  }, [slug]);

  return <span>👁 {visualizacoes}</span>;
}