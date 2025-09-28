"use client";

import { useState } from "react";

export default function Avatar({
  src = "/images/assistant_avatar.svg",
  alt = "Assistant",
  size = 48,
}: { src?: string; alt?: string; size?: number }) {
  const [broken, setBroken] = useState(false);

  return (
    <div
      className="relative rounded-full overflow-hidden ring-1 ring-white/15 shadow"
      style={{ width: size, height: size }}
    >
      {!broken ? (
        // Если картинка есть — покажем её
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        // Fallback: градиент + эмодзи
        <div className="h-full w-full bg-gradient-to-br from-cyan-300 to-emerald-300 grid place-items-center">
          <span className="text-slate-900/80 text-xl">🩺</span>
        </div>
      )}
    </div>
  );
}
