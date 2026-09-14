import type { MetadataRoute } from "next";

const BASE_URL = "https://autotechcenter.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login/"], // Bloqueia a área administrativa
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}