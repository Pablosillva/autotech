"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function UploadImagem({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [imagemUrl, setImagemUrl] = useState("");

  return (
    <div>
      <CldUploadWidget
        uploadPreset="autotech_unsigned"
        onSuccess={(result: any) => {
          if (result.info && typeof result.info !== "string") {
            const url = result.info.secure_url;
            setImagemUrl(url);
            onUpload(url);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-4 py-2.5 rounded-lg transition"
          >
            📷 Fazer upload
          </button>
        )}
      </CldUploadWidget>

      {imagemUrl && (
        <p className="text-gray-400 text-xs mt-2">
          ✅ Imagem enviada: <span className="text-orange-500">{imagemUrl}</span>
        </p>
      )}
    </div>
  );
}