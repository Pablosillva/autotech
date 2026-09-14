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
    // Adicione as categorias importantes
    { url: `${BASE_URL}/categoria/mecanica`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/categoria/funilaria`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/categoria/diagnostico`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/categoria/carros`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/categoria/ferramentas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/categoria/noticias`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/categoria/calculadoras`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
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