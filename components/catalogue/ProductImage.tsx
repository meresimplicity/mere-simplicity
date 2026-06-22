"use client";

import { useEffect, useState } from "react";

type ProductImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export function ProductImage({
  src,
  alt,
  className = "",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(src) && !failed;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

      {hasImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="relative z-10 h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="relative z-10 flex h-full w-full items-center justify-center p-4 text-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Image link missing
            </p>
            <p className="mt-1 line-clamp-2 text-xs font-bold text-gray-500">
              {alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
