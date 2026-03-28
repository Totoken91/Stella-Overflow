"use client";

import { useGameStore } from "@/lib/gameState";

function PlaceholderSprite() {
  return (
    <div
      className="rounded-2xl"
      style={{
        width: "180px",
        height: "340px",
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 143, 171, 0.15)",
      }}
    />
  );
}

export default function SpriteLayer() {
  const currentSprite = useGameStore((s) => s.currentSprite);

  if (!currentSprite) return null;

  const isPlaceholder = currentSprite === "etoile-neutre";

  return (
    <div className="absolute bottom-44 left-0 right-0 z-20 flex justify-center">
      {isPlaceholder ? (
        <PlaceholderSprite />
      ) : (
        <img
          src={`/sprites/${currentSprite}.png`}
          alt=""
          className="max-h-[70vh] w-auto object-contain"
        />
      )}
    </div>
  );
}
