"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useGameStore } from "@/lib/gameState";

// ─── Placeholder block (until real PNGs arrive) ───
function PlaceholderSprite({ name }: { name: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{
        width: "180px",
        height: "340px",
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 143, 171, 0.25)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(255, 143, 171, 0.4)",
        }}
      >
        {name}
      </span>
    </div>
  );
}

// ─── Individual character sprite ───
function SpriteCharacter({
  name,
  expression,
  isActive,
  spriteCount,
  positionIndex,
}: {
  name: string;
  expression: string;
  isActive: boolean;
  spriteCount: number;
  positionIndex: number;
}) {
  const [scope, animate] = useAnimate();
  const prevExpressionRef = useRef(expression);

  // Bounce on expression change
  useEffect(() => {
    if (prevExpressionRef.current !== expression) {
      prevExpressionRef.current = expression;
      animate(
        scope.current,
        { scale: [1, 0.93, 1.06, 1] },
        { duration: 0.35, ease: "easeInOut" }
      );
    }
  }, [expression, animate, scope]);

  const spriteKey = `${name}-${expression}`;
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  // Check if the real sprite image exists
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Only treat as real if it's not the 1x1 transparent placeholder
      if (img.naturalWidth > 1 && img.naturalHeight > 1) {
        setIsPlaceholder(false);
      }
    };
    img.src = `/sprites/${spriteKey}.png`;
  }, [spriteKey]);

  // Determine flip based on position
  // Left sprite (index 0 of 2) → scaleX(-1) to face right/center
  // Right sprite (index 1 of 2) → scaleX(1) faces left/center
  // Solo → scaleX(1) no flip
  const scaleXValue = spriteCount === 2 && positionIndex === 0 ? -1 : 1;
  const activeScale = isActive || spriteCount === 1 ? 1 : 0.92;

  return (
    <motion.div
      ref={scope}
      layout
      // Entry animation
      initial={{ y: 60, opacity: 0, scale: 0.85, scaleX: scaleXValue }}
      animate={{
        y: 0,
        opacity: isActive || spriteCount === 1 ? 1 : 0.6,
        scale: activeScale,
        scaleX: scaleXValue,
        filter:
          isActive || spriteCount === 1
            ? "saturate(1)"
            : "saturate(0.5)",
      }}
      exit={{ x: 120, opacity: 0 }}
      transition={{
        // Spring for entry
        y: { type: "spring", stiffness: 300, damping: 18 },
        scale: { type: "spring", stiffness: 300, damping: 18 },
        opacity: { type: "spring", stiffness: 300, damping: 18 },
        // Fast flip
        scaleX: { duration: 0.1 },
        // Smooth for exit
        x: { duration: 0.3, ease: "easeIn" },
        // Speaker switch
        filter: { duration: 0.3 },
        layout: { type: "spring", stiffness: 200, damping: 25 },
      }}
    >
      {isPlaceholder ? (
        <PlaceholderSprite name={spriteKey} />
      ) : (
        <img
          src={`/sprites/${spriteKey}.png`}
          alt={name}
          className="max-h-[70vh] w-auto object-contain"
        />
      )}
    </motion.div>
  );
}

// ─── Main sprite window ───
export default function SpriteWindow() {
  const visibleSprites = useGameStore((s) => s.visibleSprites);
  const currentExpression = useGameStore((s) => s.currentExpression);
  const currentSpeaker = useGameStore((s) => s.currentSpeaker);

  return (
    <div className="absolute bottom-44 left-0 right-0 z-20 flex items-end justify-center gap-8">
      <AnimatePresence mode="wait">
        {visibleSprites.map((name, index) => (
          <SpriteCharacter
            key={name}
            name={name}
            expression={currentExpression[name] || "neutre"}
            isActive={currentSpeaker === name}
            spriteCount={visibleSprites.length}
            positionIndex={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
