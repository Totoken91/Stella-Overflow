"use client";

import { useState, useEffect, useRef } from "react";
import { useGameStore } from "@/lib/gameState";

type AnimPhase = "enter" | "bounce" | "idle";

const ANIM_STYLES: Record<AnimPhase, string> = {
  enter: "spriteEnter 0.5s ease-out forwards",
  bounce: "spriteBounce 0.4s ease-out forwards",
  idle: "spriteIdle 3s ease-in-out infinite",
};

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
  const [animPhase, setAnimPhase] = useState<AnimPhase>("enter");
  const prevSpriteRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevSpriteRef.current;
    prevSpriteRef.current = currentSprite;

    if (!currentSprite) return;

    if (prev === null) {
      setAnimPhase("enter");
    } else if (prev !== currentSprite) {
      setAnimPhase("bounce");
    }
  }, [currentSprite]);

  const handleAnimEnd = () => {
    if (animPhase !== "idle") {
      setAnimPhase("idle");
    }
  };

  if (!currentSprite) return null;

  const isPlaceholder = currentSprite === "etoile-neutre";

  return (
    <div className="absolute bottom-44 left-0 right-0 z-20 flex justify-center">
      <div
        onAnimationEnd={handleAnimEnd}
        style={{ animation: ANIM_STYLES[animPhase] }}
      >
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
    </div>
  );
}
