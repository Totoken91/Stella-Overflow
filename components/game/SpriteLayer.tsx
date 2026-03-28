"use client";

import { useGameStore } from "@/lib/gameState";

function PlaceholderSprite() {
  return (
    <svg
      width="280"
      height="520"
      viewBox="0 0 280 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-40"
    >
      {/* Head */}
      <ellipse cx="140" cy="80" rx="45" ry="50" fill="rgba(255,214,224,0.3)" stroke="rgba(224,92,138,0.3)" strokeWidth="1.5" />
      {/* Hair hint */}
      <path d="M95 65 Q90 30 120 20 Q140 15 160 20 Q190 30 185 65" fill="rgba(212,206,240,0.2)" stroke="rgba(212,206,240,0.3)" strokeWidth="1" />
      <path d="M95 65 Q85 90 88 120" stroke="rgba(212,206,240,0.25)" strokeWidth="2" fill="none" />
      <path d="M185 65 Q195 90 192 120" stroke="rgba(212,206,240,0.25)" strokeWidth="2" fill="none" />
      {/* Neck */}
      <rect x="130" y="125" width="20" height="25" rx="5" fill="rgba(255,214,224,0.25)" />
      {/* Body/torso */}
      <path d="M100 150 Q95 155 90 200 Q88 250 95 290 L185 290 Q192 250 190 200 Q185 155 180 150 Z" fill="rgba(255,214,224,0.15)" stroke="rgba(224,92,138,0.2)" strokeWidth="1.5" />
      {/* Skirt */}
      <path d="M90 290 Q70 380 65 420 L215 420 Q210 380 190 290 Z" fill="rgba(212,206,240,0.12)" stroke="rgba(212,206,240,0.2)" strokeWidth="1.5" />
      {/* Arms */}
      <path d="M100 160 Q60 200 55 260" stroke="rgba(255,214,224,0.2)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M180 160 Q220 200 225 260" stroke="rgba(255,214,224,0.2)" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* Legs */}
      <path d="M120 420 Q115 460 110 510" stroke="rgba(255,214,224,0.18)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M160 420 Q165 460 170 510" stroke="rgba(255,214,224,0.18)" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* Star accessory on chest */}
      <text x="132" y="210" fontSize="18" fill="rgba(224,92,138,0.4)">★</text>
    </svg>
  );
}

export default function SpriteLayer() {
  const currentSprite = useGameStore((s) => s.currentSprite);

  if (!currentSprite) return null;

  // Check if the sprite is a placeholder (1x1 transparent png)
  const isPlaceholder = currentSprite === "etoile-neutre";

  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center pb-48">
      {isPlaceholder ? (
        <PlaceholderSprite />
      ) : (
        <img
          src={`/sprites/${currentSprite}.png`}
          alt=""
          className="max-h-[85%] w-auto object-contain"
        />
      )}
    </div>
  );
}
