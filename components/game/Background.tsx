"use client";

import { useGameStore } from "@/lib/gameState";

export default function Background() {
  const currentBg = useGameStore((s) => s.currentBg);

  if (!currentBg) return null;

  return (
    <img
      src={`/backgrounds/${currentBg}.png`}
      alt=""
      className="absolute inset-0 z-10 h-full w-full object-cover"
      onLoad={(e) => {
        const img = e.target as HTMLImageElement;
        if (img.naturalWidth <= 1) img.style.display = "none";
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
