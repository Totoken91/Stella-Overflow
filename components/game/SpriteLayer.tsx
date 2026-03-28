"use client";

import { useGameStore } from "@/lib/gameState";

export default function SpriteLayer() {
  const currentSprite = useGameStore((s) => s.currentSprite);

  if (!currentSprite) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center">
      <img
        src={`/sprites/${currentSprite}.png`}
        alt=""
        className="max-h-[85%] w-auto object-contain"
      />
    </div>
  );
}
