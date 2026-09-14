import type { MetadataRoute } from "next";
import { buscarArtigos } from "./services/api";

const BASE_URL = "https://autotechcenter.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas do site
 const paginasEstaticas: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${BASE_URL}/artigos`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  // Categorias
  { url: `${BASE_URL}/categoria/mecanica`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/categoria/funilaria`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/categoria/diagnostico`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/categoria/carros`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/ferramentas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/categoria/noticias`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  
  // Ferramentas
  { url: `${BASE_URL}/ferramentas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/ferramentas/obd2`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE_URL}/ferramentas/consumo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE_URL}/ferramentas/ipva`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE_URL}/ferramentas/financiamento`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE_URL}/ferramentas/torque`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE_URL}/ferramentas/conversor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
];
  try {
    // Páginas dinâmicas (artigos)
    const artigos = await buscarArtigos();
    const paginasArtigos: MetadataRoute.Sitemap = artigos.map((artigo) => ({
      url: `${BASE_URL}/artigo/${artigo.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...paginasEstaticas, ...paginasArtigos];
  } catch (error) {
    console.error("Erro ao gerar sitemap:", error);
    return paginasEstaticas;
  }
}