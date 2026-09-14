"use client";

import { useState } from "react";

export default function ShareButtons({
  titulo,
  slug,
}: {
  titulo: string;
  slug: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const compartilharWhatsApp = () => {
    const texto = encodeURIComponent(`${titulo} - ${url}`);
    window.open(`https://wa.me/?text=${texto}`, "_blank");
  };

  const compartilharFacebook = () => {
    const link = encodeURIComponent(url);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      "_blank"
    );
  };

  const compartilharTwitter = () => {
    const texto = encodeURIComponent(titulo);
    const link = encodeURIComponent(url);
    window.open(
      `https://twitter.com/intent/tweet?text=${texto}&url=${link}`,
      "_blank"
    );
  };

  const compartilharLinkedIn = () => {
    const link = encodeURIComponent(url);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
      "_blank"
    );
  };

  const compartilharTelegram = () => {
    const texto = encodeURIComponent(titulo);
    const link = encodeURIComponent(url);
    window.open(
      `https://t.me/share/url?url=${link}&text=${texto}`,
      "_blank"
    );
  };

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      alert("Não foi possível copiar o link.");
    }
  };

  return (
    <div className="mt-10 pt-6 border-t border-gray-800">
      <p className="text-white font-semibold text-sm mb-3">
        📢 Compartilhe este artigo
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={compartilharWhatsApp}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          💬 WhatsApp
        </button>

        <button
          onClick={compartilharFacebook}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          📘 Facebook
        </button>

        <button
          onClick={compartilharTwitter}
          className="bg-black border border-gray-700 hover:border-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          𝕏 Twitter
        </button>

        <button
          onClick={compartilharLinkedIn}
          className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          in LinkedIn
        </button>

        <button
          onClick={compartilharTelegram}
          className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          ✈️ Telegram
        </button>

        <button
          onClick={copiarLink}
          className="bg-gray-900 border border-gray-800 hover:border-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          {copiado ? "✅ Copiado!" : "🔗 Copiar link"}
        </button>
      </div>
    </div>
  );
}