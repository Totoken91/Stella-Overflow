"use client";

import { useGameStore } from "@/lib/gameState";

export default function Background() {
  const currentBg = useGameStore((s) => s.currentBg);

  if (!currentBg) return <div className="absolute inset-0 z-10 bg-black" />;

  return (
    <img
      src={`/backgrounds/${currentBg}.png`}
      alt=""
      className="absolute inset-0 z-10 h-full w-full object-cover"
    />
  );
}
