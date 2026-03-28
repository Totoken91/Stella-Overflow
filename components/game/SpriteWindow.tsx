"use client";

import { useEffect, useRef } from "react";
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
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 143, 171, 0.15)",
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
}: {
  name: string;
  expression: string;
  isActive: boolean;
  spriteCount: number;
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

  // Determine if this is a placeholder or real image
  const isPlaceholder = true; // TODO: check if /sprites/{name}-{expression}.png exists
  const spriteKey = `${name}-${expression}`;

  return (
    <motion.div
      ref={scope}
      layout
      // Entry animation
      initial={{ y: 60, opacity: 0, scale: 0.85 }}
      animate={{
        y: 0,
        opacity: isActive || spriteCount === 1 ? 1 : 0.6,
        scale: isActive || spriteCount === 1 ? 1 : 0.92,
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
        {visibleSprites.map((name) => (
          <SpriteCharacter
            key={name}
            name={name}
            expression={currentExpression[name] || "neutre"}
            isActive={currentSpeaker === name}
            spriteCount={visibleSprites.length}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
